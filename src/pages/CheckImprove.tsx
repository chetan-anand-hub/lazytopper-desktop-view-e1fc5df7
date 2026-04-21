import { useState } from "react";
import { PageHeader } from "@/components/lt/PageHeader";
import { Button } from "@/components/ui/button";
import { useLT } from "@/lib/lt-store";
import {
  Upload,
  ScanLine,
  Sparkles,
  TrendingUp,
  ChevronRight,
  FileImage,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";

const CATEGORIES = [
  { id: "concept", label: "Conceptual", color: "bg-warning", soft: "bg-warning-soft text-warning-foreground", count: 2, note: "Confused arithmetic vs geometric mean." },
  { id: "calc", label: "Calculation", color: "bg-info", soft: "bg-info-soft text-info", count: 1, note: "Sign error in step 3 of derivation." },
  { id: "silly", label: "Silly", color: "bg-danger", soft: "bg-danger-soft text-danger", count: 3, note: "Missed units (m/s²) twice. Skipped final 'therefore'." },
  { id: "present", label: "Presentation", color: "bg-accent", soft: "bg-accent-soft text-accent", count: 1, note: "Diagram unlabelled — examiner deducted 1 mark." },
];

const CheckImprove = () => {
  const { requestGate } = useLT();
  const [view, setView] = useState<"upload" | "graded">("graded");

  const onUpload = () => {
    if (requestGate("upload-answer")) {
      setView("graded");
    }
  };

  if (view === "upload") {
    return (
      <div className="lt-section max-w-[1100px]">
        <PageHeader
          eyebrow="Check & Improve"
          title="Upload your handwritten answer"
          description="Snap a photo or upload a PDF. We'll grade examiner-style and show you exactly where marks slipped."
        />
        <div className="lt-card p-12 border-dashed border-2 text-center">
          <div className="h-16 w-16 mx-auto rounded-2xl bg-secondary grid place-items-center text-primary">
            <Upload className="h-7 w-7" />
          </div>
          <h3 className="font-display text-xl font-semibold mt-5">Drag & drop your answer</h3>
          <p className="text-sm text-muted-foreground mt-1.5">PNG, JPG or PDF · up to 10 MB</p>
          <div className="mt-6 flex justify-center gap-3">
            <Button onClick={onUpload} className="bg-foreground text-background hover:bg-foreground/90">
              <FileImage className="mr-1.5 h-4 w-4" /> Choose file
            </Button>
            <Button onClick={onUpload} variant="outline">Use camera</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lt-section max-w-[1500px]">
      <PageHeader
        showBack
        eyebrow="Check & Improve · Graded result"
        title="Trigonometry · Q4 (5 marks)"
        description="Examiner-style grading. Mistake categorised. Next action queued."
        actions={
          <>
            <Button variant="outline" onClick={() => setView("upload")}>Upload another</Button>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Practice this mistake type <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-12 gap-6">
        {/* LEFT — answer + annotations */}
        <div className="col-span-7 space-y-5">
          <div className="lt-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your uploaded answer</div>
              <div className="flex items-center gap-3">
                <div className="text-2xl font-display font-semibold text-foreground">3<span className="text-muted-foreground text-base">/5</span></div>
                <div className="lt-chip bg-warning-soft text-warning-foreground">Needs work</div>
              </div>
            </div>

            {/* Faux annotated answer */}
            <div className="rounded-lg border border-border bg-muted/30 p-5 space-y-3 font-serif text-[15px] leading-relaxed">
              <Annotation type="ok" text="sin θ = perpendicular / hypotenuse = 3/5" note="Correct setup" />
              <Annotation type="ok" text="cos θ = base / hypotenuse = 4/5" note="" />
              <Annotation type="warn" text="tan θ = sin θ / cos θ = 3/5 × 5/4 = 3/4" note="Working unclear — show step" />
              <Annotation type="bad" text="∴ tan θ = 3/4" note="Missing 'units / final boxed answer' — silly" />
              <Annotation type="warn" text="(diagram of right triangle)" note="Sides not labelled — presentation" />
            </div>
          </div>

          <div className="lt-card p-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Examiner note</div>
            <p className="text-sm leading-relaxed text-foreground/90">
              "Strong start with correct ratios, but step 3 lost a mark for unclear working and step 4 lost a mark for not labelling the diagram. Final answer is correct — make your method visible to the examiner."
            </p>
          </div>
        </div>

        {/* RIGHT — mistake categories + insights */}
        <div className="col-span-5 space-y-5">
          <div className="lt-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Mistake categories</div>
              <div className="lt-chip">This answer</div>
            </div>
            <div className="space-y-3">
              {CATEGORIES.map((c) => (
                <div key={c.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/40">
                  <div className={`h-2.5 w-2.5 rounded-full ${c.color}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{c.label}</div>
                    <div className="text-xs text-muted-foreground truncate">{c.note}</div>
                  </div>
                  <div className={`lt-chip ${c.soft}`}>{c.count}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lt-card p-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <TrendingUp className="h-3.5 w-3.5" /> Trend over last 5 uploads
            </div>
            <div className="mt-4 flex items-end gap-2 h-24">
              {[2, 3, 2, 4, 3].map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <div className="w-full bg-muted rounded-md flex items-end h-full">
                    <div className="w-full bg-gradient-to-t from-primary to-primary-glow rounded-md" style={{ height: `${(v / 5) * 100}%` }} />
                  </div>
                  <div className="text-[10px] text-muted-foreground">{v}/5</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Silly mistakes dropped 40% over 2 weeks. Keep going.
            </p>
          </div>

          <div className="lt-card p-5 bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
            <div className="flex items-center gap-2 text-accent text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" /> Improvement insight
            </div>
            <h4 className="font-display text-lg font-semibold mt-2 leading-snug">
              You lose 1 mark per answer to "no boxed final answer."
            </h4>
            <p className="text-sm text-primary-foreground/75 mt-2">
              We've prepared a 5-Q presentation drill that focuses on examiner-friendly formatting.
            </p>
            <Button size="sm" className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">
              Run drill <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Annotation = ({ type, text, note }: { type: "ok" | "warn" | "bad"; text: string; note: string }) => {
  const Icon = type === "ok" ? CheckCircle2 : type === "warn" ? AlertCircle : XCircle;
  const color = type === "ok" ? "text-accent" : type === "warn" ? "text-warning" : "text-danger";
  const bg = type === "ok" ? "bg-accent-soft" : type === "warn" ? "bg-warning-soft" : "bg-danger-soft";
  return (
    <div className="flex items-start gap-3">
      <Icon className={`h-4 w-4 mt-1 shrink-0 ${color}`} />
      <div className="flex-1">
        <div className={`inline-block px-2 py-0.5 rounded ${type !== "ok" ? bg : ""}`}>{text}</div>
        {note && <div className={`text-xs mt-1 font-sans not-italic ${color}`}>↳ {note}</div>}
      </div>
    </div>
  );
};

export default CheckImprove;
