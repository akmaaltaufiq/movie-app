import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isEmailValid = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isPasswordStrong = (password) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate username
    if (user.username.length < 4) {
      setError("Username must be at least 4 characters long.");
      return;
    }

    // Validate email
    if (!isEmailValid(user.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Validate password
    if (!isPasswordStrong(user.password)) {
      setError(
        "Password must be at least 8 characters long and include letters, numbers, and symbols."
      );
      return;
    }

    // Save if all valid
    localStorage.setItem("user", JSON.stringify(user));
    setError("");
    setSuccess("Registration successful. Redirecting to login...");
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
      {error && (
        <div className="mb-4 p-2 text-red-700 bg-red-100 rounded">{error}</div>
      )}

      <label className="block mb-2 font-medium text-gray-700">Username</label>
      <input
        className="border border-gray-300 p-3 rounded-md w-full mb-6 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
        type="text"
        placeholder="Username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        required
      />

      <label className="block mb-2 font-medium text-gray-700">Email</label>
      <input
        className="border border-gray-300 p-3 rounded-md w-full mb-6 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        required
      />

      <label className="block mb-2 font-medium text-gray-700">Password</label>
      <input
        className="border border-gray-300 p-3 rounded-md w-full mb-6 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
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
