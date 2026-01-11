import DynamicForm from "../../components/DynamicForm";

export default function JEEForm() {
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
      options: ["CSE", "ECE", "ME", "CE", "EE","MS","MNC","EP","CH"],
      required: true,
    },
    {
      name: "dob",
      label: "Date of Birth",
      type: "date",
      required: true,
    },
  ];

  const handleStudentSubmit = (data) => {
    console.log("Student Form Submitted:", data);
  };

  return (
    <DynamicForm
      title="Student Registration"
      fields={fields}
      onSubmit={handleStudentSubmit}
    />
  );
}