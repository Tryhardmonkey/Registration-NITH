import { useState, useEffect } from 'react';
import { Upload, User } from 'lucide-react';

export default function StudentProfile() {
  const [profileImage, setProfileImage] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get student ID from URL or use a default for testing
  // In production, use: const studentId = window.location.pathname.split('/').pop();
  const studentId = 1; // Change this to dynamic ID in production

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/students/${studentId}`);
      const result = await response.json();
      
      if (result.success) {
        setStudentData(result.data);
        if (result.data.profile_picture) {
          setProfileImage(`http://localhost:3000${result.data.profile_picture}`);
        }
      } else {
        setError('Student not found');
      }
    } catch (err) {
      setError('Failed to load student data');
      console.error('Error fetching student data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Show preview immediately
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);

      // Upload to server
      const formData = new FormData();
      formData.append('profilePicture', file);

      try {
        const response = await fetch(
          `http://localhost:3000/api/students/${studentId}/profile-picture`,
          {
            method: 'POST',
            body: formData,
          }
        );

        const result = await response.json();
        if (result.success) {
          console.log('Profile picture uploaded successfully');
        } else {
          console.error('Failed to upload profile picture');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !studentData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md text-center">
          <p className="text-red-600 text-lg font-semibold mb-2">{error || 'Student not found'}</p>
          <p className="text-gray-600">Please check the student ID and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 px-6 py-8">
            <h1 className="text-2xl font-bold text-white">Student Profile</h1>
            <p className="text-blue-100 text-sm mt-1">Academic Year 2024-2025</p>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Profile Picture */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 bg-gray-50">
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-500">
                      <User className="w-16 h-16 text-white" />
                    </div>
                  )}
                </div>
                
                <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer shadow-md transition-colors">
                  <Upload className="w-4 h-4" />
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Student Details */}
            <div className="space-y-4">
              <DetailRow label="Name" value={studentData.name} />
              <DetailRow label="Date of Birth" value={formatDate(studentData.dob)} />
              <DetailRow label="Gender" value={studentData.gender} />
              <DetailRow label="Branch" value={studentData.branch} />
              <DetailRow label="Category" value={studentData.category} />
              <DetailRow label="Application No." value={studentData.application_no} />
              {studentData.is_registered && (
                <DetailRow 
                  label="Registration Status" 
                  value={
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Registered
                    </span>
                  } 
                />
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4">
            <p className="text-xs text-gray-500 text-center">
              {studentData.registered_at 
                ? `Registered on: ${formatDate(studentData.registered_at)}` 
                : `Last Updated: ${formatDate(new Date())}`
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-200 last:border-b-0">
      <div className="text-sm font-semibold text-gray-600">
        {label}
      </div>
      <div className="col-span-2 text-sm text-gray-900">
        {value}
      </div>
    </div>
  );
}