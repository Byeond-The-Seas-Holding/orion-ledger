import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Info,
  Lightbulb,
  TrendingUp,
  Plus
} from 'lucide-react';
import { Separator } from './ui/separator';

interface AIAnalysisProps {
  companyId: string;
}

interface AnalysisResult {
  overall_health: 'good' | 'fair' | 'poor';
  score: number;
  issues: Array<{
    severity: 'high' | 'medium' | 'low';
    account: string;
    problem: string;
    solution: string;
  }>;
  warnings: Array<{
    account: string;
    warning: string;
    suggestion: string;
  }>;
  suggestions: Array<{
    category: string;
    suggestion: string;
    benefit: string;
  }>;
  missing_accounts: Array<{
    code: string;
    name: string;
    type: string;
    reason: string;
  }>;
  summary: string;
}

export function AIChartAnalysis({ companyId }: AIAnalysisProps) {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runAnalysis = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const BACKEND_URL = 'https://8000-iawczpd16uqen9op7vv32-370d3fde.manusvm.computer';
      const response = await fetch(
        `${BACKEND_URL}/api/companies/${companyId}/ai-analyze-chart/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (data.status === 'success') {
        setAnalysis(data.data.analysis);
      } else {
        setError(data.message || 'Analysis failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'good':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'fair':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'poor':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            AI Chart of Accounts Analysis
          </CardTitle>
          <CardDescription>
            Get intelligent insights and suggestions to improve your chart of accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={runAnalysis}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            {loading ? (
              <>
                <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Run AI Analysis
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {analysis && (
        <div className="space-y-6">
          {/* Overall Health */}
          <Card className={`border-2 ${getHealthColor(analysis.overall_health)}`}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Overall Health: {analysis.overall_health.toUpperCase()}</span>
                <Badge variant="outline" className="text-lg px-4 py-1">
                  {analysis.score}/100
                </Badge>
              </CardTitle>
              <CardDescription className="text-base mt-2">
                {analysis.summary}
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Issues */}
          {analysis.issues && analysis.issues.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <XCircle className="h-5 w-5" />
                  Critical Issues ({analysis.issues.length})
                </CardTitle>
                <CardDescription>
                  Problems that need immediate attention
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysis.issues.map((issue, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant={getSeverityColor(issue.severity)}>
                          {issue.severity}
                        </Badge>
                        <span className="font-semibold">Account: {issue.account}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">
                      <strong>Problem:</strong> {issue.problem}
                    </p>
                    <p className="text-sm text-green-700 bg-green-50 p-2 rounded">
                      <strong>Solution:</strong> {issue.solution}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Warnings */}
          {analysis.warnings && analysis.warnings.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-600">
                  <AlertTriangle className="h-5 w-5" />
                  Warnings ({analysis.warnings.length})
                </CardTitle>
                <CardDescription>
                  Potential problems to consider
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysis.warnings.map((warning, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-yellow-600" />
                      <span className="font-semibold">Account: {warning.account}</span>
                    </div>
                    <p className="text-sm text-gray-700">{warning.warning}</p>
                    <p className="text-sm text-blue-700 bg-blue-50 p-2 rounded">
                      <strong>Suggestion:</strong> {warning.suggestion}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Suggestions */}
          {analysis.suggestions && analysis.suggestions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <Lightbulb className="h-5 w-5" />
                  Improvement Suggestions ({analysis.suggestions.length})
                </CardTitle>
                <CardDescription>
                  Ways to optimize your chart of accounts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysis.suggestions.map((suggestion, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <span className="font-semibold capitalize">{suggestion.category}</span>
                    </div>
                    <p className="text-sm text-gray-700">{suggestion.suggestion}</p>
                    <p className="text-sm text-green-700 bg-green-50 p-2 rounded">
                      <strong>Benefit:</strong> {suggestion.benefit}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Missing Accounts */}
          {analysis.missing_accounts && analysis.missing_accounts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-600">
                  <Plus className="h-5 w-5" />
                  Recommended Accounts ({analysis.missing_accounts.length})
                </CardTitle>
                <CardDescription>
                  Accounts you should consider adding
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysis.missing_accounts.map((account, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-lg">
                            {account.code}: {account.name}
                          </span>
                          <Badge variant="outline">{account.type}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{account.reason}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

