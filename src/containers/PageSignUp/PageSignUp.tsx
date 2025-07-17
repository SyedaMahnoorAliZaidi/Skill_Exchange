import React, { FC, useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import Input from "shared/Input/Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface ButtonPrimaryProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ children, onClick, ...props }) => {
  return (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export interface PageSignUpProps {
  className?: string;
}

interface LocationMarkerProps {
  position: L.LatLng | null;
  setPosition: (position: L.LatLng) => void;
}

function LocationMarker({ position, setPosition }: LocationMarkerProps) {
  const map = useMapEvents({
    click(e: L.LeafletMouseEvent) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position} />
  );
}

const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Expert");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const [formData, setFormData] = useState<any>({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    cnic: "",
    gender: "",
    phone_number: "",
    city: "",
    bio: "",
    service_categories: [],
    years_of_experience: 0,
    availability: "",
    profile_picture: null,
    latitude: null,
    longitude: null,
  });
  const navigate = useNavigate();

  // Validation function
  const validateForm = () => {
    if (!formData.email || !formData.password || !selectedRole) {
      return false;
    }

    if (selectedRole === "Customer" || selectedRole === "Expert") {
      return (
        formData.firstname &&
        formData.lastname &&
        formData.cnic &&
        formData.gender
      );
    }

    if (selectedRole === "Expert") {
      return (
        formData.service_categories.length > 0 &&
        formData.years_of_experience >= 0 &&
        formData.availability
      );
    }
    return true;
  };

  const handleRoleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setSelectedRole(value);

    // Reset form fields based on role change
    setShowAdditionalFields(false);
    setFormData({
      ...formData,
      firstname: "",
      lastname: "",
      cnic: "",
      gender: "",
      phone_number: "",
      city: "",
      bio: "",
      service_categories: [],
      years_of_experience: 0,
      availability: "",
     // profile_picture: null,
      latitude: null,
      longitude: null,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleServiceCategoryChange = (category: string) => {
    setFormData((prevState: any) => ({
      ...prevState,
      service_categories: prevState.service_categories.includes(category)
        ? prevState.service_categories.filter((c: string) => c !== category)
        : [...prevState.service_categories, category]
    }));
  };

 
  const isValidCoordinate = (coord: number, maxDigitsBeforeDecimal: number) => {
    const [intPart] = coord.toString().split('.');
    return intPart.replace('-', '').length <= maxDigitsBeforeDecimal;
  };
  
  const updateLocation = (lat: number, lng: number) => {
    const formattedLat = Number(lat.toFixed(6));
    const formattedLng = Number(lng.toFixed(6));
    setFormData((prevData: any) => ({
      ...prevData,
      latitude: formattedLat,
      longitude: formattedLng,
    }));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPosition = L.latLng(position.coords.latitude, position.coords.longitude);
          setPosition(newPosition);
          updateLocation(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          const defaultPosition = L.latLng(31.5204, 74.3587);
          setPosition(defaultPosition);
          updateLocation(31.5204, 74.3587);
        }
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!validateForm()) {
      alert("Please fill all required fields.");
      return;
    }
  
    const formDataToSend = new FormData();
  
    // Create backend-compatible keys for first_name and last_name
    const backendFormattedFormData = {
      ...formData,
      first_name: formData.firstname,
      last_name: formData.lastname,
    };
  
    // Add all fields to FormData
    Object.keys(backendFormattedFormData).forEach((key) => {
      if (key === "service_categories") {
        formDataToSend.append(key, JSON.stringify(backendFormattedFormData[key]));
      } else if (key === "profile_picture" && backendFormattedFormData[key]) {
        formDataToSend.append(key, backendFormattedFormData[key]);
      } else if (
        backendFormattedFormData[key] !== null &&
        backendFormattedFormData[key] !== undefined
      ) {
        formDataToSend.append(key, backendFormattedFormData[key].toString());
      }
    });
  
    // Append role explicitly
    formDataToSend.append("role", selectedRole);
  
    // Append lat/lng with fixed precision if provided
    if (formData.latitude && formData.longitude) {
      formDataToSend.append("latitude", Number(formData.latitude).toFixed(6));
      formDataToSend.append("longitude", Number(formData.longitude).toFixed(6));
    }
  
    try {
      const response = await axios.post(
        "http://localhost:8000/api/create_user/",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.status === 201) {
        alert("User created successfully!");
        navigate("/login");
      }
    } catch (error: any) {
      console.error("Error:", error);
      console.error("Error Response:", error.response?.data);
      alert("Signup failed. Check console for details.");
      console.log("Full formData:", formData);
    }
  };
  

  const handleContinueClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (selectedRole) {
      setShowAdditionalFields(true);
    } else {
      alert("Please select a role first.");
    }
  };

  const serviceCategories = [
    "Plumbing", "Electrical", "Carpentry", "Cleaning", "Gardening",
    "Painting", "Moving", "Repair", "Installation", "Maintenance"
  ];

  return (
    <div className={`nc-PageSignUp ${className}`} data-nc-id="PageSignUp">
      <Helmet>
        <title>Sign up | TaskEase</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Signup
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                name="email"
                placeholder="example@example.com"
                className="mt-1"
                value={formData.email}
                onChange={handleInputChange}
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input
                type="password"
                name="password"
                className="mt-1"
                value={formData.password}
                onChange={handleInputChange}
              />
            </label>

            <fieldset className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Select Role
              </span>
              <div className="mt-1">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="Customer"
                    className="form-radio"
                    checked={selectedRole === "Customer"}
                    onChange={handleRoleChange}
                  />
                  <span className="ml-2">Customer</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    name="role"
                    value="Expert"
                    className="form-radio"
                    checked={selectedRole === "Expert"}
                    onChange={handleRoleChange}
                  />
                  <span className="ml-2">Expert</span>
                </label>
              </div>
            </fieldset>
            <ButtonPrimary
              type="button"
              className="bg-indigo-600 text-white py-2 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={handleContinueClick}
            >
              Continue
            </ButtonPrimary>
          </form>

          {showAdditionalFields && (
            <form className="grid grid-cols-1 gap-6 mt-6" onSubmit={handleSubmit}>
              <div className="flex flex-col items-center space-y-4">
               
                
                  
              </div>
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  First Name
                </span>
                <Input
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  className="mt-1"
                  value={formData.firstname}
                  onChange={handleInputChange}
                />
              </label>
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Last Name
                </span>
                <Input
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  className="mt-1"
                  value={formData.lastname}
                  onChange={handleInputChange}
                />
              </label>
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">CNIC</span>
                <Input
                  type="text"
                  name="cnic"
                  placeholder="CNIC"
                  className="mt-1"
                  value={formData.cnic}
                  onChange={handleInputChange}
                />
              </label>
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Gender
                </span>
                <select
                  name="gender"
                  className="mt-1 block w-full"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Phone Number
                </span>
                <Input
                  type="tel"
                  name="phone_number"
                  placeholder="Phone Number"
                  className="mt-1"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                />
              </label>
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  City
                </span>
                <Input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="mt-1"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </label>
              <div className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Location
                </span>
                <div className="mt-1 space-y-2">
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    className="text-sm text-primary-600 hover:text-primary-500 focus:outline-none"
                  >
                    Use my current location
                  </button>
                  <div className="h-[300px] w-full rounded-lg overflow-hidden">
                    <MapContainer
                      center={[31.5204, 74.3587]}
                      zoom={13}
                      scrollWheelZoom={false}
                      style={{ height: '100%', width: '100%' }}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                     <LocationMarker
                        position={position}
                        setPosition={(pos: L.LatLng) => {
                          const lat = Number(pos.lat.toFixed(6));
                          const lng = Number(pos.lng.toFixed(6));

                          // Validate max digits before decimal
                          const isLatValid = isValidCoordinate(lat, 2);
                          const isLngValid = isValidCoordinate(lng, 3);

                          if (!isLatValid || !isLngValid) {
                            alert("Selected location is out of allowed bounds. Please choose another point.");
                            return;
                          }

                          setPosition(pos);
                          updateLocation(lat, lng);
                        }}
                      />
                    </MapContainer>
                  </div>
                  {position && (
                    <div className="text-sm text-neutral-500">
                      Selected location: {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
                    </div>
                  )}
                </div>
              </div>
              {selectedRole === "Expert" && (
                <>
                  <div className="block">
                    <span className="text-neutral-800 dark:text-neutral-200">
                      Service Categories
                    </span>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {serviceCategories.map((category) => (
                        <label key={category} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.service_categories.includes(category)}
                            onChange={() => handleServiceCategoryChange(category)}
                            className="mr-2"
                          />
                          <span className="text-sm">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <label className="block">
                    <span className="text-neutral-800 dark:text-neutral-200">
                      Years of Experience
                    </span>
                    <Input
                      type="number"
                      name="years_of_experience"
                      placeholder="Years of Experience"
                      className="mt-1"
                      value={formData.years_of_experience}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="block">
                    <span className="text-neutral-800 dark:text-neutral-200">
                      Availability
                    </span>
                    <textarea
                      name="availability"
                      placeholder="Describe your availability (e.g., Weekdays 9-5, Weekends available)"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      rows={3}
                      value={formData.availability}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="block">
                    <span className="text-neutral-800 dark:text-neutral-200">
                      Bio
                    </span>
                    <textarea
                      name="bio"
                      placeholder="Tell us about yourself and your expertise"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      rows={4}
                      value={formData.bio}
                      onChange={handleInputChange}
                    />
                  </label>
                </>
              )}
              <ButtonPrimary
                type="submit"
                className="bg-green-600 text-white py-2 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Sign Up
              </ButtonPrimary>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
