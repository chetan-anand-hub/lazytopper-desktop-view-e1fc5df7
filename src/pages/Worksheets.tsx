import { useState } from "react";
import { PageHeader } from "@/components/lt/PageHeader";
import { Button } from "@/components/ui/button";
import { useLT } from "@/lib/lt-store";
import { Download, Eye, FileText, Sliders, Sparkles, Wand2 } from "lucide-react";

const SUBJECTS = ["Maths", "Science"];
const TOPICS_BY_SUBJ: Record<string, string[]> = {
  Maths: ["Quadratic Equations", "Trigonometry", "Probability", "Surface Areas & Volumes", "Statistics", "Polynomials"],
  Science: ["Light", "Electricity", "Carbon & its Compounds", "Life Processes", "Heredity", "Acids, Bases & Salts"],
};
const PRESETS = [
  { id: "A", label: "A · MCQ-heavy", mix: "20 MCQ · 5 Short" },
  { id: "B", label: "B · Balanced board", mix: "10 MCQ · 8 Short · 4 Long" },
  { id: "C", label: "C · Competency-focused", mix: "8 Case · 6 A-R · 6 Short" },
  { id: "D", label: "D · Long-answer drill", mix: "4 Long · 4 Case · 4 Short" },
  { id: "E", label: "E · Mock pattern", mix: "Full board paper · 80 marks" },
];
const QTYPES = ["MCQ", "Assertion-Reasoning", "Case-based", "Competency", "Short", "Long"];
const DIFFICULTIES = ["Easy", "Medium", "Hard"];

