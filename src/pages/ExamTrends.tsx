import { PageHeader } from "@/components/lt/PageHeader";
import { Link } from "react-router-dom";
import { Flame, TrendingUp, Sparkle, ArrowRight } from "lucide-react";

const COLUMNS = [
  {
    id: "must",
    label: "Must Crack",
    icon: Flame,
    color: "border-l-danger",
    pill: "bg-danger-soft text-danger",
    sub: "Appears in 9/10 board years. Don't skip.",
    topics: [
      { name: "Quadratic Equations", marks: "12-14 marks", prob: 96, sub: "Maths" },
      { name: "Trigonometry & Heights", marks: "10-12 marks", prob: 94, sub: "Maths" },
      { name: "Light – Reflection & Refraction", marks: "8-10 marks", prob: 93, sub: "Science" },
      { name: "Electricity", marks: "10 marks", prob: 92, sub: "Science" },
    ],
  },
  {
    id: "high",
    label: "High ROI",
    icon: TrendingUp,
    color: "border-l-warning",
    pill: "bg-warning-soft text-warning-foreground",
    sub: "Short syllabus, big mark return.",
    topics: [
      { name: "Probability", marks: "5-6 marks", prob: 81, sub: "Maths" },
      { name: "Statistics", marks: "5-6 marks", prob: 78, sub: "Maths" },
      { name: "Acids, Bases & Salts", marks: "6-8 marks", prob: 76, sub: "Science" },
      { name: "Heredity", marks: "4-5 marks", prob: 72, sub: "Science" },
    ],
  },
  {
    id: "good",
    label: "Good to do",
    icon: Sparkle,
    color: "border-l-info",
    pill: "bg-info-soft text-info",
    sub: "Lower probability, polish-level.",
    topics: [
      { name: "Coordinate Geometry", marks: "3-4 marks", prob: 58, sub: "Maths" },
      { name: "Surface Areas & Volumes", marks: "3 marks", prob: 54, sub: "Maths" },
      { name: "Carbon & Compounds", marks: "4 marks", prob: 51, sub: "Science" },
      { name: "Our Environment", marks: "2-3 marks", prob: 42, sub: "Science" },
    ],
  },
];

const ExamTrends = () => {
  return (
    <div className="lt-section max-w-[1500px]">
      <PageHeader
        eyebrow="Exam Trends · Class 10 · 2026 board"
        title="Priority board"
        description="Built from 10 years of CBSE board papers + 2026 sample paper. Click any topic to open its Topic Hub."
      />

      <div className="grid grid-cols-3 gap-6">
        {COLUMNS.map((col) => (
          <div key={col.id} className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <col.icon className="h-4 w-4 text-foreground" />
                <h3 className="font-display text-lg font-semibold">{col.label}</h3>
              </div>
              <span className={`lt-chip ${col.pill}`}>{col.topics.length}</span>
            </div>
            <p className="text-xs text-muted-foreground px-1">{col.sub}</p>

            <div className="space-y-3 mt-3">
              {col.topics.map((t) => (
                <Link
                  key={t.name}
                  to="/app/topic-hub"
                  className={`lt-card lt-card-hover block border-l-4 ${col.color} p-5 group`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{t.sub}</div>
                      <h4 className="font-display text-base font-semibold mt-1 leading-snug">{t.name}</h4>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-base font-semibold text-foreground">{t.prob}%</div>
                      <div className="text-[10px] text-muted-foreground">likely</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-muted-foreground">{t.marks}</span>
                    <span className="text-xs font-medium text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Open Topic Hub <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamTrends;
