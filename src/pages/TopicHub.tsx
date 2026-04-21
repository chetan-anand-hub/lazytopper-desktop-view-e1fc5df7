import { useState } from "react";
import { PageHeader } from "@/components/lt/PageHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLT } from "@/lib/lt-store";
import { useNavigate } from "react-router-dom";
import { BookOpen, Dumbbell, ClipboardCheck, Sparkles, PlayCircle, ArrowRight, AlertCircle } from "lucide-react";

const TABS = [
  { id: "learn", label: "Learn", icon: BookOpen },
  { id: "practice", label: "Practice", icon: Dumbbell },
  { id: "test", label: "Test", icon: ClipboardCheck },
  { id: "predicted", label: "Predicted Questions", icon: Sparkles },
] as const;

type TabId = (typeof TABS)[number]["id"];

const TopicHub = () => {
  const [tab, setTab] = useState<TabId>("learn");
  const { requestGate } = useLT();
  const navigate = useNavigate();

  const startSet = () => {
    if (requestGate("start-practice-set", "/app/practice/question")) navigate("/app/practice/question");
  };

  return (
    <div className="lt-section max-w-[1500px]">
      <PageHeader
        showBack
        eyebrow="Topic Hub · Maths · Must Crack"
        title="Quadratic Equations"
        description="Everything for this topic — learn, practice, test and predicted questions, in one place."
        actions={<Button variant="outline">Add to study plan</Button>}
      />

      {/* Mistake intel strip */}
      <div className="lt-card p-4 mb-6 flex items-center gap-4 bg-gradient-to-r from-warning-soft via-card to-card border-l-4 border-l-warning">
        <AlertCircle className="h-5 w-5 text-warning shrink-0" />
        <div className="flex-1">
          <div className="text-sm font-medium">Your mistake pattern in this topic</div>
          <div className="text-xs text-muted-foreground">
            5 of last 8 errors here were sign mistakes when factoring. We've prepared a targeted 6-Q drill.
          </div>
        </div>
        <Button size="sm" variant="outline" onClick={startSet}>Run targeted drill</Button>
      </div>

      {/* Tabs */}
      <div className="lt-card p-1.5 inline-flex gap-1 mb-6">
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-2 transition-colors ${
                active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      {tab === "learn" && (
        <div className="grid grid-cols-3 gap-5">
          {[
            { title: "1. What is a quadratic?", time: "4 min", type: "Concept video" },
            { title: "2. Factoring by splitting middle term", time: "6 min", type: "Worked examples" },
            { title: "3. Quadratic formula", time: "5 min", type: "Concept video" },
            { title: "4. Discriminant & nature of roots", time: "7 min", type: "Concept video" },
            { title: "5. Word problems setup", time: "9 min", type: "Worked examples" },
            { title: "6. Common board traps", time: "3 min", type: "Examiner tips" },
          ].map((l) => (
            <div key={l.title} className="lt-card lt-card-hover p-5">
              <div className="aspect-video bg-gradient-to-br from-primary/15 to-accent/15 rounded-lg grid place-items-center mb-4">
                <PlayCircle className="h-10 w-10 text-primary/70" />
              </div>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{l.type}</div>
              <h4 className="font-display text-base font-semibold mt-1 leading-snug">{l.title}</h4>
              <div className="text-xs text-muted-foreground mt-2">{l.time}</div>
            </div>
          ))}
        </div>
      )}

      {tab === "practice" && (
        <div className="grid grid-cols-2 gap-5">
          {[
            { title: "Easy warm-up · 10 Qs", meta: "MCQ + Short", btn: "Start" },
            { title: "Medium drill · 15 Qs", meta: "Mixed types", btn: "Start" },
            { title: "Hard challenge · 12 Qs", meta: "Long answer focus", btn: "Start" },
            { title: "Mistake-aware set · 8 Qs", meta: "Built from your past errors", btn: "Start" },
          ].map((p) => (
            <button key={p.title} onClick={startSet} className="lt-card lt-card-hover p-6 text-left group">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-display text-lg font-semibold">{p.title}</h4>
                  <div className="text-sm text-muted-foreground mt-1">{p.meta}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      )}

      {tab === "test" && (
        <div className="lt-card p-8">
          <h3 className="font-display text-xl font-semibold">Topic test · Quadratic Equations</h3>
          <p className="text-sm text-muted-foreground mt-1">20 questions · 30 minutes · Auto-graded with mistake breakdown.</p>
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { l: "Questions", v: "20" },
              { l: "Duration", v: "30 min" },
              { l: "Pattern", v: "Board · 2026" },
            ].map((s) => (
              <div key={s.l} className="rounded-lg bg-muted/60 p-4">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
                <div className="text-lg font-semibold mt-1">{s.v}</div>
              </div>
            ))}
          </div>
          <Button onClick={startSet} className="mt-6 bg-foreground text-background hover:bg-foreground/90">
            Start topic test <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        </div>
      )}

      {tab === "predicted" && (
        <div className="space-y-3">
          {[
            { q: "If one root of 2x² − kx + 4 = 0 is 2, find k.", prob: 92, marks: 3 },
            { q: "Solve: x² − 3x − 10 = 0 by factorisation.", prob: 88, marks: 3 },
            { q: "Find the discriminant of 2x² − 4x + 3 and discuss the nature of roots.", prob: 84, marks: 4 },
            { q: "A train travels 360 km at uniform speed. If the speed had been 5 km/h more…", prob: 79, marks: 5 },
          ].map((p, i) => (
            <Link key={i} to="/app/practice/question" className="lt-card lt-card-hover p-5 flex items-center gap-5 group">
              <div className="text-center w-16 shrink-0">
                <div className="text-2xl font-display font-semibold text-primary">{p.prob}%</div>
                <div className="text-[10px] text-muted-foreground">likely</div>
              </div>
              <div className="flex-1">
                <div className="text-sm">{p.q}</div>
                <div className="text-xs text-muted-foreground mt-1">{p.marks} marks · MCQ + working</div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopicHub;
