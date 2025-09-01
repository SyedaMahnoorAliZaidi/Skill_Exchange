import Label from "components/Label/Label";
import React, { FC, useEffect, useState } from "react";
import Avatar from "shared/Avatar/Avatar";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import Textarea from "shared/Textarea/Textarea";
import CommonLayout from "./CommonLayout";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import AdminHeader from "components/Header/AdminHeader";
import Header3 from "components/Header/Header3";

export interface AccountPageProps {
  className?: string;
}

const AccountPage: FC<AccountPageProps> = ({ className = "" }) => {
  const [userInfo, setUserInfo] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    email: "",
    phone_number: "",
    city: "",
    bio: "",
    
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;
      try {
        const res = await axios.get("http://localhost:8000/api/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserInfo({
          firstname: res.data.firstname || "",
          lastname: res.data.lastname || "",
          gender: res.data.gender || "",
          email: res.data.email || "",
          phone_number: res.data.phone_number || "",
          city: res.data.city || "",
          bio: res.data.bio || "",
          
        });
        localStorage.setItem("userFirstName", res.data.firstname || "");
        localStorage.setItem("userLastName", res.data.lastname || "");
      } catch (err) {
        console.error("Failed to fetch user info", err);
      }
    };
    fetchUserInfo();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    try {
      await axios.put("http://localhost:8000/api/update-profile/", userInfo, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Info updated!");
    } catch (err) {
      alert("Failed to update info");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const firstName = localStorage.getItem("userFirstName") || "";
  const lastName = localStorage.getItem("userLastName") || "";
  const fullName = `${firstName} ${lastName}`.trim();

  return (
    <div className={`nc-AccountPage ${className}`} data-nc-id="AccountPage">
      <Header3 />
      <Helmet>
        <title>Task Ease</title>
      </Helmet>
      <CommonLayout>
        <form onSubmit={handleUpdate}>
          <div className="space-y-6 sm:space-y-8">
            {/* HEADING */}
            <h2 className="text-3xl font-semibold">Account infomation</h2>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
            <div className="flex flex-col md:flex-row">
              <div className="flex-shrink-0 flex items-start">
                
              </div>
              <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
                <div>
                  <Label>First name</Label>
                  <Input
                    name="firstname"
                    value={userInfo.firstname}
                    onChange={handleChange}
                  />
                </div>
                {/* ---- */}
                <div>
                  <Label>Last name</Label>
                  <Input
                    name="lastname"
                    value={userInfo.lastname}
                    onChange={handleChange}
                  />
                </div>
                
                {/* ---- */}
                <div>
                  <Label>Gender</Label>
                  <Select
                    name="gender"
                    value={userInfo.gender}
                    onChange={handleChange}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Select>
                </div>
                {/* ---- */}
                <div>
                  <Label>Email</Label>
                  <Input
                    name="email"
                    value={userInfo.email}
                    onChange={handleChange}
                  />
                </div>
                {/* ---- */}
                <div className="max-w-lg">
                  <Label>Phone number</Label>
                  <Input
                    name="phone_number"
                    value={userInfo.phone_number}
                    onChange={handleChange}
                  />
                </div>
                {/* ---- */}
                
                {/* ---- */}
                <div>
                  <Label>City</Label>
                  <Input
                    name="city"
                    value={userInfo.city}
                    onChange={handleChange}
                  />
                </div>
                {/* ---- */}
                {/* <div>
                  <Label>Bio</Label>
                  <Textarea
                    name="bio"
                    value={userInfo.bio}
                    onChange={handleChange}
                  />
                </div> */}
                <div className="pt-2">
                  <ButtonPrimary type="submit">Update info</ButtonPrimary>
                </div>
              </div>
            </div>
          </div>
        </form>
      </CommonLayout>
    </div>
  );
};

export default AccountPage;

//ufhisuhfiuefheuifhiufh