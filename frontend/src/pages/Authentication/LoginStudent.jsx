import DynamicForm from "../../components/DynamicForm";

export default function UserLogin() {
  const fields = [
    {
      name: "username",
      label: "Username",
      type: "text",
      placeholder: "Enter Username",
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
      title="User Login"
      fields={fields}
      onSubmit={handleUserSubmit}
    />
  );
}