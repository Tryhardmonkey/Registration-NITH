import { useState } from 'react';

export default function DocumentUpload() {
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Academic Transcript', required: true, uploaded: false, verified: null, file: null },
    { id: 2, name: 'ID Proof (Aadhaar/Passport)', required: true, uploaded: false, verified: null, file: null },
    { id: 3, name: 'Address Proof', required: true, uploaded: false, verified: null, file: null },
    { id: 4, name: 'Birth Certificate', required: true, uploaded: false, verified: null, file: null },
    { id: 5, name: 'Previous Institution Certificate', required: true, uploaded: false, verified: null, file: null },
    { id: 6, name: 'Passport Size Photo', required: true, uploaded: false, verified: null, file: null },
    { id: 7, name: 'Caste Certificate', required: false, uploaded: false, verified: null, file: null },
    { id: 8, name: 'Income Certificate', required: false, uploaded: false, verified: null, file: null },
    { id: 9, name: 'Sports Certificate', required: false, uploaded: false, verified: null, file: null },
  ]);

  const handleFileUpload = (docId, event) => {
    const file = event.target.files[0];
    if (file) {
      setDocuments(prevDocs => {
        const updatedDocs = prevDocs.map(doc =>
          doc.id === docId
            ? { ...doc, uploaded: true, file: file.name, verified: 'pending' }
            : doc
        );
        
        // Sort: required & not uploaded first, then uploaded docs, then optional & not uploaded
        return updatedDocs.sort((a, b) => {
          if (a.required && !a.uploaded && (!b.required || b.uploaded)) return -1;
          if (b.required && !b.uploaded && (!a.required || a.uploaded)) return 1;
          if (a.uploaded && !b.uploaded) return 1;
          if (b.uploaded && !a.uploaded) return -1;
          return 0;
        });
      });
    }
  };

  const handleRemove = (docId) => {
    setDocuments(prevDocs => {
      const updatedDocs = prevDocs.map(doc =>
        doc.id === docId
          ? { ...doc, uploaded: false, file: null, verified: null }
          : doc
      );
      
      // Re-sort after removal
      return updatedDocs.sort((a, b) => {
        if (a.required && !a.uploaded && (!b.required || b.uploaded)) return -1;
        if (b.required && !b.uploaded && (!a.required || a.uploaded)) return 1;
        if (a.uploaded && !b.uploaded) return 1;
        if (b.uploaded && !a.uploaded) return -1;
        return 0;
      });
    });
  };

  // Demo function to simulate verification status change
  const toggleVerificationStatus = (docId) => {
    setDocuments(prevDocs =>
      prevDocs.map(doc => {
        if (doc.id === docId && doc.uploaded) {
          const statuses = ['pending', 'approved', 'rejected'];
          const currentIndex = statuses.indexOf(doc.verified);
          const nextStatus = statuses[(currentIndex + 1) % statuses.length];
          return { ...doc, verified: nextStatus };
        }
        return doc;
      })
    );
  };

  const getStatusBadge = (verified) => {
    if (!verified) return null;
    
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      approved: 'bg-green-100 text-green-800 border-green-300',
      rejected: 'bg-red-100 text-red-800 border-red-300'
    };

    const icons = {
      pending: '⏳',
      approved: '✓',
      rejected: '✗'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${styles[verified]}`}>
        {icons[verified]} {verified.charAt(0).toUpperCase() + verified.slice(1)}
      </span>
    );
  };

  const requiredNotUploaded = documents.filter(doc => doc.required && !doc.uploaded).length;
  const totalUploaded = documents.filter(doc => doc.uploaded).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Document Upload Portal</h1>
          <p className="text-gray-600 mb-4">Upload all required documents for verification</p>
          
          <div className="flex gap-4 mb-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex-1">
              <div className="text-2xl font-bold text-blue-700">{totalUploaded}</div>
              <div className="text-sm text-blue-600">Documents Uploaded</div>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex-1">
              <div className="text-2xl font-bold text-orange-700">{requiredNotUploaded}</div>
              <div className="text-sm text-orange-600">Required Pending</div>
            </div>
          </div>

          {requiredNotUploaded > 0 && (
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-4">
              <p className="text-orange-800">
                <strong>Note:</strong> You have {requiredNotUploaded} required document{requiredNotUploaded !== 1 ? 's' : ''} pending upload.
              </p>
            </div>
          )}
        </div>

        <div className="space-y-3">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className={`bg-white rounded-lg shadow-sm border-2 p-5 transition-all ${
                doc.required && !doc.uploaded
                  ? 'border-orange-300 bg-orange-50'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3 flex-1">
                  <div className="text-2xl">
                    {doc.uploaded ? '📄' : '📋'}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {doc.name}
                      {doc.required && (
                        <span className="ml-2 text-red-500 text-sm">*</span>
                      )}
                    </h3>
                    {doc.uploaded && doc.file && (
                      <p className="text-sm text-gray-500">{doc.file}</p>
                    )}
                  </div>
                </div>

                {getStatusBadge(doc.verified)}
              </div>

              <div className="flex gap-3 items-center">
                {!doc.uploaded ? (
                  <label className="flex-1">
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileUpload(doc.id, e)}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <div className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-center cursor-pointer hover:bg-indigo-700 transition">
                      Choose File
                    </div>
                  </label>
                ) : (
                  <>
                    <button
                      onClick={() => handleRemove(doc.id)}
                      className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                    {/* Demo button - click to cycle through verification statuses */}
                    <button
                      onClick={() => toggleVerificationStatus(doc.id)}
                      className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition text-sm"
                    >
                      Toggle Status (Demo)
                    </button>
                  </>
                )}
              </div>

              {doc.verified === 'rejected' && (
                <div className="mt-3 bg-red-50 border border-red-200 rounded p-3 text-sm text-red-700">
                  <strong>Rejection Reason:</strong> Document quality is poor. Please upload a clearer image.
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h3 className="font-semibold text-gray-800 mb-3">Upload Guidelines:</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Accepted formats: PDF, JPG, PNG</li>
            <li>• Maximum file size: 5MB per document</li>
            <li>• Documents marked with <span className="text-red-500">*</span> are required</li>
            <li>• Ensure all documents are clear and legible</li>
            <li>• Verification typically takes 2-3 business days</li>
          </ul>
        </div>
      </div>
    </div>
  );
}