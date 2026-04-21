import { PageHeader } from "@/components/lt/PageHeader";
import { Link } from "react-router-dom";
import { Dumbbell, TrendingUp, ScanLine, ArrowRight, FileText, Sparkles, Clock } from "lucide-react";

const Home = () => {
  return (
    <div className="lt-section">
      <PageHeader
        eyebrow="Welcome back"
        title="Good evening, Aarav."
        description="You're 18 days out from your CBSE Maths paper. Pick where you want to spend tonight."
      />

      {/* Three intents */}
      <div className="grid grid-cols-3 gap-5">
        {[
          { to: "/app/practice", icon: Dumbbell, label: "Practice", sub: "Worksheets, sets, mocks" },
          { to: "/app/exam-trends", icon: TrendingUp, label: "Exam Trends", sub: "What's likely to come" },
          { to: "/app/check-improve", icon: ScanLine, label: "Check & Improve", sub: "Grade my answer" },
        ].map((c) => (
          <Link key={c.to} to={c.to} className="lt-card lt-card-hover p-6 flex items-center gap-4 group">
            <div className="h-12 w-12 rounded-xl bg-secondary grid place-items-center text-primary">
              <c.icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="font-display text-lg font-semibold">{c.label}</div>
              <div className="text-xs text-muted-foreground">{c.sub}</div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </Link>
        ))}
      </div>

      {/* Two col: continue + insight */}
      <div className="grid grid-cols-3 gap-6 mt-8">
        <div className="col-span-2 lt-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-xl font-semibold">Pick up where you left off</h2>
            <Link to="/app/me" className="text-xs text-muted-foreground hover:text-foreground">View all activity →</Link>
          </div>
          <div className="space-y-3">
            {[
              { icon: FileText, title: "Quadratic Equations · Practice Set", meta: "Stopped at Q7 of 12 · 22 min ago", action: "Resume" },
              { icon: Clock, title: "Mock Test 03 · Maths", meta: "Submitted yesterday · 64/80", action: "Review" },
              { icon: Sparkles, title: "Light · Predicted Questions", meta: "8 new this week", action: "Open" },
            ].map((r, i) => (
              <Link
                key={i}
                to="/app/practice/question"
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/60 transition-colors"
              >
                <div className="h-10 w-10 rounded-lg bg-secondary grid place-items-center text-primary">
                  <r.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{r.title}</div>
                  <div className="text-xs text-muted-foreground">{r.meta}</div>
                </div>
                <span className="text-xs font-medium text-primary">{r.action} →</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="lt-card p-6 bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
          <div className="flex items-center gap-2 text-accent">
            <Sparkles className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Mistake intelligence</span>
          </div>
          <h3 className="font-display text-xl font-semibold mt-3 leading-snug">
            38% of your lost marks this week were silly errors.
          </h3>
          <p className="text-sm text-primary-foreground/75 mt-2">
            Mostly missed units in numerical questions. We've queued a 10-Q targeted set.
          </p>
          <Link
            to="/app/practice/question"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
          >
            Run targeted set <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
