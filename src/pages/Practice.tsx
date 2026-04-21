import { PageHeader } from "@/components/lt/PageHeader";
import { Link } from "react-router-dom";
import { useLT } from "@/lib/lt-store";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Layers,
  Sparkles,
  Timer,
  ClipboardCheck,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Practice = () => {
  const { requestGate } = useLT();
  const navigate = useNavigate();

  const startSet = () => {
    if (requestGate("start-practice-set", "/app/practice/question")) {
      navigate("/app/practice/question");
    }
  };

  const cards = [
    {
      to: "/app/practice/worksheets",
      icon: FileText,
      title: "Worksheets",
      desc: "Generate a printable worksheet with custom filters and board-style mixes.",
      cta: "Open generator",
      featured: true,
    },
    {
      onClick: startSet,
      icon: Layers,
      title: "Practice Sets",
      desc: "Curated 10-20 question sets by chapter and difficulty.",
      cta: "Start a set",
    },
    {
      to: "/app/practice/question",
      icon: Sparkles,
      title: "Predicted Questions",
      desc: "Most-likely board questions for 2026, ranked by probability.",
      cta: "View predicted Qs",
    },
    {
      onClick: startSet,
      icon: Timer,
      title: "Timed Practice",
      desc: "Beat the clock. Builds exam-day pace and pressure tolerance.",
      cta: "Start timer",
    },
    {
      onClick: () => requestGate("start-test", "/app/practice/question") && navigate("/app/practice/question"),
      icon: ClipboardCheck,
      title: "Mock Tests",
      desc: "Full-length board pattern. Auto-graded with mistake breakdown.",
      cta: "Take a mock",
    },
  ];

  return (
    <div className="lt-section">
      <PageHeader
        eyebrow="Practice"
        title="Build, drill, simulate."
        description="Five practice modes — pick the one that matches your goal tonight."
      />

      {/* Featured: Worksheets */}
      <Link
        to="/app/practice/worksheets"
        className="lt-card lt-card-hover p-8 flex items-center gap-8 mb-6 bg-gradient-to-br from-secondary via-card to-card relative overflow-hidden"
      >
        <div className="h-16 w-16 rounded-xl bg-card border border-border grid place-items-center text-primary shadow-sm shrink-0">
          <FileText className="h-7 w-7" />
        </div>
        <div className="flex-1">
          <div className="lt-chip bg-accent-soft text-accent mb-2">★ First-class path</div>
          <h2 className="font-display text-2xl font-semibold">Worksheet Generator</h2>
          <p className="text-muted-foreground mt-1.5 max-w-2xl">
            Mix MCQ / short / long, assertion-reasoning, competency-based and case-based. Match A/B/C/D/E board pattern. Download as PDF.
          </p>
        </div>
        <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 shrink-0">
          Open generator <ArrowRight className="ml-1.5 h-4 w-4" />
        </Button>
      </Link>

      {/* Other modes */}
      <div className="grid grid-cols-2 gap-5">
        {cards.slice(1).map((c, i) =>
          c.to ? (
            <Link key={i} to={c.to} className="lt-card lt-card-hover p-6 group">
              <CardInner {...c} />
            </Link>
          ) : (
            <button
              key={i}
              onClick={c.onClick}
              className="lt-card lt-card-hover p-6 group text-left"
            >
              <CardInner {...c} />
            </button>
          )
        )}
      </div>
    </div>
  );
};

const CardInner = ({ icon: Icon, title, desc, cta }: any) => (
  <div className="flex items-start gap-4">
    <div className="h-11 w-11 rounded-lg bg-secondary grid place-items-center text-primary shrink-0">
      <Icon className="h-5 w-5" />
    </div>
    <div className="flex-1">
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{desc}</p>
      <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all">
        {cta} <ArrowRight className="h-4 w-4" />
      </div>
    </div>
  </div>
);

export default Practice;
