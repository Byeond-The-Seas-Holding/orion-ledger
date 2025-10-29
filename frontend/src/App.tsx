import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Dashboard from "./pages/DashboardNew";
import DocumentsComplete from "./pages/DocumentsComplete";
import TransactionsComplete from "./pages/TransactionsComplete";
import Reports from "./pages/Reports";
import IRSForms from "./pages/IRSForms";
import Companies from "./pages/Companies";
import Accounts from "./pages/Accounts";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Dashboard} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path="/accounts" component={Accounts} />
      <Route path="/companies" component={Companies} />
      <Route path="/documents" component={DocumentsComplete} />
      <Route path="/transactions" component={TransactionsComplete} />
      <Route path={"/reports"} component={Reports} />
      <Route path={"/irs-forms"} component={IRSForms} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

