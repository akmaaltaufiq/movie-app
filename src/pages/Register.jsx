import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(user));
    setSuccess("Registrasi berhasil, silakan login.");
    setTimeout(() => {
      setSuccess("");
      navigate("/login");
    }, 2000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-24 p-8 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Register</h2>

      {success && (
        <div className="mb-4 p-2 text-green-700 bg-green-100 rounded">
          {success}
        </div>
      )}

      <label className="block mb-2 font-medium text-gray-700">Username</label>
      <input
        className="border border-gray-300 p-3 rounded-md w-full mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
        type="text"
        placeholder="Username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        required
      />

      <label className="block mb-2 font-medium text-gray-700">Email</label>
      <input
        className="border border-gray-300 p-3 rounded-md w-full mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        required
      />

      <label className="block mb-2 font-medium text-gray-700">Password</label>
      <input
        className="border border-gray-300 p-3 rounded-md w-full mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        required
      />

      <button
        type="submit"
        className="bg-green-600 text-white py-3 rounded-md w-full hover:bg-green-700 transition-colors duration-200"
      >
        Register
      </button>
    </form>
  );
}
