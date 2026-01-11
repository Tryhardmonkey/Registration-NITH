import DynamicForm from "../../components/DynamicForm";

export default function UserRegister() {
  const fields = [
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
      placeholder: "Enter Password",
      required: true,
    },
  ];

  const handleUserSubmit = (data) => {
    console.log("User Registered:", data);
  };

  return (
    <DynamicForm
      title="User Registration"
      fields={fields}
      onSubmit={handleUserSubmit}
    />
  );
}
