import { useEffect, useState } from "react";
import { UserCircle, Mail } from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    setUser(savedUser);
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500 text-lg">
          Silakan login untuk melihat profil.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      {/* Avatar / Logo */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={`https://ui-avatars.com/api/?name=${user.username}&background=random&size=128`}
          alt="User Avatar"
          className="w-24 h-24 rounded-full shadow"
        />
        <h1 className="text-2xl font-semibold mt-4 text-gray-800">
          {user.username}
        </h1>
        <p className="text-sm text-gray-500">Registered Users</p>
      </div>

      {/* Detail Info */}
      <div className="space-y-4 text-gray-700">
        <div className="flex items-center gap-3">
          <UserCircle className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm font-medium text-gray-500">Username</p>
            <p className="text-lg font-semibold">{user.username}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="text-lg font-semibold">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
