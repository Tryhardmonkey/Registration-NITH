import { HelpCircle } from "lucide-react";

export default function Help() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <div className="flex items-center space-x-3 mb-6">
          <HelpCircle className="w-8 h-8 text-red-500" />
          <h1 className="text-2xl font-bold">Help & Support</h1>
        </div>
        <p className="text-gray-700 mb-4">
          Need assistance? Here are some quick links:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>📧 Contact support at <span className="text-blue-500">support@college.com</span></li>
          <li>📖 Read the <span className="text-blue-500">User Guide</span></li>
          <li>❓ Check the <span className="text-blue-500">FAQ</span></li>
        </ul>
      </div>
    </div>
  );
}
