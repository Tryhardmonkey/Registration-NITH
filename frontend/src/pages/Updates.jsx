import { Bell, Calendar, AlertCircle, CheckCircle, Info } from 'lucide-react';

export default function UpdatesPage() {
  const updates = [
    {
      id: 1,
      type: "important",
      title: "Semester Exam Schedule Released",
      description: "End semester examination schedule for all branches has been published. Please check the academic portal for detailed timetable.",
      date: "2026-01-10",
      time: "10:30 AM"
    },
    {
      id: 2,
      type: "general",
      title: "Library Hours Extended",
      description: "Central library will remain open till 10 PM during examination period starting from January 15th.",
      date: "2026-01-09",
      time: "02:15 PM"
    },
    {
      id: 3,
      type: "success",
      title: "Scholarship Applications Approved",
      description: "Merit scholarship applications for semester 1 have been approved. Amount will be credited within 7 working days.",
      date: "2026-01-08",
      time: "11:00 AM"
    },
    {
      id: 4,
      type: "important",
      title: "Hostel Fee Payment Deadline",
      description: "Last date to pay hostel fees for the current semester is January 20th. Late fee will be applicable after the deadline.",
      date: "2026-01-07",
      time: "09:00 AM"
    },
    {
      id: 5,
      type: "general",
      title: "Technical Fest Registration Open",
      description: "Registration for annual technical fest 'TechnoVision 2026' is now open. Multiple events across various domains available.",
      date: "2026-01-06",
      time: "04:30 PM"
    },
    {
      id: 6,
      type: "info",
      title: "Career Counseling Session",
      description: "Career guidance and counseling session scheduled for final year students on January 18th in the main auditorium.",
      date: "2026-01-05",
      time: "03:00 PM"
    },
    {
      id: 7,
      type: "success",
      title: "Placement Drive Completed",
      description: "Campus placement drive with Tech Solutions Inc. concluded successfully. Selected candidates will be notified via email.",
      date: "2026-01-04",
      time: "05:45 PM"
    },
    {
      id: 8,
      type: "general",
      title: "Sports Day Announcement",
      description: "Annual sports day will be held on January 25th. Students interested in participating should register with the sports department.",
      date: "2026-01-03",
      time: "01:20 PM"
    }
  ];

  const getUpdateIcon = (type) => {
    switch(type) {
      case "important":
        return <AlertCircle className="w-5 h-5" />;
      case "success":
        return <CheckCircle className="w-5 h-5" />;
      case "info":
        return <Info className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getUpdateStyle = (type) => {
    switch(type) {
      case "important":
        return "bg-red-50 border-red-200 text-red-700";
      case "success":
        return "bg-green-50 border-green-200 text-green-700";
      case "info":
        return "bg-blue-50 border-blue-200 text-blue-700";
      default:
        return "bg-gray-50 border-gray-200 text-gray-700";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-3 rounded-full">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Updates & Notifications</h1>
              <p className="text-sm text-gray-600">Stay informed about important announcements</p>
            </div>
          </div>
        </div>

        {/* Updates List */}
        <div className="space-y-4">
          {updates.map((update) => (
            <div 
              key={update.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${getUpdateStyle(update.type)}`}>
                    {getUpdateIcon(update.type)}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg mb-2">
                      {update.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {update.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(update.date)}</span>
                      </div>
                      <span>•</span>
                      <span>{update.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Showing all updates • Last refreshed: {new Date().toLocaleTimeString('en-IN', { 
              hour: '2-digit', 
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>
    </div>
  );
}