const Worksheets = () => {
  const { requestGate } = useLT();
  const [subject, setSubject] = useState("Maths");
  const [topics, setTopics] = useState<string[]>(["Quadratic Equations", "Trigonometry"]);
  const [preset, setPreset] = useState("B");
  const [qtypes, setQtypes] = useState<string[]>(["MCQ", "Short", "Case-based"]);
  const [diff, setDiff] = useState("Medium");
  const [count, setCount] = useState(20);

  const toggle = (arr: string[], v: string, set: (a: string[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const onGenerate = () => {
    requestGate("generate-worksheet");
  };

  return (
    <div className="lt-section max-w-[1500px]">
      <PageHeader
        showBack
        eyebrow="Practice · Worksheets"
        title="Worksheet Generator"
        description="Two-panel workspace: configure on the left, preview & generate on the right."
        actions={
          <>
            <Button variant="outline">My library</Button>
            <Button onClick={onGenerate} className="bg-foreground text-background hover:bg-foreground/90">
              <Download className="mr-1.5 h-4 w-4" /> Generate PDF
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-12 gap-6">
        {/* LEFT FILTERS */}
        <div className="col-span-5 lt-card p-6 space-y-7 h-fit sticky top-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Sliders className="h-3.5 w-3.5" /> Filters
          </div>

          <Field label="Subject">
            <div className="flex gap-2">
              {SUBJECTS.map((s) => (
                <Pill key={s} active={subject === s} onClick={() => setSubject(s)}>{s}</Pill>
              ))}
            </div>
          </Field>

          <Field label="Topics" hint={`${topics.length} selected`}>
            <div className="flex flex-wrap gap-2">
              {TOPICS_BY_SUBJ[subject].map((t) => (
                <Pill key={t} active={topics.includes(t)} onClick={() => toggle(topics, t, setTopics)}>{t}</Pill>
              ))}
            </div>
          </Field>

          <Field label="Preset board-style mix">
            <div className="space-y-2">
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPreset(p.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    preset === p.id ? "border-primary bg-secondary" : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="text-sm font-medium">{p.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{p.mix}</div>
                </button>
              ))}
            </div>
          </Field>

          <Field label="Question types">
            <div className="flex flex-wrap gap-2">
              {QTYPES.map((q) => (
                <Pill key={q} active={qtypes.includes(q)} onClick={() => toggle(qtypes, q, setQtypes)}>{q}</Pill>
              ))}
            </div>
          </Field>

          <Field label="Difficulty">
            <div className="flex gap-2">
              {DIFFICULTIES.map((d) => (
                <Pill key={d} active={diff === d} onClick={() => setDiff(d)}>{d}</Pill>
              ))}
            </div>
          </Field>

          <Field label="Question count" hint={`${count} questions`}>
            <input
              type="range"
              min={5}
              max={40}
              step={5}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full accent-[hsl(var(--primary))]"
            />
            <div className="flex justify-between text-[11px] text-muted-foreground mt-1">
              <span>5</span><span>20</span><span>40</span>
            </div>
          </Field>
        </div>

        {/* RIGHT PREVIEW */}
        <div className="col-span-7 space-y-6">
          {/* Summary */}
          <div className="lt-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Summary</div>
                <h2 className="font-display text-xl font-semibold mt-2">
                  {subject} · {topics.length} topic{topics.length !== 1 && "s"} · Preset {preset}
                </h2>
              </div>
              <div className="lt-chip bg-accent-soft text-accent">~ {Math.round(count * 1.5)} mins</div>
            </div>
            <div className="grid grid-cols-4 gap-3 mt-5">
              {[
                { l: "Questions", v: count },
                { l: "Marks", v: count * 3 },
                { l: "Q-types", v: qtypes.length },
                { l: "Difficulty", v: diff },
              ].map((s) => (
                <div key={s.l} className="rounded-lg bg-muted/60 p-3">
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
                  <div className="text-lg font-semibold mt-0.5">{s.v}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-lg bg-secondary p-4 flex items-start gap-3">
              <Sparkles className="h-4 w-4 text-accent mt-0.5 shrink-0" />
              <div className="text-sm">
                <div className="font-medium">Mistake-aware suggestion</div>
                <div className="text-muted-foreground text-xs mt-0.5">
                  We've biased 30% of questions toward your top weak area: <b>numerical with units</b>.
                </div>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="lt-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <Eye className="h-3.5 w-3.5" /> Preview
              </div>
              <div className="text-xs text-muted-foreground">Page 1 of 3</div>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-6 font-serif text-sm leading-relaxed">
              <div className="text-center mb-4">
                <div className="font-semibold text-foreground">LazyTopper · CBSE Class 10</div>
                <div className="text-xs text-muted-foreground">{subject} Worksheet · Preset {preset} · {count} Qs · {count * 3} Marks</div>
              </div>
              <ol className="space-y-3 text-foreground/85 list-decimal pl-5">
                <li>If one of the roots of the quadratic equation 2x² − kx + 4 = 0 is 2, find the value of k.</li>
                <li>Assertion (A): The sum of the first n natural numbers is n(n+1)/2. Reason (R): It is an arithmetic progression with d = 1. Choose the correct option.</li>
                <li><span className="font-medium">Case study:</span> A garden is in the shape of a right triangle. If the hypotenuse is 13 m and one side is 5 m, find the area…</li>
                <li>Prove that √5 is irrational.</li>
                <li className="text-muted-foreground italic">… 16 more questions in this PDF</li>
              </ol>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <Button onClick={onGenerate} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Wand2 className="mr-1.5 h-4 w-4" /> Generate worksheet
              </Button>
              <Button onClick={onGenerate} variant="outline">
                <Download className="mr-1.5 h-4 w-4" /> Download PDF
              </Button>
              <Button variant="ghost">
                <FileText className="mr-1.5 h-4 w-4" /> Save to library
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) => (
  <div>
    <div className="flex items-center justify-between mb-2.5">
      <label className="text-sm font-medium">{label}</label>
      {hint && <span className="text-[11px] text-muted-foreground">{hint}</span>}
    </div>
    {children}
  </div>
);

const Pill = ({ active, onClick, children }: { active?: boolean; onClick?: () => void; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
      active
        ? "bg-primary text-primary-foreground border-primary"
        : "bg-card border-border text-foreground/80 hover:border-primary/50"
    }`}
  >
    {children}
  </button>
);

export default Worksheets;
