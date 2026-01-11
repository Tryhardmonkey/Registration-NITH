import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RoleSelection() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSelect = (selectedRole) => {
    setRole(selectedRole);
    // Navigate to the appropriate page based on role
    if (selectedRole === "Student") navigate("/JEE-form");
    else if (selectedRole === "Teacher") navigate("/teacher-dashboard");
    else if (selectedRole === "Admin") navigate("/admin-dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Select Your Role</h1>
      <div className="flex flex-col space-y-4">
        {["Student", "Teacher", "Admin"].map((r) => (
          <button
            key={r}
            onClick={() => handleSelect(r)}
            className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            {r}
          </button>
        ))}
      </div>
      {role && <p className="mt-4 text-gray-700">Selected Role: {role}</p>}
    </div>
  );
}
