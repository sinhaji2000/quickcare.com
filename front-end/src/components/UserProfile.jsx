import React from 'react';
import useUserProfile from '../hooks/useUserProfile';

const UserProfile = () => {
  const { user, error, loading, handleSignOut } = useUserProfile();

  if (loading) {
    return <p className="text-gray-600 text-center mt-10">Loading profile...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white rounded-xl shadow-md p-8 text-black">
        <h1 className="text-3xl font-bold mb-6 text-center">User Profile</h1>
        <div className="text-lg space-y-3">
          <p><span className="font-semibold">Name:</span> {user.name}</p>
          <p><span className="font-semibold">Email:</span> {user.email}</p>
          <p><span className="font-semibold">Age:</span> {user.age}</p>
          <p><span className="font-semibold">Phone:</span> {user.phone}</p>
        </div>
        <button
          onClick={handleSignOut}
          className="mt-8 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
