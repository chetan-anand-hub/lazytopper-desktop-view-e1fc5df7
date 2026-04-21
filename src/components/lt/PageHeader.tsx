import { ReactNode } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  showBack?: boolean;
  actions?: ReactNode;
}

export const PageHeader = ({ eyebrow, title, description, showBack, actions }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-start justify-between gap-6 mb-8">
      <div>
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-3 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>
        )}
        {eyebrow && (
          <div className="text-xs font-semibold text-accent uppercase tracking-[0.18em] mb-2">
            {eyebrow}
          </div>
        )}
        <h1 className="font-display text-3xl md:text-[34px] font-semibold text-foreground leading-tight">
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground mt-2 max-w-2xl">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
};
