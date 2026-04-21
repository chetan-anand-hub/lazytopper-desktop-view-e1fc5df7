import { createContext, useContext, useState, ReactNode } from "react";

type GateAction =
  | "start-practice-set"
  | "generate-worksheet"
  | "start-test"
  | "upload-answer"
  | "personalized-topic";

interface LTState {
  isAuthed: boolean;
  setAuthed: (v: boolean) => void;
  gate: { open: boolean; action: GateAction | null; nextHref?: string };
  requestGate: (action: GateAction, nextHref?: string) => boolean; // returns true if allowed (already authed)
  closeGate: () => void;
  completeGate: () => string | undefined; // returns nextHref
}

const Ctx = createContext<LTState | null>(null);

export const LTProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthed, setAuthed] = useState(false);
  const [gate, setGate] = useState<LTState["gate"]>({ open: false, action: null });

  const requestGate: LTState["requestGate"] = (action, nextHref) => {
    if (isAuthed) return true;
    setGate({ open: true, action, nextHref });
    return false;
  };
  const closeGate = () => setGate({ open: false, action: null });
  const completeGate = () => {
    setAuthed(true);
    const href = gate.nextHref;
    setGate({ open: false, action: null });
    return href;
  };

  return (
    <Ctx.Provider value={{ isAuthed, setAuthed, gate, requestGate, closeGate, completeGate }}>
      {children}
    </Ctx.Provider>
  );
};

export const useLT = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLT must be used within LTProvider");
  return ctx;
};
