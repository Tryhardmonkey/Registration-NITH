
import { GraduationCap, Users, FileCheck, Shield, ArrowRight, CheckCircle } from 'lucide-react';

export default function Homepage() {
  const features = [
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: "Easy Registration",
      description: "Simple and quick JEE registration process with minimal steps"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Login",
      description: "Encrypted password protection and secure authentication system"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Profile Management",
      description: "Complete student profile with document upload capabilities"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Real-time Updates",
      description: "Stay informed with latest notifications and announcements"
    }
  ];

  const steps = [
    "Complete JEE registration with application number",
    "Create your account with username and password",
    "Login and manage your student profile",
    "Stay updated with announcements and notifications"
  ];

  const handleRegisterClick = () => {
    // Navigate to registration page
    window.location.href = '/JEE-form';
  };

  const handleLoginClick = () => {
    // Navigate to login page
    window.location.href = '/Login-Student';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-600 p-4 rounded-full">
                <GraduationCap className="w-16 h-16 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Student Registration
              <span className="block text-blue-600 mt-2">Portal 2024-2025</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Streamlined registration system for JEE students. Register, create your account, and access your personalized student portal with ease.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button
                onClick={handleRegisterClick}
                className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl flex items-center gap-2 w-full sm:w-auto"
              >
                Register Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={handleLoginClick}
                className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-md hover:shadow-lg w-full sm:w-auto"
              >
                Student Login
              </button>
            </div>

            <p className="text-sm text-gray-500">
              Already registered? <a href="/Login-Student" className="text-blue-600 hover:underline font-medium">Sign in to your account</a>
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Portal?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A comprehensive student management system designed to simplify your registration and profile management experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="bg-blue-600 text-white p-3 rounded-lg w-fit mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600">
              Get started in just 4 simple steps
            </p>
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md flex items-start gap-4 hover:shadow-lg transition-shadow"
              >
                <div className="bg-blue-600 text-white font-bold text-lg w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-gray-700 pt-1">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-blue-100">Secure Platform</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Access Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">Fast</div>
              <div className="text-blue-100">Registration Process</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Join thousands of students already using our platform
          </p>
          <button
            onClick={handleRegisterClick}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
          >
            Register Your Account Today
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mb-2">© 2024-2025 Student Registration Portal. All rights reserved.</p>
            <p className="text-sm text-gray-500">
              Need help? Contact us at support@studentportal.edu
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}