import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLT } from "@/lib/lt-store";
import { Sparkles, ShieldCheck, LineChart, BookmarkCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ACTION_COPY: Record<string, { title: string; sub: string }> = {
  "start-practice-set": {
    title: "Start your practice set",
    sub: "We'll save every attempt and track your weak spots.",
  },
  "generate-worksheet": {
    title: "Generate & download your worksheet",
    sub: "Customised PDFs need a free account so we can keep them in your library.",
  },
  "start-test": {
    title: "Begin your timed test",
    sub: "We'll grade it, store your score and surface mistake patterns.",
  },
  "upload-answer": {
    title: "Upload your answer for grading",
    sub: "Examiner-style feedback works best when we can track improvement over time.",
  },
  "personalized-topic": {
    title: "Open personalized topic insights",
    sub: "We tailor this to your past mistakes — needs an account.",
  },
};

export const LoginGate = () => {
  const { gate, closeGate, completeGate } = useLT();
  const navigate = useNavigate();
  const copy = gate.action ? ACTION_COPY[gate.action] : { title: "Continue", sub: "" };

  const handle = () => {
    const href = completeGate();
    if (href) navigate(href);
  };

  return (
    <Dialog open={gate.open} onOpenChange={(o) => !o && closeGate()}>
      <DialogContent className="max-w-[880px] p-0 overflow-hidden border-border">
        <div className="grid grid-cols-2">
          {/* Left brand panel */}
          <div className="bg-[image:var(--gradient-hero)] text-primary-foreground p-10 flex flex-col">
            <div className="flex items-center gap-2 text-accent">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em]">7-day free trial</span>
            </div>
            <h2 className="font-display text-3xl font-semibold mt-4 leading-tight">
              Save your progress, mistakes & analytics.
            </h2>
            <p className="text-primary-foreground/75 mt-3 text-sm leading-relaxed">
              LazyTopper learns where you actually lose marks — silly errors, conceptual gaps, presentation mistakes — and rebuilds your practice around them.
            </p>

            <ul className="mt-8 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <BookmarkCheck className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span>Worksheets, mocks & predicted Qs saved to your library</span>
              </li>
              <li className="flex items-start gap-3">
                <LineChart className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span>Mistake intelligence across Maths & Science</span>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span>No card needed. Cancel anytime.</span>
              </li>
            </ul>
          </div>

          {/* Right form panel */}
          <div className="p-10 bg-card">
            <h3 className="font-display text-2xl font-semibold text-foreground">{copy.title}</h3>
            <p className="text-sm text-muted-foreground mt-2">{copy.sub}</p>

            <div className="mt-7 space-y-3">
              <Button onClick={handle} className="w-full h-11 bg-foreground hover:bg-foreground/90 text-background">
                Continue with Google
              </Button>
              <Button onClick={handle} variant="outline" className="w-full h-11">
                Continue with phone (OTP)
              </Button>
            </div>

            <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
              <div className="h-px bg-border flex-1" />
              or
              <div className="h-px bg-border flex-1" />
            </div>

            <label className="text-xs font-medium text-muted-foreground">Email</label>
            <input
              type="email"
              placeholder="aarav@school.in"
              className="mt-1.5 w-full h-11 px-3 rounded-lg border border-input bg-background outline-none focus:border-ring text-sm"
            />
            <Button onClick={handle} className="w-full h-11 mt-3 bg-accent hover:bg-accent/90 text-accent-foreground">
              Start 7-day free trial
            </Button>

            <p className="text-[11px] text-muted-foreground mt-5 leading-relaxed">
              By continuing you agree to LazyTopper's Terms. We never share your data with your school.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
