import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from 'sonner';
import { TransactionReviewModal } from '@/components/TransactionReviewModal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useCsrfToken, getCsrfTokenFromCookie } from '@/hooks/useCsrfToken';
import { InfoTooltip } from "@/components/InfoTooltip";
import { DOCUMENT_UPLOAD_TOOLTIPS } from "@/lib/tooltips";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://8000-iawczpd16uqen9op7vv32-370d3fde.manusvm.computer";

interface Document {
  id: string;
  company: string;
  company_name: string;
  file_name: string;
  file_type: string;
  file_size: number;
  status: string;
  upload_date: string;
  processed_date: string | null;
  processing_result: any;
}

interface Company {
  id: string;
  name: string;
}

const STATUS_COLORS: Record<string, string> = {
  'PENDING': 'bg-yellow-100 text-yellow-800',
  'PROCESSING': 'bg-blue-100 text-blue-800',
  'COMPLETED': 'bg-green-100 text-green-800',
  'FAILED': 'bg-red-100 text-red-800',
};

export default function DocumentsComplete() {
  const csrfToken = useCsrfToken();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  useEffect(() => {
    console.log('[DEBUG] Component mounted, fetching data...');
    fetchCompanies();
    fetchDocuments();
    // Poll for status updates every 5 seconds
    const interval = setInterval(fetchDocuments, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log('[DEBUG] Documents state updated:', documents);
    console.log('[DEBUG] Documents length:', documents.length);
  }, [documents]);

  const fetchCompanies = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/companies/`, {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Companies API response:', data);
        const companyList = data.results || data || [];
        console.log('Company list:', companyList);
        setCompanies(companyList);
        if (companyList.length > 0 && !selectedCompany) {
          console.log('Setting default company:', companyList[0].id);
          setSelectedCompany(companyList[0].id);
          toast.success(`Loaded ${companyList.length} company(ies)`);
        } else {
          toast.warning('No companies found. Please create a company first.');
        }
      } else {
        console.error('Failed to fetch companies, status:', response.status);
        toast.error(`Failed to load companies (HTTP ${response.status})`);
      }
    } catch (error) {
      console.error('Failed to fetch companies:', error);
      toast.error('Failed to connect to API');
    }
  };

  const fetchDocuments = async () => {
    console.log('[DEBUG] fetchDocuments called');
    try {
      console.log('[DEBUG] Fetching from:', `${BACKEND_URL}/api/documents/`);
      const response = await fetch(`${BACKEND_URL}/api/documents/`, {
        credentials: 'include',
      });
      console.log('[DEBUG] Response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('[DEBUG] API data:', data);
        console.log('[DEBUG] Results:', data.results);
        console.log('[DEBUG] Results length:', data.results?.length);
        const docs = data.results || data;
        console.log('[DEBUG] Setting documents:', docs);
        setDocuments(docs);
        // Don't show toast on polling (only on manual refresh)
        // Removed to prevent repetitive toasts
      } else {
        console.error('[DEBUG] Response not OK:', response.status);
        toast.error(`Failed to load documents (HTTP ${response.status})`);
      }
    } catch (error) {
      console.error('[DEBUG] Failed to fetch documents:', error);
      toast.error('Failed to connect to API');
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFiles(e.dataTransfer.files);
    }
  }, [selectedCompany]);

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await handleFiles(e.target.files);
    }
  };

  const handleFiles = async (files: FileList) => {
    if (!selectedCompany) {
      toast.error('Please select a company first');
      return;
    }

    setUploading(true);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Validate file type
      const validTypes = ['application/pdf', 'text/csv', 'image/png', 'image/jpeg', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        toast.error(`Invalid file type: ${file.name}. Only PDF, CSV, and images are allowed.`);
        continue;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`File too large: ${file.name}. Maximum size is 10MB.`);
        continue;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('company', selectedCompany);

      try {
        const token = csrfToken || getCsrfTokenFromCookie();
        const response = await fetch(`${BACKEND_URL}/api/documents/upload/`, {
          method: 'POST',
          headers: {
            'X-CSRFToken': token,
          },
          credentials: 'include',
          body: formData,
        });

        if (response.ok) {
          toast.success(`${file.name} uploaded successfully! Processing...`);
          fetchDocuments();
        } else {
          const error = await response.json();
          toast.error(`Failed to upload ${file.name}: ${error.detail || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Upload error:', error);
        toast.error(`Failed to upload ${file.name}`);
      }
    }

    setUploading(false);
  };

  const handleReprocess = async (id: string) => {
    console.log('=== HANDLE REPROCESS CALLED ===', id);
    try {
      const token = csrfToken || getCsrfTokenFromCookie();
      const response = await fetch(`${BACKEND_URL}/api/documents/${id}/reprocess/`, {
        method: 'POST',
        headers: {
          'X-CSRFToken': token,
        },
        credentials: 'include',
      });

      if (response.ok) {
        toast.success('Document reprocessing started!');
        fetchDocuments();
      } else {
        toast.error('Failed to reprocess document');
      }
    } catch (error) {
      console.error('Reprocess error:', error);
      toast.error('Failed to reprocess document');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const response = await fetch(`${BACKEND_URL}/api/documents/${id}/`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        toast.success('Document deleted!');
        fetchDocuments();
      } else {
        toast.error('Failed to delete document');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete document');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
                <InfoTooltip content={DOCUMENT_UPLOAD_TOOLTIPS.aiExtraction} />
              </div>
              <p className="text-sm text-gray-600">Upload and process bank statements and receipts</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Area */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Upload Documents</CardTitle>
                <CardDescription>Drag and drop files or click to browse. Supports PDF, CSV, and images.</CardDescription>
              </div>
              <InfoTooltip content={DOCUMENT_UPLOAD_TOOLTIPS.supportedFormats} side="left" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Label htmlFor="company-select">Select Company {companies.length > 0 && `(${companies.length} available)`} {loading && '(Loading...)'}</Label>
              {companies.length === 0 && !loading && (
                <p className="text-sm text-red-600 mt-1">⚠️ No companies loaded. API may be failing.</p>
              )}
              <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                <SelectTrigger id="company-select">
                  <SelectValue placeholder={companies.length === 0 ? "No companies found" : "Select a company"} />
                </SelectTrigger>
                <SelectContent>
                  {companies.length === 0 ? (
                    <SelectItem value="none" disabled>No companies available</SelectItem>
                  ) : (
                    companies.map(company => (
                      <SelectItem key={company.id} value={company.id}>{company.name}</SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
              } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="file-upload"
                className="hidden"
                multiple
                accept=".pdf,.csv,image/*"
                onChange={handleFileInput}
                disabled={uploading || !selectedCompany}
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="text-6xl mb-4">📄</div>
                <p className="text-lg font-medium text-gray-700 mb-2">
                  {uploading ? 'Uploading...' : 'Drop files here or click to browse'}
                </p>
                <p className="text-sm text-gray-500">
                  PDF, CSV, PNG, JPG (max 10MB each)
                </p>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Documents List */}
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Documents ({documents.length})</CardTitle>
            <CardDescription>View and manage your uploaded documents</CardDescription>
          </CardHeader>
          <CardContent>
            {documents.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No documents uploaded yet
              </div>
            ) : (
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium text-lg">{doc.file_name}</h3>
                          <Badge className={STATUS_COLORS[doc.status]}>
                            {doc.status}
                          </Badge>
                          <Badge variant="outline">{doc.file_type}</Badge>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p><strong>Company:</strong> {doc.company_name}</p>
                          <p><strong>Size:</strong> {formatFileSize(doc.file_size)}</p>
          <p><strong>Uploaded:</strong> {formatDate(doc.upload_date)}</p>
          {doc.processed_date && (
            <p><strong>Processed:</strong> {formatDate(doc.processed_date)}</p>
                          )}
                          {doc.processing_result && doc.processing_result.transactions_count > 0 && (
                            <p className="text-green-600">
                              <strong>✓ Extracted {doc.processing_result.transactions_count} transactions</strong>
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {/* View Document Button */}
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => {
                            // Extract relative path after /media/
                            const relativePath = doc.file_path.split('/media/')[1] || doc.file_path;
                            window.open(`${BACKEND_URL}/media/${relativePath}`, '_blank');
                          }}
                        >
                          View Document
                        </Button>
                        
                        {/* Reprocess Button (for documents without extracted data) */}
                        {doc.status === 'COMPLETED' && (!doc.processing_result || doc.processing_result.transactions_count === 0) && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              console.log('Button clicked!', doc.id);
                              handleReprocess(doc.id);
                            }}
                          >
                            Extract Data
                          </Button>
                        )}
                        
                        {/* Retry Button (for failed documents) */}
                        {doc.status === 'FAILED' && (
                          <Button size="sm" variant="outline" onClick={() => handleReprocess(doc.id)}>
                            Retry
                          </Button>
                        )}
                        
                        {/* View Extracted Data Button */}
                        {doc.status === 'COMPLETED' && doc.processing_result && doc.processing_result.transactions_count > 0 && (
                          <Button size="sm" onClick={() => setSelectedDocument(doc)}>
                            View Extracted Data
                          </Button>
                        )}
                        
                        {/* Delete Button */}
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          onClick={() => handleDelete(doc.id, doc.file_name)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Transaction Review Modal */}
      {selectedDocument && (
        <TransactionReviewModal
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
          onImportComplete={() => {
            fetchDocuments();
            toast.success('Transactions imported successfully!');
          }}
          csrfToken={csrfToken || ''}
        />
      )}
    </div>
  );
}

