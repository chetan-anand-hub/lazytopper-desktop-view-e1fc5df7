import { useState } from "react";
import { PageHeader } from "@/components/lt/PageHeader";
import { Button } from "@/components/ui/button";
import { Sparkles, CheckCircle2, BookOpen, Lightbulb, ArrowRight, Flag, Clock } from "lucide-react";

const OPTIONS = [
  { k: "A", t: "x = 2, x = 4" },
  { k: "B", t: "x = 1, x = 4" },
  { k: "C", t: "x = -1, x = -4" },
  { k: "D", t: "x = -2, x = 4" },
];

const QuestionDetail = () => {
  const [picked, setPicked] = useState<string | null>(null);
  const [showSol, setShowSol] = useState(false);

  return (
    <div className="lt-section max-w-[1500px]">
      <PageHeader
        showBack
        eyebrow="Practice Set · Quadratic Equations"
        title="Question 7 of 12"
        actions={
          <>
            <div className="lt-chip bg-warning-soft text-warning-foreground">
              <Clock className="h-3 w-3" /> 02:14 left
            </div>
            <Button variant="outline" size="sm"><Flag className="mr-1.5 h-3.5 w-3.5" /> Flag</Button>
          </>
        }
      />

      <div className="grid grid-cols-12 gap-6">
        {/* LEFT — Question */}
        <div className="col-span-7 space-y-5">
          <div className="lt-card p-8">
            <div className="flex items-center gap-2 text-xs">
              <span className="lt-chip">Maths · Class 10</span>
              <span className="lt-chip bg-info-soft text-info">3 marks</span>
              <span className="lt-chip">MCQ</span>
            </div>
            <h2 className="font-display text-[26px] leading-snug mt-5 text-foreground">
              The roots of the quadratic equation <span className="font-mono">x² − 6x + 8 = 0</span> are:
            </h2>

            <div className="mt-7 space-y-2.5">
              {OPTIONS.map((o) => (
                <button
                  key={o.k}
                  onClick={() => setPicked(o.k)}
                  className={`w-full text-left flex items-center gap-4 p-4 rounded-xl border transition-all ${
                    picked === o.k
                      ? "border-primary bg-secondary"
                      : "border-border hover:border-primary/40 hover:bg-muted/50"
                  }`}
                >
                  <div className={`h-8 w-8 rounded-lg grid place-items-center text-sm font-semibold ${
                    picked === o.k ? "bg-primary text-primary-foreground" : "bg-muted text-foreground/70"
                  }`}>{o.k}</div>
                  <span className="text-base">{o.t}</span>
                </button>
              ))}
            </div>

            <div className="mt-7 flex items-center justify-between">
              <Button variant="ghost">← Previous</Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowSol(true)}>I'm stuck</Button>
                <Button className="bg-foreground text-background hover:bg-foreground/90">
                  Submit answer <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="lt-card p-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>Set progress</span>
              <span>7 / 12</span>
            </div>
            <div className="flex gap-1.5">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full ${
                    i < 6 ? "bg-accent" : i === 6 ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — Side panel */}
        <div className="col-span-5 space-y-4">
          <SidePanel
            icon={BookOpen}
            title="Step-by-Step Solution"
            sub="Walks through each step with reasoning"
            open={showSol}
            onToggle={() => setShowSol((s) => !s)}
          >
            <ol className="text-sm space-y-3 list-decimal pl-5 text-foreground/85">
              <li>Start with <span className="font-mono">x² − 6x + 8 = 0</span></li>
              <li>Find two numbers that multiply to 8 and add to −6 → −2 and −4</li>
              <li>Factor: <span className="font-mono">(x − 2)(x − 4) = 0</span></li>
              <li>So x = 2 or x = 4 → answer (A)</li>
            </ol>
          </SidePanel>

          <SidePanel icon={CheckCircle2} title="Check My Answer" sub="Submit a written solution and we'll grade it">
            <textarea
              placeholder="Type or paste your working here…"
              className="w-full h-24 rounded-lg border border-input bg-background p-3 text-sm outline-none focus:border-ring resize-none"
            />
            <Button size="sm" className="mt-3 bg-accent hover:bg-accent/90 text-accent-foreground">
              Grade my working
            </Button>
          </SidePanel>

          <SidePanel icon={Lightbulb} title="Teach me this concept" sub="Quick rescue lesson — opens in Topic Hub">
            <div className="text-sm text-muted-foreground">
              Factoring quadratics by splitting the middle term — 4 min explainer + 3-Q micro-set.
            </div>
            <Button size="sm" variant="outline" className="mt-3">
              Open Topic Hub <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </SidePanel>

          <div className="lt-card p-5 bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
            <div className="flex items-center gap-2 text-accent text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" /> Mistake intel
            </div>
            <p className="text-sm mt-2 leading-relaxed">
              Last 3 attempts on quadratics: 2 silly errors (sign mistakes). Slow down on step 3.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const SidePanel = ({
  icon: Icon,
  title,
  sub,
  children,
  open: controlledOpen,
  onToggle,
}: {
  icon: any;
  title: string;
  sub?: string;
  children: React.ReactNode;
  open?: boolean;
  onToggle?: () => void;
}) => {
  const [localOpen, setLocalOpen] = useState(false);
  const open = controlledOpen ?? localOpen;
  const toggle = onToggle ?? (() => setLocalOpen((o) => !o));
  return (
    <div className="lt-card p-5">
      <button onClick={toggle} className="w-full flex items-center gap-3 text-left">
        <div className="h-9 w-9 rounded-lg bg-secondary grid place-items-center text-primary shrink-0">
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <div className="font-medium text-sm">{title}</div>
          {sub && <div className="text-xs text-muted-foreground">{sub}</div>}
        </div>
        <span className="text-xs text-muted-foreground">{open ? "Hide" : "Show"}</span>
      </button>
      {open && <div className="mt-4 pt-4 border-t border-border">{children}</div>}
    </div>
  );
};

export default QuestionDetail;
