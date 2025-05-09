"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [profile, setProfile] = useState({ name: "", email: "", phone: "" });
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [cards, setCards] = useState([]);
  const [paymentOptions, setPaymentOptions] = useState({ preferred: "card" });
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newAddress, setNewAddress] = useState({ street: "", city: "", state: "", zip: "", country: "" });
  const [newCard, setNewCard] = useState({ number: "", expiry: "", cvc: "" });
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Profile page: No token found");
      toast.error("Please login to view your profile", { style: { color: "#DC2626" } });
      router.push("/login");
      return;
    }

    async function fetchData() {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        console.log("Profile page: Fetching data with token");

        // Add timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

        const profileRes = await fetch("/api/profile", {
          headers,
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        const profileData = await profileRes.json();
        console.log("Profile page: Profile response", profileRes.status, profileData);

        if (!profileRes.ok) {
          throw new Error(profileData.message || "Failed to fetch profile");
        }
        setProfile({ name: profileData.name || "", email: profileData.email, phone: profileData.phone || "" });

        // Mock other API calls (replace with actual fetches if needed)
        setOrders([]); // Replace with fetch("/api/orders", { headers })
        setAddresses([]); // Replace with fetch("/api/addresses", { headers })
        setCards([]); // Replace with fetch("/api/cards", { headers })
        setPaymentOptions({ preferred: "card" }); // Replace with fetch("/api/payment-options", { headers })

        setIsLoading(false);
        console.log("Profile page: Data fetched successfully");
      } catch (err) {
        console.error("Profile page: Fetch error", err);
        setIsLoading(false);
        toast.error(err.message || "Failed to load profile", { style: { color: "#DC2626" } });
        router.push("/login");
      }
    }
    fetchData();
  }, [router]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleCardChange = (e) => {
    setNewCard({ ...newCard, [e.target.name]: e.target.value });
  };

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
        body: JSON.stringify({ name: profile.name, phone: profile.phone }),
      });
      const data = await res.json();
      console.log("Profile page: Update response", res.status, data);
      if (!res.ok) {
        throw new Error(data.message || "Failed to update profile");
      }
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Profile page: Update error", err);
      toast.error(err.message, { style: { color: "#DC2626" } });
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    if (!newAddress.street || !newAddress.city || !newAddress.zip || !newAddress.country) {
      toast.error("All address fields are required", { style: { color: "#DC2626" } });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newAddress),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add address");
      setAddresses([...addresses, { id: data.id, ...newAddress }]);
      setNewAddress({ street: "", city: "", state: "", zip: "", country: "" });
      toast.success("Address added successfully!");
    } catch (err) {
      toast.error(err.message, { style: { color: "#DC2626" } });
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/addresses/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete address");
      setAddresses(addresses.filter((addr) => addr.id !== id));
      toast.success("Address deleted successfully!");
    } catch (err) {
      toast.error(err.message, { style: { color: "#DC2626" } });
    }
  };

  const handleAddCard = async (e) => {
    e.preventDefault();
    if (!newCard.number || !newCard.expiry || !newCard.cvc) {
      toast.error("All card fields are required", { style: { color: "#DC2626" } });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newCard),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add card");
      setCards([...cards, { id: data.id, last4: data.last4, brand: data.brand, expiry: data.expiry }]);
      setNewCard({ number: "", expiry: "", cvc: "" });
      toast.success("Card added successfully!");
    } catch (err) {
      toast.error(err.message, { style: { color: "#DC2626" } });
    }
  };

  const handleDeleteCard = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/cards/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete card");
      setCards(cards.filter((card) => card.id !== id));
      toast.success("Card deleted successfully!");
    } catch (err) {
      toast.error(err.message, { style: { color: "#DC2626" } });
    }
  };

  const handleUpdatePaymentOptions = async (preferred) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/payment-options", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ preferred }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update payment options");
      setPaymentOptions({ preferred });
      toast.success("Payment option updated successfully!");
    } catch (err) {
      toast.error(err.message, { style: { color: "#DC2626" } });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    router.push("/login");
  };

  if (isLoading) {
    return <div className="text-gray-800 text-center py-10">Loading...</div>;
  }

  return (
    <section className="w-[95vw] min-w-[300px] mx-auto py-6 sm:py-10 flex flex-col md:flex-row gap-4 sm:gap-6">
      <div className="w-full md:w-1/4 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-4">Account</h2>
        <ul className="flex flex-col gap-2">
          {[
            { id: "dashboard", label: "Dashboard" },
            { id: "orders", label: "Orders" },
            { id: "address", label: "Address" },
            { id: "cards", label: "Card Details" },
            { id: "payment", label: "Payment Options" },
            { id: "edit", label: "Edit Details" },
          ].map((tab) => (
            <li key={tab.id}>
              <button
                className={`w-full text-left px-3 py-2 text-xs sm:text-sm ${
                  activeTab === tab.id
                    ? "bg-gray-800 text-white rounded"
                    : "text-gray-800 hover:bg-gray-200 rounded"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            </li>
          ))}
          <li>
            <button
              className="w-full text-left px-3 py-2 text-xs sm:text-sm text-gray-800 hover:bg-gray-200 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      <div className="w-full md:w-3/4 px-2 sm:px-4">
        {activeTab === "dashboard" && (
          <div className="flex flex-col gap-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Dashboard</h1>
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-800">Welcome, {profile.name || "User"}</p>
              <p className="text-xs sm:text-sm text-gray-600">Email: {profile.email}</p>
              {profile.phone && <p className="text-xs sm:text-sm text-gray-600">Phone: {profile.phone}</p>}
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-800">Recent Orders</p>
              {orders.length === 0 ? (
                <p className="text-xs sm:text-sm text-gray-600">No recent orders</p>
              ) : (
                <ul className="flex flex-col gap-2">
                  {orders.slice(0, 3).map((order) => (
                    <li key={order.id} className="text-xs sm:text-sm text-gray-600">
                      Order #{order.id} - {new Date(order.date).toLocaleDateString()} - ₦{order.total.toLocaleString()} ({order.status})
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="flex flex-col gap-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Your Orders</h1>
            {orders.length === 0 ? (
              <p className="text-xs sm:text-sm text-gray-600">You have no orders</p>
            ) : (
              <div className="flex flex-col gap-4">
                {orders.map((order) => (
                  <div key={order.id} className="border border-gray-200 p-3 sm:p-4 rounded-lg">
                    <p className="text-xs sm:text-sm font-medium text-gray-800">
                      Order #{order.id} - {new Date(order.date).toLocaleDateString()}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">Total: ₦{order.total.toLocaleString()}</p>
                    <p className="text-xs sm:text-sm text-gray-600">Status: {order.status}</p>
                    <ul className="text-xs sm:text-sm text-gray-600 mt-2">
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          {item.name} x {item.quantity} - ₦{(item.price * item.quantity).toLocaleString()}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "address" && (
          <div className="flex flex-col gap-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Your Addresses</h1>
            <form onSubmit={handleAddAddress} className="flex flex-col gap-4 mb-4 sm:mb-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-800">Street</label>
                <input
                  type="text"
                  name="street"
                  value={newAddress.street}
                  onChange={handleAddressChange}
                  className="w-full p-2 border border-gray-200 rounded text-xs sm:text-sm text-gray-800"
                  required
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-800">City</label>
                <input
                  type="text"
                  name="city"
                  value={newAddress.city}
                  onChange={handleAddressChange}
                  className="w-full p-2 border border-gray-200 rounded text-xs sm:text-sm text-gray-800"
                  required
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-800">State (Optional)</label>
                <input
                  type="text"
                  name="state"
                  value={newAddress.state}
                  onChange={handleAddressChange}
                  className="w-full p-2 border border-gray-200 rounded text-xs sm:text-sm text-gray-800"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-800">ZIP Code</label>
                <input
                  type="text"
                  name="zip"
                  value={newAddress.zip}
                  onChange={handleAddressChange}
                  className="w-full p-2 border border-gray-200 rounded text-xs sm:text-sm text-gray-800"
                  required
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-800">Country</label>
                <input
                  type="text"
                  name="country"
                  value={newAddress.country}
                  onChange={handleAddressChange}
                  className="w-full p-2 border border-gray-200 rounded text-xs sm:text-sm text-gray-800"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-black text-xs sm:text-sm"
              >
                Add Address
              </button>
            </form>
            {addresses.length === 0 ? (
              <p className="text-xs sm:text-sm text-gray-600">No addresses saved</p>
            ) : (
              <div className="flex flex-col gap-4">
                {addresses.map((addr) => (
                  <div key={addr.id} className="border border-gray-200 p-3 sm:p-4 rounded-lg flex flex-col sm:flex-row justify-between">
                    <div className="text-xs sm:text-sm text-gray-600">
                      <p>{addr.street}</p>
                      <p>{addr.city}, {addr.state} {addr.zip}</p>
                      <p>{addr.country}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteAddress(addr.id)}
                      className="text-red-600 text-xs sm:text-sm hover:text-gray-800 mt-2 sm:mt-0"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "cards" && (
          <div className="flex flex-col gap-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Card Details</h1>
            <form onSubmit={handleAddCard} className="flex flex-col gap-4 mb-4 sm:mb-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-800">Card Number</label>
                <input
                  type="text"
                  name="number"
                  value={newCard.number}
                  onChange={handleCardChange}
                  className="w-full p-2 border border-gray-200 rounded text-xs sm:text-sm text-gray-800"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-800">Expiry (MM/YY)</label>
                <input
                  type="text"
                  name="expiry"
                  value={newCard.expiry}
                  onChange={handleCardChange}
                  className="w-full p-2 border border-gray-200 rounded text-xs sm:text-sm text-gray-800"
                  placeholder="12/25"
                  required
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-800">CVC</label>
                <input
                  type="text"
                  name="cvc"
                  value={newCard.cvc}
                  onChange={handleCardChange}
                  className="w-full p-2 border border-gray-200 rounded text-xs sm:text-sm text-gray-800"
                  placeholder="123"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-black text-xs sm:text-sm"
              >
                Add Card
              </button>
            </form>
            {cards.length === 0 ? (
              <p className="text-xs sm:text-sm text-gray-600">No cards saved</p>
            ) : (
              <div className="flex flex-col gap-4">
                {cards.map((card) => (
                  <div key={card.id} className="border border-gray-200 p-3 sm:p-4 rounded-lg flex flex-col sm:flex-row justify-between">
                    <div className="text-xs sm:text-sm text-gray-600">
                      <p>{card.brand} ending in {card.last4}</p>
                      <p>Expires: {card.expiry}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteCard(card.id)}
                      className="text-red-600 text-xs sm:text-sm hover:text-gray-800 mt-2 sm:mt-0"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "payment" && (
          <div className="flex flex-col gap-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Payment Options</h1>
            <p className="text-xs sm:text-sm text-gray-600">Select your preferred payment method:</p>
            <div className="flex flex-col gap-2">
              {["card", "bank_transfer", "cod"].map((option) => (
                <button
                  key={option}
                  className={`px-4 py-2 text-xs sm:text-sm text-gray-800 rounded ${
                    paymentOptions.preferred === option
                      ? "bg-gray-800 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => handleUpdatePaymentOptions(option)}
                >
                  {option === "card" ? "Credit/Debit Card" : option === "bank_transfer" ? "Bank Transfer" : "Cash on Delivery"}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === "edit" && (
          <div className="flex flex-col gap-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Edit Details</h1>
            {isEditing ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-800">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-200 rounded text-xs sm:text-sm text-gray-800"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-800">
                    Email (cannot be changed)
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    disabled
                    className="w-full p-2 border border-gray-200 rounded text-xs sm:text-sm text-gray-600 bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-800">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-200 rounded text-xs sm:text-sm text-gray-800"
                    placeholder="+1234567890"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-black text-xs sm:text-sm"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 text-xs sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-800">Full Name</p>
                  <p className="text-xs sm:text-sm text-gray-600">{profile.name || "Not set"}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-800">Email</p>
                  <p className="text-xs sm:text-sm text-gray-600">{profile.email}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-800">Phone</p>
                  <p className="text-xs sm:text-sm text-gray-600">{profile.phone || "Not set"}</p>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-black text-xs sm:text-sm"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}