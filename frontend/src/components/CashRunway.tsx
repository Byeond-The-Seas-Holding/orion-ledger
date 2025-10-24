import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, AlertTriangle } from "lucide-react";

interface CashRunwayProps {
  currentBalance: number;
  monthlyBurnRate: number;
  monthsRemaining: number;
}

export function CashRunway({ currentBalance, monthlyBurnRate, monthsRemaining }: CashRunwayProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Determine status based on months remaining
  const getStatus = () => {
    if (monthsRemaining >= 6) {
      return {
        color: "text-green-600",
        bgColor: "bg-green-100",
        icon: CheckCircle,
        label: "Healthy",
        progressColor: "bg-green-600",
      };
    } else if (monthsRemaining >= 3) {
      return {
        color: "text-yellow-600",
        bgColor: "bg-yellow-100",
        icon: AlertTriangle,
        label: "Warning",
        progressColor: "bg-yellow-600",
      };
    } else {
      return {
        color: "text-red-600",
        bgColor: "bg-red-100",
        icon: AlertCircle,
        label: "Critical",
        progressColor: "bg-red-600",
      };
    }
  };

  const status = getStatus();
  const StatusIcon = status.icon;

  // Calculate progress percentage (assuming 12 months is 100%)
  const progressPercentage = Math.min((monthsRemaining / 12) * 100, 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Cash Runway
          <div className={`flex items-center space-x-1 ${status.color}`}>
            <StatusIcon className="h-5 w-5" />
            <span className="text-sm font-medium">{status.label}</span>
          </div>
        </CardTitle>
        <CardDescription>Estimated months until cash runs out</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Months Remaining</span>
            <span className="font-bold text-2xl">{monthsRemaining.toFixed(1)}</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div>
            <p className="text-xs text-gray-500 mb-1">Current Balance</p>
            <p className="text-lg font-semibold">{formatCurrency(currentBalance)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Monthly Burn Rate</p>
            <p className="text-lg font-semibold">{formatCurrency(monthlyBurnRate)}</p>
          </div>
        </div>

        {monthsRemaining < 6 && (
          <div className={`p-3 rounded-lg ${status.bgColor} ${status.color} text-sm`}>
            <p className="font-medium">
              {monthsRemaining < 3
                ? "⚠️ Critical: Consider reducing expenses or increasing revenue immediately."
                : "⚡ Warning: Monitor your cash flow closely and plan ahead."}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

