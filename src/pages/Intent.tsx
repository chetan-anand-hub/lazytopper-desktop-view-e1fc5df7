import { PageHeader } from "@/components/lt/PageHeader";
import { Link } from "react-router-dom";
import { Dumbbell, TrendingUp, ScanLine, ArrowRight, Check } from "lucide-react";

const choices = [
  {
    to: "/app/practice",
    icon: Dumbbell,
    eyebrow: "Practice",
    title: "I want to practice",
    desc: "Build muscle memory with worksheets, sets, predicted Qs, timed practice and full mocks.",
    bullets: ["Worksheet generator", "Predicted Questions", "Timed practice & mocks"],
    accent: "from-info/15 to-info/5",
    pill: "Most popular",
  },
  {
    to: "/app/exam-trends",
    icon: TrendingUp,
    eyebrow: "Exam Trends",
    title: "Show me what's likely",
    desc: "Must-crack, high-ROI, and good-to-do topics from 10 years of CBSE board papers.",
    bullets: ["Priority board view", "Topic Hub for every topic", "Smart predictions"],
    accent: "from-accent/15 to-accent/5",
    pill: "Best ROI",
  },
  {
    to: "/app/check-improve",
    icon: ScanLine,
    eyebrow: "Check & Improve",
    title: "Grade my answer",
    desc: "Upload your written answer. Get examiner-style feedback and a clear next step.",
    bullets: ["Examiner-style grading", "Mistake categorisation", "Improvement insights"],
    accent: "from-warning/15 to-warning/5",
    pill: "New",
  },
];

const Intent = () => {
  return (
    <div className="lt-section">
      <PageHeader
        eyebrow="What do you want to do today?"
        title="Three doors. Pick the one that matches your mood."
        description="LazyTopper is choice-first. You're never forced into a study plan — every path here builds your weak-spot intelligence in the background."
      />

      <div className="grid grid-cols-3 gap-6">
        {choices.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="group lt-card lt-card-hover p-8 relative overflow-hidden flex flex-col"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${c.accent} opacity-60 -z-0`} />
            <div className="relative flex-1 flex flex-col">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-xl bg-card border border-border grid place-items-center shadow-sm">
                  <c.icon className="h-5.5 w-5.5 text-primary" />
                </div>
                <span className="lt-chip bg-card border border-border">{c.pill}</span>
              </div>
              <div className="text-xs font-semibold text-primary/70 uppercase tracking-wider mt-7">
                {c.eyebrow}
              </div>
              <h3 className="font-display text-2xl font-semibold mt-2 leading-tight">{c.title}</h3>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{c.desc}</p>

              <ul className="mt-6 space-y-2">
                {c.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-foreground/85">
                    <Check className="h-4 w-4 text-accent" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all">
                Open {c.eyebrow} <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Comparison strip */}
      <div className="mt-10 lt-card p-6">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          Quick compare
        </div>
        <div className="grid grid-cols-4 text-sm">
          <div className="text-muted-foreground">When you have…</div>
          <div className="font-medium">15 minutes</div>
          <div className="font-medium">An hour</div>
          <div className="font-medium">A whole evening</div>

          <div className="text-muted-foreground mt-3 pt-3 border-t border-border">Practice</div>
          <div className="mt-3 pt-3 border-t border-border">10-Q sprint set</div>
          <div className="mt-3 pt-3 border-t border-border">Worksheet + 1 timed set</div>
          <div className="mt-3 pt-3 border-t border-border">Full mock + review</div>

          <div className="text-muted-foreground mt-3 pt-3 border-t border-border">Exam Trends</div>
          <div className="mt-3 pt-3 border-t border-border">Skim must-crack</div>
          <div className="mt-3 pt-3 border-t border-border">1 Topic Hub deep-dive</div>
          <div className="mt-3 pt-3 border-t border-border">3 weak topics in a row</div>

          <div className="text-muted-foreground mt-3 pt-3 border-t border-border">Check & Improve</div>
          <div className="mt-3 pt-3 border-t border-border">Upload 1 answer</div>
          <div className="mt-3 pt-3 border-t border-border">Upload + rewrite</div>
          <div className="mt-3 pt-3 border-t border-border">Re-attempt mistakes set</div>
        </div>
      </div>
    </div>
  );
};

export default Intent;
