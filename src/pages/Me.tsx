import { PageHeader } from "@/components/lt/PageHeader";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Target,
  Clock,
  Award,
  ArrowRight,
  Sparkles,
  AlertCircle,
} from "lucide-react";

const Me = () => {
  return (
    <div className="lt-section max-w-[1500px]">
      <PageHeader
        showBack
        eyebrow="Me · Progress"
        title="Your study mirror."
        description="A clear-eyed view of what's improving, what's stuck, and what to do next."
        actions={
          <>
            <Button variant="outline" asChild><Link to="/app/practice">Start practice</Link></Button>
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link to="/app/exam-trends">Open Exam Trends</Link>
            </Button>
          </>
        }
      />

      {/* Top stats */}
      <div className="grid grid-cols-4 gap-5 mb-6">
        {[
          { icon: Award, l: "Avg. score (last 5 mocks)", v: "72/100", trend: "+6", up: true },
          { icon: Target, l: "Accuracy this week", v: "78%", trend: "+4%", up: true },
          { icon: Clock, l: "Time on practice", v: "9h 24m", trend: "+1h 12m", up: true },
          { icon: TrendingUp, l: "Mistake rate", v: "22%", trend: "−5%", up: true },
        ].map((s) => (
          <div key={s.l} className="lt-card p-5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <s.icon className="h-4 w-4" />
              <span className="text-xs">{s.l}</span>
            </div>
            <div className="flex items-end justify-between mt-3">
              <div className="font-display text-3xl font-semibold">{s.v}</div>
              <div className={`text-xs font-medium ${s.up ? "text-accent" : "text-danger"}`}>{s.trend}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Where you lose marks */}
        <div className="col-span-7 lt-card p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Where You Lose Marks</div>
              <h2 className="font-display text-xl font-semibold mt-1">Mistake breakdown · last 30 days</h2>
            </div>
            <span className="lt-chip bg-warning-soft text-warning-foreground">
              <AlertCircle className="h-3 w-3" /> Silly errors leading
            </span>
          </div>

          <div className="space-y-4">
            {[
              { l: "Silly", v: 38, c: "bg-danger", note: "Missed units, sign mistakes, skipped 'therefore'" },
              { l: "Conceptual", v: 26, c: "bg-warning", note: "Mixing up formulas in trigonometry" },
              { l: "Calculation", v: 22, c: "bg-info", note: "Decimal & fraction handling" },
              { l: "Presentation", v: 14, c: "bg-accent", note: "Diagrams unlabelled, working unclear" },
            ].map((b) => (
              <div key={b.l}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="font-medium">{b.l}</span>
                  <span className="text-muted-foreground">{b.v}% of lost marks</span>
                </div>
                <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full ${b.c} rounded-full transition-all`} style={{ width: `${b.v * 2}%` }} />
                </div>
                <div className="text-xs text-muted-foreground mt-1.5">{b.note}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-lg bg-secondary p-4 flex items-start gap-3">
            <Sparkles className="h-4 w-4 text-accent mt-0.5 shrink-0" />
            <div className="flex-1 text-sm">
              <div className="font-medium">Recommended next move</div>
              <div className="text-muted-foreground text-xs mt-0.5">
                10-Q targeted set on numerical questions with units. Estimated +4 marks lift.
              </div>
            </div>
            <Button size="sm" asChild>
              <Link to="/app/practice/question">Run set</Link>
            </Button>
          </div>
        </div>

        {/* Weak areas */}
        <div className="col-span-5 lt-card p-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Weak Areas</div>
          <h2 className="font-display text-xl font-semibold mt-1 mb-5">Topics dragging your score</h2>

          <div className="space-y-3">
            {[
              { name: "Trigonometric Identities", subj: "Maths", acc: 48 },
              { name: "Electricity · Resistance", subj: "Science", acc: 54 },
              { name: "Quadratic word problems", subj: "Maths", acc: 58 },
              { name: "Heredity · Mendel's laws", subj: "Science", acc: 61 },
            ].map((w) => (
              <Link
                key={w.name}
                to="/app/topic-hub"
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/60 transition-colors group"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{w.name}</div>
                  <div className="text-xs text-muted-foreground">{w.subj}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-danger">{w.acc}%</div>
                  <div className="text-[10px] text-muted-foreground">accuracy</div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="col-span-12 lt-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-xl font-semibold">Recent activity</h2>
            <Link to="/app" className="text-xs text-muted-foreground hover:text-foreground">Back to home →</Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { t: "Practice Set · Quadratic Equations", m: "9 / 12 correct", time: "Today · 7:42 PM", to: "/app/practice/question" },
              { t: "Worksheet generated · Maths Preset B", m: "20 Qs · downloaded", time: "Today · 6:10 PM", to: "/app/practice/worksheets" },
              { t: "Answer uploaded · Trigonometry Q4", m: "Graded 3/5", time: "Yesterday", to: "/app/check-improve" },
              { t: "Mock Test 03 · Maths", m: "Score 64/80", time: "2 days ago", to: "/app/practice" },
              { t: "Topic Hub · Light", m: "Watched 3 lessons", time: "3 days ago", to: "/app/topic-hub" },
              { t: "Predicted Qs · Electricity", m: "5 attempted", time: "4 days ago", to: "/app/practice/question" },
            ].map((a, i) => (
              <Link key={i} to={a.to} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/60 transition-colors">
                <div className="h-2 w-2 rounded-full bg-accent" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{a.t}</div>
                  <div className="text-xs text-muted-foreground">{a.m}</div>
                </div>
                <div className="text-xs text-muted-foreground shrink-0">{a.time}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Me;
