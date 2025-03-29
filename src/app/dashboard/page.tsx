"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserProfile from "../module/dashboard/user-profile";
import LogoutUser from "../module/dashboard/logout-user";
import LoadingUser from "../module/dashboard/loading-user";
import { getUserProfile } from "@/lib/api";

interface User {
  name: string;
  email: string;
  language: string;
  mobile: string;
  selfDescription: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleLogout = () => {
    setLoading(true);
    localStorage.removeItem("IFA_AuthToken");
    router.push("/signup");
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromURL = urlParams.get("token");

    if (tokenFromURL) {
      localStorage.setItem("IFA_AuthToken", tokenFromURL);
      setToken(tokenFromURL);
      router.replace("/dashboard");
    }
  }, [router]);

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("IFA_AuthToken");
    if (tokenFromLocalStorage) {
      setToken(tokenFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    if (token) {
      const fetchUserData = async () => {
        try {
          const response = await getUserProfile(token);
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          const data = await response.json();
          setUser(data);
          setLoading(false);
        } catch (err) {
          setLoading(false); // Just set loading to false if there's an error
          throw err;
        }
      };

      fetchUserData();
    }
  }, [token]);

  if (loading) {
    return <LoadingUser />;
  }

  if (!user) {
    return <LogoutUser />;
  }

  return (
    <UserProfile
      name={user.name}
      email={user.email}
      language={user.language}
      mobile={user.mobile}
      selfDescription={user.selfDescription}
      handleLogout={handleLogout}
    />
  );
}
