import DynamicForm from "../../components/DynamicForm";
import { useState } from "react";

export default function JEEForm() {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const fields = [
    {
      name: "applicationNumber",
      label: "JEE Main Application Number",
      type: "text",
      placeholder: "Enter Application Number",
      required: true,
    },
    {
      name: "branch",
      label: "Branch",
      type: "select",
      options: ["CSE", "ECE", "ME", "CE", "EE", "MS", "MNC", "EP", "CH"],
      required: true,
    },
    {
      name: "dob",
      label: "Date of Birth",
      type: "date",
      required: true,
    },
  ];

  const handleStudentSubmit = async (data) => {
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("http://localhost:3000/api/students/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setMessage({ type: "success", text: result.message });
        // Redirect to profile page after 2 seconds
        setTimeout(() => {
          window.location.href = `/profile/${result.data.student_id}`;
        }, 2000);
      } else {
        setMessage({ type: "error", text: result.message });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to register. Please try again." });
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
        title="Student Registration"
        fields={fields}
        onSubmit={handleStudentSubmit}
        loading={loading}
      />
    </div>
  );
}