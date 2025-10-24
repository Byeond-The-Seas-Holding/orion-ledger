import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Sparkles, FileText, AlertTriangle, CheckCircle2, Info, Download } from 'lucide-react';

interface FormField {
  field_name: string;
  field_id: string;
  value: any;
  page: number;
  required: boolean;
  notes: string;
}

interface Calculation {
  field_name: string;
  formula: string;
  result: number;
  line_number: string;
  notes?: string;
}

interface FormAnalysis {
  form_type: string;
  tax_year: string;
  required_fields: FormField[];
  calculations: Calculation[];
  warnings: string[];
  validation_checks: string[];
  summary: string;
  pdf_path?: string;
}

interface AIFormAnalysisProps {
  companyId: string;
  formType: '1120' | '5472' | '1099nec' | '1040';
  formTitle: string;
  formDescription: string;
}

export function AIFormAnalysis({ companyId, formType, formTitle, formDescription }: AIFormAnalysisProps) {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<FormAnalysis | null>(null);
  const [pdfPath, setPdfPath] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeForm = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const BACKEND_URL = 'https://8000-iawczpd16uqen9op7vv32-370d3fde.manusvm.computer';
      const response = await fetch(
        `${BACKEND_URL}/api/ai-forms/analyze-${formType}/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ company_id: companyId }),
        }
      );

      const data = await response.json();

      if (data.status === 'success') {
        setAnalysis(data.data.analysis);
        setPdfPath(data.data.pdf_path || null);
      } else {
        setError(data.message || 'Analysis failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-500" />
                AI Form Analysis: {formTitle}
              </CardTitle>
              <CardDescription>{formDescription}</CardDescription>
            </div>
            <Button
              onClick={analyzeForm}
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {loading ? 'Analyzing...' : 'Run AI Analysis'}
            </Button>
          </div>
        </CardHeader>

        {error && (
          <CardContent>
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </CardContent>
        )}

        {analysis && (
          <CardContent className="space-y-6">
            {/* Summary */}
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>{analysis.summary}</AlertDescription>
            </Alert>

            {/* Required Fields */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                Required Fields ({analysis.required_fields.length})
              </h3>
              <div className="grid gap-3">
                {analysis.required_fields.map((field, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{field.field_name}</span>
                            {field.required && (
                              <Badge variant="destructive" className="text-xs">Required</Badge>
                            )}
                            <Badge variant="outline" className="text-xs">Page {field.page}</Badge>
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            <strong>Value:</strong>{' '}
                            {typeof field.value === 'number' && field.field_id.includes('amount')
                              ? formatCurrency(field.value)
                              : String(field.value)}
                          </div>
                          <div className="text-xs text-gray-500">{field.notes}</div>
                        </div>
                        {field.value === 'Missing' ? (
                          <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0" />
                        ) : (
                          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Calculations */}
            {analysis.calculations && analysis.calculations.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Calculations ({analysis.calculations.length})
                </h3>
                <div className="grid gap-3">
                  {analysis.calculations.map((calc, index) => (
                    <Card key={index} className="border-l-4 border-l-green-500">
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{calc.field_name}</span>
                          <Badge variant="outline">Line {calc.line_number}</Badge>
                        </div>
                        <div className="text-sm text-gray-600 mb-1">
                          <strong>Formula:</strong> {calc.formula}
                        </div>
                        <div className="text-lg font-bold text-green-600">
                          Result: {formatCurrency(calc.result)}
                        </div>
                        {calc.notes && (
                          <div className="text-xs text-gray-500 mt-2">{calc.notes}</div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Warnings */}
            {analysis.warnings && analysis.warnings.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  Warnings ({analysis.warnings.length})
                </h3>
                <div className="space-y-2">
                  {analysis.warnings.map((warning, index) => (
                    <Alert key={index} variant="default" className="border-yellow-500">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <AlertDescription>{warning}</AlertDescription>
                    </Alert>
                  ))}
                </div>
              </div>
            )}

            {/* Validation Checks */}
            {analysis.validation_checks && analysis.validation_checks.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-500" />
                  Validation Checks ({analysis.validation_checks.length})
                </h3>
                <div className="space-y-2">
                  {analysis.validation_checks.map((check, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>{check}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              {pdfPath ? (
                <Button
                  onClick={() => {
                    const BACKEND_URL = 'https://8000-iawczpd16uqen9op7vv32-370d3fde.manusvm.computer';
                    window.open(`${BACKEND_URL}/api/ai-forms/download-pdf/?path=${encodeURIComponent(pdfPath)}`, '_blank');
                  }}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              ) : (
                <Button variant="outline" disabled>
                  <Download className="mr-2 h-4 w-4" />
                  Generate PDF (Coming Soon)
                </Button>
              )}
              <Button variant="outline" disabled>
                <FileText className="mr-2 h-4 w-4" />
                Export CSV (Coming Soon)
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}

