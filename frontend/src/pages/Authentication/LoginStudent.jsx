import DynamicForm from "../../components/DynamicForm";
import { useState } from "react";

export default function Login() {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const fields = [
    {
      name: "username",
      label: "Username or Email",
      type: "text",
      placeholder: "Enter Username or Email",
      required: true,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter Password",
      required: true,
    },
  ];

  const handleLoginSubmit = async (data) => {
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("http://localhost:3000/api/students/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setMessage({ type: "success", text: result.message });
        
        // Store user data
        localStorage.setItem('studentId', result.data.student_id);
        localStorage.setItem('username', result.data.username);
        localStorage.setItem('isLoggedIn', 'true');
        
        setTimeout(() => {
          window.location.href = `/profile`;
        }, 1000);
      } else {
        setMessage({ type: "error", text: result.message });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to login. Please try again." });
      console.error("Login error:", error);
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
        title="Student Login"
        fields={fields}
        onSubmit={handleLoginSubmit}
        loading={loading}
      />
      <div className="mt-4 text-center text-sm text-gray-600">
        <p>
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Create Account
          </a>
        </p>
      </div>
    </div>
  );
}