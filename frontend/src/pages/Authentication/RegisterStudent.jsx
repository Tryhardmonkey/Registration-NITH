import DynamicForm from "../../components/DynamicForm";
import { useState } from "react";

export default function UserRegister() {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get application number from session/localStorage or URL
  // For now, we'll assume it's stored after JEE registration
  const applicationNumber = localStorage.getItem('applicationNumber') || '';

  const fields = [
    {
      name: "applicationNumber",
      label: "Application Number",
      type: "text",
      placeholder: "Enter Application Number",
      required: true,
      defaultValue: applicationNumber
    },
    {
      name: "username",
      label: "Username",
      type: "text",
      placeholder: "Enter Username",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter Email",
      required: true,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter Password (min 6 characters)",
      required: true,
    },
  ];

  const handleUserSubmit = async (data) => {
    setLoading(true);
    setMessage(null);

    // Validate password length
    if (data.password.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters" });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/students/create-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setMessage({ type: "success", text: result.message });
        // Store student ID and redirect to profile
        localStorage.setItem('studentId', result.data.student_id);
        localStorage.setItem('username', result.data.username);
        
        setTimeout(() => {
          window.location.href = `/profile`;
        }, 2000);
      } else {
        setMessage({ type: "error", text: result.message });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to create account. Please try again." });
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {message && (
        <div
          className={`mb-4 p-4 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}
      <DynamicForm
        title="Create Your Account"
        fields={fields}
        onSubmit={handleUserSubmit}
        loading={loading}
      />
    </div>
  );
}