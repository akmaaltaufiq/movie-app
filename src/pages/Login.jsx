import { useNavigate } from "react-router-dom";
import { login } from "../utils/auth";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [input, setInput] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (
      savedUser &&
      savedUser.username === input.username &&
      savedUser.password === input.password
    ) {
      login("dummy-token");
      navigate("/");
    } else {
      setError("Incorrect username or password.");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-md mx-auto mt-24 p-8 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Login</h2>

      {error && (
        <div className="mb-4 p-2 text-red-700 bg-red-100 rounded">{error}</div>
      )}

      <label className="block mb-2 font-medium text-gray-700">Username</label>
      <input
        className="border border-gray-300 p-3 rounded-md w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Username"
        value={input.username}
        onChange={(e) => setInput({ ...input, username: e.target.value })}
        required
      />

      <label className="block mb-2 font-medium text-gray-700">Password</label>
      <input
        className="border border-gray-300 p-3 rounded-md w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="password"
        placeholder="Password"
        value={input.password}
        onChange={(e) => setInput({ ...input, password: e.target.value })}
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white py-3 rounded-md w-full hover:bg-blue-700 transition-colors duration-200"
      >
        Login
      </button>
    </form>
  );
}
