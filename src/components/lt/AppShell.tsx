import { ReactNode } from "react";
import { NavLink } from "@/components/NavLink";
import {
  LayoutDashboard,
  Dumbbell,
  TrendingUp,
  ScanLine,
  User,
  GraduationCap,
  Search,
  Bell,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLT } from "@/lib/lt-store";

const nav = [
  { to: "/app", label: "Home", icon: LayoutDashboard, end: true },
  { to: "/app/practice", label: "Practice", icon: Dumbbell },
  { to: "/app/exam-trends", label: "Exam Trends", icon: TrendingUp },
  { to: "/app/check-improve", label: "Check & Improve", icon: ScanLine },
  { to: "/app/me", label: "Me / Progress", icon: User },
];

export const AppShell = ({ children }: { children: ReactNode }) => {
  const { isAuthed } = useLT();
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[260px] shrink-0 bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border">
        <div className="px-6 py-6 flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-lg bg-accent grid place-items-center shadow-[var(--shadow-glow)]">
            <GraduationCap className="h-5 w-5 text-accent-foreground" />
          </div>
          <div>
            <div className="font-display text-lg font-semibold text-white leading-none">LazyTopper</div>
            <div className="text-[11px] text-sidebar-foreground/60 mt-1">CBSE · Class 10</div>
          </div>
        </div>

        <nav className="px-3 mt-2 flex flex-col gap-1">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-white transition-colors"
              activeClassName="bg-sidebar-accent text-white font-medium"
            >
              <n.icon className="h-[18px] w-[18px]" />
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto p-4">
          <div className="rounded-xl bg-sidebar-accent/60 border border-sidebar-border p-4">
            <div className="flex items-center gap-2 text-accent">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Mistake Intel</span>
            </div>
            <p className="text-sm text-sidebar-foreground/85 mt-2 leading-snug">
              You lose <span className="text-white font-semibold">38% marks</span> to silly errors in Maths.
            </p>
            <NavLink
              to="/app/me"
              className="mt-3 inline-block text-xs text-accent hover:underline"
            >
              See where →
            </NavLink>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 shrink-0 border-b border-border bg-card/80 backdrop-blur flex items-center px-8 gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search topics, chapters, questions…"
              className="w-full h-9 pl-9 pr-3 rounded-lg bg-muted/60 border border-transparent focus:bg-card focus:border-border outline-none text-sm transition-colors"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="h-9 w-9 grid place-items-center rounded-lg hover:bg-muted text-muted-foreground">
              <Bell className="h-[18px] w-[18px]" />
            </button>
            {isAuthed ? (
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-primary-glow grid place-items-center text-primary-foreground text-sm font-semibold">
                  AR
                </div>
                <div className="text-sm leading-tight">
                  <div className="font-medium">Aarav R.</div>
                  <div className="text-xs text-muted-foreground">Trial · 7 days left</div>
                </div>
              </div>
            ) : (
              <Button variant="outline" size="sm" asChild>
                <NavLink to="/">Exit prototype</NavLink>
              </Button>
            )}
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};
