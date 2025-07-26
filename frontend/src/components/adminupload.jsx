import React, { useState, useEffect, useRef } from 'react';
import { Trash2, Upload, AlertCircle, File, Check, Loader2, X, Search, Database } from 'lucide-react';

export default function DocumentManager() {
  // State management
  const [documents, setDocuments] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [notification, setNotification] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const fileInputRef = useRef(null);
  const [sortOption, setSortOption] = useState('date-desc');
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    // Simulating API call to fetch documents
    const fetchDocuments = async () => {
      // In a real app, this would be an API call to your backend
      const mockDocuments = [
        { id: '1', name: 'Annual Report 2024.pdf', size: 4200000, type: 'application/pdf', dateAdded: new Date(2024, 4, 15), status: 'processed' },
        { id: '2', name: 'Product Documentation.pdf', size: 2800000, type: 'application/pdf', dateAdded: new Date(2024, 4, 10), status: 'processed' },
        { id: '3', name: 'Technical Specifications.docx', size: 1500000, type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', dateAdded: new Date(2024, 4, 5), status: 'processed' },
        { id: '4', name: 'Research Paper.pdf', size: 3700000, type: 'application/pdf', dateAdded: new Date(2024, 4, 1), status: 'processed' },
        { id: '5', name: 'Company Policy.pdf', size: 1200000, type: 'application/pdf', dateAdded: new Date(2024, 3, 25), status: 'processing' },
      ];
      setDocuments(mockDocuments);
    };

    fetchDocuments();
  }, []);

  // Filter documents based on search query
  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort documents based on selected option
  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    switch (sortOption) {
      case 'date-asc':
        return a.dateAdded - b.dateAdded;
      case 'date-desc':
        return b.dateAdded - a.dateAdded;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'size-asc':
        return a.size - b.size;
      case 'size-desc':
        return b.size - a.size;
      default:
        return 0;
    }
  });

  const handleFileSelect = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

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
    const res = await fetch('http://localhost:5000/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      throw new Error('Upload failed');
    }

    const data = await res.json(); // Assuming response returns file metadata
    const newDoc = {
      id: `${Date.now()}`,
      name: data.name || selectedFile.name,
      size: selectedFile.size,
      type: selectedFile.type,
      dateAdded: new Date(),
      status: 'processed'
    };

    setDocuments(prev => [newDoc, ...prev]);
    setSelectedFile(null);
    showNotification('Document successfully uploaded and embedded in ChromaDB', 'success');
  } catch (err) {
    console.error(err);
    showNotification('Upload failed. Try again.', 'error');
  } finally {
    setIsUploading(false);
    setUploadProgress(100);
    setTimeout(() => setUploadProgress(0), 1000);
  }
};

  const initiateDelete = (id) => {
    setConfirmDelete(id);
  };

  const confirmDeleteDocument = async (id) => {
    // In a real app, this would be an API call to delete from ChromaDB
    setDocuments(prev => prev.filter(doc => doc.id !== id));
    setConfirmDelete(null);
    showNotification('Document successfully deleted from ChromaDB', 'success');
  };

  const cancelDelete = () => {
    setConfirmDelete(null);
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
    else return (bytes / 1048576).toFixed(2) + ' MB';
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getFileIcon = (docType) => {
    if (docType.includes('pdf')) {
      return <File className="text-red-500" />;
    } else if (docType.includes('word')) {
      return <File className="text-blue-500" />;
    } else if (docType.includes('spreadsheet') || docType.includes('excel')) {
      return <File className="text-green-500" />;
    } else {
      return <File className="text-gray-500" />;
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Database size={24} className="text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-800">ChromaDB Document Manager</h1>
        </div>
        <div className="text-sm text-gray-500">
          {documents.length} document{documents.length !== 1 ? 's' : ''} in database
        </div>
      </div>

      {/* Upload section */}
      <div 
        className="border-2 border-dashed border-indigo-300 rounded-lg p-6 mb-6 bg-indigo-50 transition-all hover:border-indigo-500"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <Upload size={40} className="mx-auto mb-2 text-indigo-500" />
          <h2 className="text-lg font-semibold mb-2">Upload Documents</h2>
          <p className="text-gray-500 mb-4 text-sm">
            Supported files: PDF, DOCX, TXT, CSV (Max size: 50MB)
          </p>
          
          {selectedFile ? (
            <div className="bg-white p-3 rounded-md border border-gray-200 mb-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getFileIcon(selectedFile.type)}
                <div className="text-left">
                  <p className="font-medium truncate max-w-xs">{selectedFile.name}</p>
                  <p className="text-xs text-gray-500">{formatSize(selectedFile.size)}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedFile(null)} 
                className="text-gray-500 hover:text-red-500"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <div 
              onClick={() => fileInputRef.current.click()}
              className="cursor-pointer bg-white border border-gray-300 rounded-lg p-4 flex items-center justify-center mb-4 hover:border-indigo-500 transition-colors"
            >
              <p className="text-sm text-gray-500">
                Click to select a file or drag and drop
              </p>
            </div>
          )}
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            accept=".pdf,.docx,.txt,.csv"
          />
          
          {isUploading && (
            <div className="mb-4">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 transition-all"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">Uploading... {uploadProgress}%</p>
            </div>
          )}
          
          {isProcessing && (
            <div className="mb-4 flex items-center justify-center space-x-2">
              <Loader2 size={18} className="animate-spin text-indigo-600" />
              <p className="text-sm text-indigo-600">Processing document and creating embeddings...</p>
            </div>
          )}
          
          <button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading || isProcessing}
            className={`px-4 py-2 rounded-md font-medium ${
              !selectedFile || isUploading || isProcessing
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            } transition-colors`}
          >
            {isUploading ? 'Uploading...' : isProcessing ? 'Processing...' : 'Upload to ChromaDB'}
          </button>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div 
          className={`mb-4 p-3 rounded-md flex items-center justify-between ${
            notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          <div className="flex items-center space-x-2">
            {notification.type === 'success' ? (
              <Check size={18} className="text-green-600" />
            ) : (
              <AlertCircle size={18} className="text-red-600" />
            )}
            <span>{notification.message}</span>
          </div>
          <button 
            onClick={() => setNotification(null)}
            className="text-gray-600 hover:text-gray-800"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Search and sort */}
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
        <div className="relative w-full sm:w-64">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <label htmlFor="sort" className="text-sm text-gray-600">Sort by:</label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          >
            <option value="date-desc">Date (Newest)</option>
            <option value="date-asc">Date (Oldest)</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="size-desc">Size (Largest)</option>
            <option value="size-asc">Size (Smallest)</option>
          </select>
        </div>
      </div>

      {/* Documents table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-100 p-3 border-b border-gray-200 font-medium text-gray-700">
          <div className="col-span-6">Document</div>
          <div className="col-span-2 text-center">Size</div>
          <div className="col-span-2 text-center">Date Added</div>
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-1 text-center">Action</div>
        </div>
        
        {sortedDocuments.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {sortedDocuments.map((doc) => (
              <div key={doc.id} className="grid grid-cols-12 p-3 hover:bg-gray-50 items-center">
                <div className="col-span-6 flex items-center space-x-3">
                  {getFileIcon(doc.type)}
                  <span className="font-medium truncate">{doc.name}</span>
                </div>
                <div className="col-span-2 text-center text-sm text-gray-500">
                  {formatSize(doc.size)}
                </div>
                <div className="col-span-2 text-center text-sm text-gray-500">
                  {formatDate(doc.dateAdded)}
                </div>
                <div className="col-span-1 text-center">
                  {doc.status === 'processed' ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <Check size={12} className="mr-1" />
                      Ready
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      <Loader2 size={12} className="mr-1 animate-spin" />
                      Processing
                    </span>
                  )}
                </div>
                <div className="col-span-1 text-center">
                  {confirmDelete === doc.id ? (
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => confirmDeleteDocument(doc.id)}
                        className="text-white bg-red-500 hover:bg-red-600 p-1 rounded"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={cancelDelete}
                        className="text-white bg-gray-500 hover:bg-gray-600 p-1 rounded"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => initiateDelete(doc.id)}
                      className="text-gray-500 hover:text-red-600 p-1 rounded hover:bg-red-50"
                      disabled={doc.status === 'processing'}
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">
            {searchQuery ? 'No documents match your search' : 'No documents in database'}
          </div>
        )}
      </div>

      {/* Pagination (simplified for this example) */}
      {documents.length > 0 && (
        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-gray-500">Showing {sortedDocuments.length} of {documents.length} documents</p>
          <div className="flex space-x-1">
            <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}