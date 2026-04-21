import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Landing from "./pages/Landing";
import Intent from "./pages/Intent";
import Home from "./pages/Home";
import Practice from "./pages/Practice";
import Worksheets from "./pages/Worksheets";
import QuestionDetail from "./pages/QuestionDetail";
import CheckImprove from "./pages/CheckImprove";
import ExamTrends from "./pages/ExamTrends";
import TopicHub from "./pages/TopicHub";
import Me from "./pages/Me";
import { LTProvider } from "./lib/lt-store";
import { AppShell } from "./components/lt/AppShell";
import { LoginGate } from "./components/lt/LoginGate";

const queryClient = new QueryClient();

const Shell = ({ children }: { children: React.ReactNode }) => (
  <>
    <AppShell>{children}</AppShell>
    <LoginGate />
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LTProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/app" element={<Shell><Home /></Shell>} />
            <Route path="/app/intent" element={<Shell><Intent /></Shell>} />
            <Route path="/app/practice" element={<Shell><Practice /></Shell>} />
            <Route path="/app/practice/worksheets" element={<Shell><Worksheets /></Shell>} />
            <Route path="/app/practice/question" element={<Shell><QuestionDetail /></Shell>} />
            <Route path="/app/check-improve" element={<Shell><CheckImprove /></Shell>} />
            <Route path="/app/exam-trends" element={<Shell><ExamTrends /></Shell>} />
            <Route path="/app/topic-hub" element={<Shell><TopicHub /></Shell>} />
            <Route path="/app/me" element={<Shell><Me /></Shell>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LTProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
