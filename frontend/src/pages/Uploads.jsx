import { Upload } from "lucide-react";

export default function Uploads() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <div className="flex items-center space-x-3 mb-6">
          <Upload className="w-8 h-8 text-purple-500" />
          <h1 className="text-2xl font-bold">Upload Documents</h1>
        </div>
        <input
          type="file"
          className="w-full border p-2 rounded-lg mb-4"
        />
        <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition">
          Upload
        </button>
      </div>
    </div>
  );
}