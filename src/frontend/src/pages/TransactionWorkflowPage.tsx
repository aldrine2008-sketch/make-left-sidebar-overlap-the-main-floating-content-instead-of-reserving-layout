import {
  ArrowLeftRight,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
} from "lucide-react";
import { useState } from "react";
import { DomainRole } from "../backend";
import DepthCard from "../components/cards/DepthCard";
import { useGetCallerUserProfile } from "../hooks/useCurrentUser";
import { useListTransactions } from "../hooks/useQueries";
import {
  useAdvanceTransactionStage,
  useGetTransactionStageHistory,
} from "../hooks/useSidebarDomainQueries";

const STAGES = [
  { key: "proposed", label: "Proposed" },
  { key: "escrow", label: "Escrow" },
  { key: "stampDuty", label: "Stamp Duty" },
  { key: "recorded", label: "Recorded" },
  { key: "completed", label: "Completed" },
];

function StageProgress({ currentStage }: { currentStage: string }) {
  const currentIdx = STAGES.findIndex((s) => s.key === currentStage);
  return (
    <div className="flex items-center gap-0 my-3">
      {STAGES.map((s, i) => (
        <div key={s.key} className="flex items-center">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
              i < currentIdx
                ? "bg-emerald-500 border-emerald-500 text-white"
                : i === currentIdx
                  ? "bg-primary border-primary text-primary-foreground animate-pulse"
                  : "bg-card/40 border-border/30 text-muted-foreground"
            }`}
          >
            {i < currentIdx ? <Check size={12} /> : i + 1}
          </div>
          {i < STAGES.length - 1 && (
            <div
              className={`h-0.5 w-8 mx-0.5 transition-all ${i < currentIdx ? "bg-emerald-500" : "bg-border/30"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function TransactionCard({ tx }: { tx: any }) {
  const [expanded, setExpanded] = useState(false);
  const { data: stageHistory } = useGetTransactionStageHistory(tx.id);
  const advanceStage = useAdvanceTransactionStage();
  const { data: userProfile } = useGetCallerUserProfile();
  const isOfficerOrAdmin =
    userProfile?.role === DomainRole.landOfficer ||
    userProfile?.role === DomainRole.admin;
  return (
    <DepthCard className="p-5 mb-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Property</p>
          <p className="font-mono font-semibold text-sm">{tx.propertyId}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Price</p>
          <p className="font-semibold text-primary">
            KES {Number(tx.price).toLocaleString()}
          </p>
        </div>
      </div>
      <StageProgress currentStage={tx.status} />
      <p className="text-xs text-muted-foreground mb-3">
        Current stage:{" "}
        <span className="text-foreground font-medium capitalize">
          {tx.status}
        </span>
      </p>
      {isOfficerOrAdmin &&
        tx.status !== "completed" &&
        tx.status !== "cancelled" && (
          <button
            type="button"
            onClick={() =>
              advanceStage.mutate({
                transactionId: tx.id,
                notes: "Advanced via dashboard",
              })
            }
            disabled={advanceStage.isPending}
            className="text-xs px-3 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors mb-3"
          >
            {advanceStage.isPending ? "Advancing..." : "Advance to Next Stage"}
          </button>
        )}
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        {expanded ? "Hide history" : "Show stage history"}
      </button>
      {expanded && (
        <div className="mt-3 space-y-2 border-t border-border/20 pt-3">
          {!stageHistory?.length ? (
            <p className="text-xs text-muted-foreground">
              No stage history yet.
            </p>
          ) : (
            stageHistory.map((entry: any) => (
              <div
                key={String(entry.timestamp)}
                className="flex items-start gap-2 text-xs"
              >
                <Clock
                  size={10}
                  className="mt-0.5 text-muted-foreground shrink-0"
                />
                <div>
                  <span className="font-medium capitalize">{entry.stage}</span>
                  <span className="text-muted-foreground ml-2">
                    {entry.notes}
                  </span>
                  <div className="text-muted-foreground">
                    {new Date(
                      Number(entry.timestamp) / 1_000_000,
                    ).toLocaleString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </DepthCard>
  );
}

export default function TransactionWorkflowPage() {
  const { data: transactions, isLoading } = useListTransactions();
  if (isLoading) {
    return (
      <div className="p-6 space-y-4 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 rounded-2xl bg-card/40" />
        ))}
      </div>
    );
  }
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <ArrowLeftRight size={24} className="text-primary" />
        <div>
          <h1 className="text-xl font-bold">Transaction Workflow</h1>
          <p className="text-sm text-muted-foreground">
            Track land transaction stages and progression
          </p>
        </div>
      </div>
      {!transactions?.length ? (
        <DepthCard className="p-10 text-center">
          <ArrowLeftRight
            size={40}
            className="mx-auto mb-3 text-muted-foreground/40"
          />
          <p className="text-muted-foreground">No transactions found.</p>
          <p className="text-sm text-muted-foreground mt-1">
            Transactions appear when land transfers are initiated.
          </p>
        </DepthCard>
      ) : (
        transactions.map((tx: any) => <TransactionCard key={tx.id} tx={tx} />)
      )}
    </div>
  );
}
