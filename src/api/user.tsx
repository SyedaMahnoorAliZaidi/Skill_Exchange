// api/user.ts
import axios from "axios";

export const getUserProfile = async () => {
  const token = localStorage.getItem("accessToken");

  const response = await axios.get("http://localhost:8000/api/user/profile/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
