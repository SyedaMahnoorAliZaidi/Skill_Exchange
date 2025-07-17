import React, { useState } from "react";
import Label from "components/Label/Label";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import CommonLayout from "./CommonLayout";
import axios from "axios";
import AdminHeader from "components/Header/AdminHeader";

const AccountPass = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("accessToken");
      

      const response = await axios.put(
        "http://localhost:8000/api/change-password/",
        {
          old_password: currentPassword,
          new_password: newPassword,
          confirm_password: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Password updated successfully.");

      alert("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      console.error("❌ Change password failed:", error);
      const err = error.response?.data;
      console.log("🔎 Error details from backend:", err);
      alert(
        err?.old_password ||
          err?.new_password ||
          err?.confirm_password ||
          err?.error ||
          "Failed to update password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
       <AdminHeader/>
      <CommonLayout>
       
        <form onSubmit={handleChangePassword}>
          <div className="space-y-6 sm:space-y-8">
            <h2 className="text-3xl font-semibold">Update your password</h2>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

            <div className="max-w-xl space-y-6">
              <div>
                <Label>Current password</Label>
                <Input
                  type="password"
                  className="mt-1.5"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>New password</Label>
                <Input
                  type="password"
                  className="mt-1.5"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Confirm password</Label>
                <Input
                  type="password"
                  className="mt-1.5"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="pt-2">
                <ButtonPrimary type="submit" disabled={loading}>
                  {loading ? "Updating..." : "Update password"}
                </ButtonPrimary>
              </div>
            </div>
          </div>
        </form>
      </CommonLayout>
    </div>
  );
};

export default AccountPass;
