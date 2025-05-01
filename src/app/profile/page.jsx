"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Profile() {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  // NEW: Fetch profile on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to view your profile", {
        style: { color: "#DC2626" },
      });
      router.push("/login");
      return;
    }

    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch profile");
        }
        setProfile({ name: data.name, email: data.email });
        setIsLoading(false);
      } catch (err) {
        toast.error(err.message, { style: { color: "#DC2626" } });
        router.push("/login");
      }
    }
    fetchProfile();
  }, [router]);

  // NEW: Handle input change
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // NEW: Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profile.name) {
      toast.error("Name is required", { style: { color: "#DC2626" } });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: profile.name }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update profile");
      }
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      toast.error(err.message, { style: { color: "#DC2626" } });
    }
  };

  // NEW: Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    router.push("/login");
  };

  if (isLoading) {
    return <div className="text-gray-800 text-center py-10">Loading...</div>;
  }

  return (
    <section className="w-[95vw] mx-auto py-10 flex justify-center">
      <div className="w-full max-w-md px-2">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Profile</h1>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-800">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-200 rounded text-xs text-gray-800"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-800">
                Email (cannot be changed)
              </label>
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full p-2 border border-gray-200 rounded text-xs text-gray-600 bg-gray-100"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-black text-xs"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 text-xs"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs font-medium text-gray-800">Full Name</p>
              <p className="text-xs text-gray-600">{profile.name}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-800">Email</p>
              <p className="text-xs text-gray-600">{profile.email}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-black text-xs"
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 text-xs"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
