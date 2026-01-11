import { Bell } from "lucide-react";

export default function Updates() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <div className="flex items-center space-x-3 mb-6">
          <Bell className="w-8 h-8 text-green-500" />
          <h1 className="text-2xl font-bold">Latest Updates</h1>
        </div>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>New assignment uploaded for CS101.</li>
          <li>Exam schedule has been released.</li>
          <li>Holiday on 2nd October.</li>
        </ul>
      </div>
    </div>
  );
}
