import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const EditorialWorkbench = lazy(() => import("./pages/EditorialWorkbench"));
const EntryDetail = lazy(() => import("./pages/EntryDetail"));
const ResearchSearch = lazy(() => import("./pages/ResearchSearch"));
const CompareConcepts = lazy(() => import("./pages/CompareConcepts"));
const LearningStudio = lazy(() => import("./pages/LearningStudio"));
const SonataAssistant = lazy(() => import("./pages/SonataAssistant"));
const Contribute = lazy(() => import("./pages/Contribute"));

function Router() {
  return (
    <Suspense fallback={<div className="sonata-loading">Opening Sonata…</div>}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/entries/:slug" component={EntryDetail} />
        <Route path="/search" component={ResearchSearch} />
        <Route path="/compare" component={CompareConcepts} />
        <Route path="/learn" component={LearningStudio} />
        <Route path="/assistant" component={SonataAssistant} />
        <Route path="/contribute" component={Contribute} />
        <Route path="/editorial" component={EditorialWorkbench} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
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
