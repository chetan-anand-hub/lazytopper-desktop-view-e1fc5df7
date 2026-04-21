import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkles,
  GraduationCap,
  ScanLine,
  TrendingUp,
  Dumbbell,
  CheckCircle2,
  Star,
} from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="h-16 border-b border-border/60 bg-background/80 backdrop-blur sticky top-0 z-30">
        <div className="max-w-[1400px] mx-auto h-full px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-primary grid place-items-center">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <div className="font-display text-lg font-semibold leading-none">LazyTopper</div>
              <div className="text-[11px] text-muted-foreground mt-1">CBSE · Class 10</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <a href="#how" className="hover:text-foreground">How it works</a>
            <a href="#trends" className="hover:text-foreground">Exam Trends</a>
            <a href="#mistake" className="hover:text-foreground">Mistake Intelligence</a>
            <a href="#pricing" className="hover:text-foreground">Pricing</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">Sign in</Button>
            <Button size="sm" asChild className="bg-foreground text-background hover:bg-foreground/90">
              <Link to="/app">Open app</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[image:var(--gradient-soft)] -z-10" />
        <div className="max-w-[1400px] mx-auto px-8 pt-20 pb-24 grid grid-cols-12 gap-10 items-center">
          <div className="col-span-7">
            <div className="inline-flex items-center gap-2 lt-chip bg-accent-soft text-accent-foreground/90">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span className="text-accent">Built for CBSE Class 10 — Maths & Science</span>
            </div>
            <h1 className="font-display text-[64px] leading-[1.05] font-semibold mt-6 tracking-tight">
              Stop revising blind.
              <br />
              <span className="text-primary">Practice where you actually lose marks.</span>
            </h1>
            <p className="text-lg text-muted-foreground mt-6 max-w-xl leading-relaxed">
              LazyTopper turns every mistake into a smarter next question. Worksheets, predicted Qs, mocks and examiner-style answer checking — all driven by your real weak spots.
            </p>
            <div className="mt-9 flex items-center gap-3">
              <Button asChild size="lg" className="h-12 px-7 bg-accent hover:bg-accent/90 text-accent-foreground text-base">
                <Link to="/app/intent">
                  Start <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-7 text-base">
                <Link to="/app/exam-trends">Explore Topics First</Link>
              </Button>
            </div>
            <div className="flex items-center gap-6 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-accent" /> 7-day free trial
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-accent" /> No card required
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 text-warning" /> 4.8 from 12k students
              </div>
            </div>
          </div>

          {/* Hero card preview */}
          <div className="col-span-5">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-accent/10 blur-2xl rounded-[32px]" />
              <div className="relative rounded-2xl border border-border bg-card shadow-[var(--shadow-lg)] overflow-hidden">
                <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Mistake Intelligence</div>
                  <div className="lt-chip bg-warning-soft text-warning-foreground">This week</div>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <div className="text-xs text-muted-foreground">Where you lose marks (Maths)</div>
                    <div className="mt-2 grid grid-cols-4 gap-2">
                      {[
                        { l: "Silly", v: 38, c: "bg-danger" },
                        { l: "Concept", v: 26, c: "bg-warning" },
                        { l: "Calc", v: 22, c: "bg-info" },
                        { l: "Present.", v: 14, c: "bg-accent" },
                      ].map((b) => (
                        <div key={b.l}>
                          <div className="h-20 bg-muted rounded-md flex items-end overflow-hidden">
                            <div className={`${b.c} w-full rounded-md`} style={{ height: `${b.v * 2}%` }} />
                          </div>
                          <div className="text-[11px] text-muted-foreground mt-1.5 text-center">{b.l} · {b.v}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg bg-secondary p-4">
                    <div className="text-sm font-medium text-secondary-foreground">Quadratic Equations</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Predicted to appear · 92% likely</div>
                    <div className="mt-3 flex items-center gap-2">
                      <Button size="sm" className="h-8 bg-foreground text-background hover:bg-foreground/90">Practice now</Button>
                      <Button size="sm" variant="ghost" className="h-8">Open Topic Hub</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="max-w-[1400px] mx-auto px-8 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs font-semibold text-accent uppercase tracking-[0.18em]">Three ways to start</div>
          <h2 className="font-display text-4xl font-semibold mt-3">Choice-first. Always.</h2>
          <p className="text-muted-foreground mt-3">No long onboarding. Pick what you came to do today — we adapt around you.</p>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-12">
          {[
            { icon: Dumbbell, title: "Practice", desc: "Worksheets, sets, predicted Qs, timed practice & mock tests." },
            { icon: TrendingUp, title: "Exam Trends", desc: "See must-crack, high-ROI and good-to-do topics, then dive into Topic Hub." },
            { icon: ScanLine, title: "Check & Improve", desc: "Upload an answer. Get examiner-style grading and your next best move." },
          ].map((c) => (
            <div key={c.title} className="lt-card lt-card-hover p-7">
              <div className="h-11 w-11 rounded-lg bg-secondary grid place-items-center text-primary">
                <c.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl font-semibold mt-5">{c.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border bg-secondary/30 py-10">
        <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between text-xs text-muted-foreground">
          <div>© 2026 LazyTopper · Built for CBSE students.</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
