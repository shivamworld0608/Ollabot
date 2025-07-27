import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Upload, FileText, File, Loader2, Search, LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '../Redux/authSlice';
import { useNavigate } from 'react-router-dom';

export default function DocumentManager() {
  const [documents, setDocuments] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [notification, setNotification] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [sortOption, setSortOption] = useState('date-desc');
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch documents from the server
  const fetchDocuments = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/uploadedfile/get`, {
        withCredentials: true,
      });
      setDocuments(res.data);
    } catch (err) {
      showNotification('Failed to fetch documents', 'error');
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Handle file selection
  const handleFileSelect = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFile) {
      showNotification('Please select a file to upload', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    setIsUploading(true);
    setUploadProgress(0);

    try {
      await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/api/upload`, formData, {
        withCredentials: true,
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        },
      });
      setSelectedFile(null);
      fileInputRef.current.value = '';
      showNotification('Document uploaded successfully', 'success');
      fetchDocuments();
    } catch (err) {
      showNotification('Upload failed. Try again.', 'error');
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  // Show notification with message and type
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Format file size
  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    else if (bytes < 1048576) return `${(bytes / 1024).toFixed(2)} KB`;
    else return `${(bytes / 1048576).toFixed(2)} MB`;
  };

  // Format date
  const formatDate = (iso) => {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Handle logout with confirmation
  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/auth/logout`, {
        withCredentials: true,
      });
      dispatch(logout());
      navigate('/');
    } catch (err) {
      console.error('Logout failed', err);
      showNotification('Logout failed. Try again.', 'error');
    }
  };

  // Get file icon based on file type
  const getFileIcon = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    if (ext === 'pdf') return <FileText className="text-red-500" size={20} />;
    if (['doc', 'docx'].includes(ext)) return <FileText className="text-blue-500" size={20} />;
    if (ext === 'csv') return <FileText className="text-green-500" size={20} />;
    return <File className="text-gray-500" size={20} />;
  };

  // Filter and sort documents
  const filteredDocuments = documents.filter((doc) =>
    doc.filename?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    switch (sortOption) {
      case 'date-asc':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'date-desc':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'name-asc':
        return a.filename.localeCompare(b.filename);
      case 'name-desc':
        return b.filename.localeCompare(a.filename);
      case 'size-asc':
        return a.size - b.size;
      case 'size-desc':
        return b.size - a.size;
      default:
        return 0;
    }
  });

  // Vector positions for 70+ elements
  const vectorPositions = [
    { top: '10%', left: '5%', size: 60, type: 'pdf', opacity: 0.1 },
    { top: '15%', left: '80%', size: 50, type: 'upload', opacity: 0.08 },
    { top: '20%', left: '30%', size: 40, type: 'ai', opacity: 0.12 },
    { top: '25%', left: '60%', size: 70, type: 'pdf', opacity: 0.1 },
    { top: '30%', left: '15%', size: 55, type: 'upload', opacity: 0.09 },
    { top: '35%', left: '90%', size: 45, type: 'ai', opacity: 0.11 },
    { top: '40%', left: '25%', size: 65, type: 'pdf', opacity: 0.1 },
    { top: '45%', left: '75%', size: 50, type: 'upload', opacity: 0.08 },
    { top: '50%', left: '10%', size: 60, type: 'ai', opacity: 0.12 },
    { top: '55%', left: '85%', size: 40, type: 'pdf', opacity: 0.09 },
    { top: '60%', left: '20%', size: 70, type: 'upload', opacity: 0.1 },
    { top: '65%', left: '70%', size: 55, type: 'ai', opacity: 0.11 },
    { top: '70%', left: '15%', size: 45, type: 'pdf', opacity: 0.08 },
    { top: '75%', left: '80%', size: 60, type: 'upload', opacity: 0.1 },
    { top: '80%', left: '30%', size: 50, type: 'ai', opacity: 0.12 },
    { top: '85%', left: '60%', size: 65, type: 'pdf', opacity: 0.09 },
    { top: '90%', left: '5%', size: 55, type: 'upload', opacity: 0.1 },
    { top: '10%', left: '95%', size: 40, type: 'ai', opacity: 0.11 },
    { top: '15%', left: '25%', size: 60, type: 'pdf', opacity: 0.08 },
    { top: '20%', left: '70%', size: 50, type: 'upload', opacity: 0.1 },
    { top: '25%', left: '15%', size: 70, type: 'ai', opacity: 0.12 },
    { top: '30%', left: '85%', size: 45, type: 'pdf', opacity: 0.09 },
    { top: '35%', left: '20%', size: 55, type: 'upload', opacity: 0.1 },
    { top: '40%', left: '75%', size: 65, type: 'ai', opacity: 0.11 },
    { top: '45%', left: '10%', size: 50, type: 'pdf', opacity: 0.08 },
    { top: '50%', left: '90%', size: 60, type: 'upload', opacity: 0.1 },
    { top: '55%', left: '30%', size: 40, type: 'ai', opacity: 0.12 },
    { top: '60%', left: '65%', size: 70, type: 'pdf', opacity: 0.09 },
    { top: '65%', left: '5%', size: 55, type: 'upload', opacity: 0.1 },
    { top: '70%', left: '80%', size: 45, type: 'ai', opacity: 0.11 },
    { top: '75%', left: '20%', size: 60, type: 'pdf', opacity: 0.08 },
    { top: '80%', left: '70%', size: 50, type: 'upload', opacity: 0.1 },
    { top: '85%', left: '15%', size: 65, type: 'ai', opacity: 0.12 },
    { top: '90%', left: '85%', size: 40, type: 'pdf', opacity: 0.09 },
    { top: '5%', left: '30%', size: 55, type: 'upload', opacity: 0.1 },
    { top: '10%', left: '60%', size: 60, type: 'ai', opacity: 0.11 },
    { top: '15%', left: '10%', size: 50, type: 'pdf', opacity: 0.08 },
    { top: '20%', left: '90%', size: 70, type: 'upload', opacity: 0.1 },
    { top: '25%', left: '25%', size: 45, type: 'ai', opacity: 0.12 },
    { top: '30%', left: '75%', size: 60, type: 'pdf', opacity: 0.09 },
    { top: '35%', left: '5%', size: 55, type: 'upload', opacity: 0.1 },
    { top: '40%', left: '80%', size: 65, type: 'ai', opacity: 0.11 },
    { top: '45%', left: '20%', size: 50, type: 'pdf', opacity: 0.08 },
    { top: '50%', left: '70%', size: 60, type: 'upload', opacity: 0.1 },
    { top: '55%', left: '15%', size: 40, type: 'ai', opacity: 0.12 },
    { top: '60%', left: '85%', size: 70, type: 'pdf', opacity: 0.09 },
    { top: '65%', left: '25%', size: 55, type: 'upload', opacity: 0.1 },
    { top: '70%', left: '60%', size: 45, type: 'ai', opacity: 0.11 },
    { top: '75%', left: '5%', size: 60, type: 'pdf', opacity: 0.08 },
    { top: '80%', left: '90%', size: 50, type: 'upload', opacity: 0.1 },
    { top: '85%', left: '30%', size: 65, type: 'ai', opacity: 0.12 },
    { top: '90%', left: '70%', size: 40, type: 'pdf', opacity: 0.09 },
    { top: '5%', left: '15%', size: 55, type: 'upload', opacity: 0.1 },
    { top: '10%', left: '75%', size: 60, type: 'ai', opacity: 0.11 },
    { top: '15%', left: '20%', size: 50, type: 'pdf', opacity: 0.08 },
    { top: '20%', left: '85%', size: 70, type: 'upload', opacity: 0.1 },
    { top: '25%', left: '30%', size: 45, type: 'ai', opacity: 0.12 },
    { top: '30%', left: '70%', size: 60, type: 'pdf', opacity: 0.09 },
    { top: '35%', left: '10%', size: 55, type: 'upload', opacity: 0.1 },
    { top: '40%', left: '90%', size: 65, type: 'ai', opacity: 0.11 },
    { top: '45%', left: '25%', size: 50, type: 'pdf', opacity: 0.08 },
    { top: '50%', left: '80%', size: 60, type: 'upload', opacity: 0.1 },
    { top: '55%', left: '20%', size: 40, type: 'ai', opacity: 0.12 },
    { top: '60%', left: '75%', size: 70, type: 'pdf', opacity: 0.09 },
    { top: '65%', left: '15%', size: 55, type: 'upload', opacity: 0.1 },
    { top: '70%', left: '85%', size: 45, type: 'ai', opacity: 0.11 },
    { top: '75%', left: '30%', size: 60, type: 'pdf', opacity: 0.08 },
    { top: '80%', left: '70%', size: 50, type: 'upload', opacity: 0.1 },
    { top: '85%', left: '5%', size: 65, type: 'ai', opacity: 0.12 },
    { top: '90%', left: '90%', size: 40, type: 'pdf', opacity: 0.09 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 relative overflow-hidden">
      {/* Background Vector Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {vectorPositions.map((vector, index) => (
          <div
            key={index}
            className="absolute"
            style={{ top: vector.top, left: vector.left, opacity: vector.opacity }}
          >
            {vector.type === 'pdf' && (
              <svg
                width={vector.size}
                height={vector.size}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0369A0"
                strokeWidth="1"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            )}
            {vector.type === 'upload' && (
              <svg
                width={vector.size}
                height={vector.size}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0369A0"
                strokeWidth="1"
              >
                <path d="M12 2v8m0-8l-4 4m4-4l4 4" />
                <path d="M4 12h16" />
              </svg>
            )}
            {vector.type === 'ai' && (
              <svg
                width={vector.size}
                height={vector.size}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0369A0"
                strokeWidth="1"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2a10 10 0 0 0 0 20m0-20a10 10 0 0 1 0 20" />
                <path d="M12 9v3m0 0v3m-3-3h3m-3 0H9m6 0h3m-3 0h3" />
              </svg>
            )}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="p-6 max-w-5xl mx-auto relative z-20">
        {/* Logout Button */}
        <div className="absolute top-5 right-5">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-red-50 transition-all group"
          >
            <LogOut className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-red-500 group-hover:text-red-600">Logout</span>
          </button>
        </div>

        {/* Logout Confirmation Modal */}
        {showLogoutModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
              <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
              <div className="flex gap-4">
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Yes, Logout
                </button>
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <h1 className="text-4xl font-extrabold mb-8 text-gray-900">
          📄 Document <span className="text-[#0369A0]">Manager</span>
        </h1>

        {/* Notification */}
        {notification && (
          <div
            className={`mb-6 p-4 rounded-lg text-white text-sm font-medium shadow-lg transform transition-all duration-300 ease-in-out animate-slide-down ${
              notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
            }`}
          >
            {notification.message}
          </div>
        )}

        {/* File Upload and Sort Controls */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between gap-4 items-center">
          <div className="flex gap-3">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileSelect}
              accept=".pdf,.docx,.csv,.txt"
            />
            <button
              onClick={() => fileInputRef.current.click()}
              className="flex items-center gap-2 bg-[#0369A0] hover:bg-indigo-800 text-white px-5 py-2.5 rounded-lg shadow-md transition-all"
            >
              <Upload size={18} />
              Select File
            </button>
            <button
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg shadow-md transition-all disabled:opacity-50"
            >
              {isUploading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={18} />
                  Uploading... {uploadProgress}%
                </span>
              ) : (
                'Upload'
              )}
            </button>
          </div>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-200 px-4 py-2 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-indigo-500"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="size-asc">Size (Smallest)</option>
            <option value="size-desc">Size (Largest)</option>
          </select>
        </div>

        {/* Upload Progress Bar */}
        {isUploading && (
          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-[#0369A0] h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-200 px-4 py-3 rounded-lg shadow-sm pl-10 focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
        </div>

        {/* Document List */}
        {sortedDocuments.length > 0 ? (
          <div className="grid gap-4">
            {sortedDocuments.map((doc) => (
              <div
                key={doc._id}
                className="flex justify-between items-center bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  {getFileIcon(doc.filename)}
                  <div>
                    <a
                      href={`${import.meta.env.VITE_APP_BASE_URL}/uploads/${doc.filename}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0369A0] hover:underline font-medium"
                    >
                      {doc.filename}
                    </a>
      
                  </div>
                </div>
                <div className="text-sm text-gray-500">{formatDate(doc.createdAt)}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-8">No documents found.</p>
        )}
      </div>
    </div>
  );
}