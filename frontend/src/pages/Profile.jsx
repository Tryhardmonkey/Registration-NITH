import { User } from "lucide-react";

export default function Profile() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <div className="flex items-center space-x-3 mb-6">
          <User className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-bold">Student Profile</h1>
        </div>
        <p className="text-gray-700">Here you can view and update your student details.</p>
      </div>
    </div>
  );
}