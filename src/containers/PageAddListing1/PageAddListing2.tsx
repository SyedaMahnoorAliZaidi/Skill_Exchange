import { FC, useEffect } from "react";
import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import { useListingForm } from "../../context/ListingFormProvider";
import AdminHeader from "components/Header/AdminHeader";

// Fix default marker icon in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export interface PageAddListing2Props {}

const PageAddListing2: FC<PageAddListing2Props> = () => {
  const { listingData, updateListingData } = useListingForm();

  const updateLocation = (lat: number, lng: number) => {
    const formattedLat = Number(lat.toFixed(6));
    const formattedLng = Number(lng.toFixed(6));
    updateListingData({
      latitude: formattedLat,
      longitude: formattedLng,
    });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPosition = L.latLng(
            position.coords.latitude,
            position.coords.longitude
          );
          updateLocation(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          const defaultPosition = L.latLng(31.5204, 74.3587);
          updateLocation(31.5204, 74.3587);
        }
      );
    }
  };

  const isValidCoordinate = (value: number, maxDigitsBeforeDecimal: number) => {
    const [intPart] = value.toString().split(".");
    return intPart.length <= maxDigitsBeforeDecimal;
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        const roundedLat = Number(lat.toFixed(6));
        const roundedLng = Number(lng.toFixed(6));

        const isLatValid = isValidCoordinate(roundedLat, 2);
        const isLngValid = isValidCoordinate(roundedLng, 3);

        if (!isLatValid || !isLngValid) {
          alert("Selected location is out of allowed bounds. Please choose another point.");
          return;
        }

        updateLocation(roundedLat, roundedLng);
      },
    });

    const position = L.latLng(listingData.latitude, listingData.longitude);
    return position === null ? null : <Marker position={position} />;
  };

  return (
    <CommonLayout
      index="02"
      nextHref="/add-listing-3"
      backtHref="/add-listing-1"
    >
      <AdminHeader />
      <>
        <h2 className="text-2xl font-semibold">Location</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div className="space-y-8">
          {/* FORM ITEM */}
          <FormItem label="">
            <div className="block">
              {/* Location */}
              <FormItem
                label="City"
                desc="Enter the city or area where you will provide your service."
              >
                <Input 
                  placeholder="Lahore" 
                  value={listingData.city}
                  onChange={(e) => updateListingData({ city: e.target.value })}
                />
              </FormItem>

              <br />
              <span className="text-neutral-800 dark:text-neutral-200">
                Where are you located?
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
                    center={[listingData.latitude, listingData.longitude]}
                    zoom={13}
                    scrollWheelZoom={false}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker />
                  </MapContainer>
                </div>

                <div className="text-sm text-neutral-500">
                  Selected location: {listingData.latitude}, {listingData.longitude}
                </div>
              </div>
            </div>
          </FormItem>
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing2;
