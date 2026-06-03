import {
  ChevronDown,
  ChevronUp,
  Clock,
  FileText,
  Plus,
  Shield,
  Upload,
} from "lucide-react";
import { useState } from "react";
import DepthCard from "../../components/cards/DepthCard";
import {
  useAddDisputeEvidence,
  useCreateDispute,
  useGetDisputeEvidence,
  useGetDisputeTimeline,
  useGetRiskIntelligence,
} from "../../hooks/useSidebarDomainQueries";

function RiskScoreMeter({ score }: { score: number }) {
  const color = score < 3 ? "#22c55e" : score < 6 ? "#f59e0b" : "#ef4444";
  const angle = (score / 10) * 180;
  const r = 40;
  const cx = 50;
  const cy = 50;
  const startX = cx - r;
  const startY = cy;
  const endX = cx + r * Math.cos((Math.PI * angle) / 180 - Math.PI);
  const endY = cy + r * Math.sin((Math.PI * angle) / 180 - Math.PI) * -1;

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 100 60" className="w-32 h-20" aria-hidden="true">
        <path
          d={`M ${startX} ${startY} A ${r} ${r} 0 0 1 ${cx + r} ${startY}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          className="text-border/30"
        />
        <path
          d={`M ${startX} ${startY} A ${r} ${r} 0 ${angle > 180 ? 1 : 0} 1 ${endX} ${endY}`}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
        />
        <text
          x="50"
          y="52"
          textAnchor="middle"
          fontSize="14"
          fill={color}
          fontWeight="bold"
        >
          {score.toFixed(1)}
        </text>
      </svg>
      <p className="text-xs text-muted-foreground">Overall Risk Score / 10</p>
    </div>
  );
}

function DisputeDetail({ disputeId }: { disputeId: string }) {
  const { data: timeline } = useGetDisputeTimeline(disputeId);
  const { data: evidence } = useGetDisputeEvidence(disputeId);
  const addEvidence = useAddDisputeEvidence();
  const [form, setForm] = useState({
    fileId: "",
    fileName: "",
    description: "",
    fileSize: "0",
  });

  return (
    <div className="mt-3 pt-3 border-t border-border/20 space-y-3">
      <div>
        <p className="text-xs font-semibold text-muted-foreground mb-2">
          Timeline
        </p>
        {!timeline?.length ? (
          <p className="text-xs text-muted-foreground">No timeline events.</p>
        ) : (
          timeline.map(
            (
              e: { eventType: string; description: string; timestamp: bigint },
              _i: number,
            ) => (
              <div
                key={`timeline-${e.eventType}-${e.timestamp}`}
                className="flex gap-2 text-xs mb-2"
              >
                <Clock
                  size={10}
                  className="mt-0.5 text-muted-foreground shrink-0"
                />
                <div>
                  <span className="font-medium">{e.eventType}</span>
                  <span className="text-muted-foreground ml-2">
                    {e.description}
                  </span>
                  <div className="text-muted-foreground">
                    {new Date(Number(e.timestamp) / 1_000_000).toLocaleString()}
                  </div>
                </div>
              </div>
            ),
          )
        )}
      </div>
      <div>
        <p className="text-xs font-semibold text-muted-foreground mb-2">
          Evidence ({evidence?.length ?? 0} files)
        </p>
        {evidence?.map(
          (ev: { id: string; fileName: string; fileSize: bigint }) => (
            <div
              key={ev.id}
              className="flex items-center gap-2 text-xs mb-1 p-2 rounded-lg bg-card/30"
            >
              <FileText size={12} />
              <span>{ev.fileName}</span>
              <span className="text-muted-foreground ml-auto">
                {Math.round(Number(ev.fileSize) / 1024)}KB
              </span>
            </div>
          ),
        )}
      </div>
      <div className="space-y-2">
        <p className="text-xs font-semibold">Upload Evidence</p>
        <input
          className="w-full text-xs p-2 rounded-lg bg-input border border-border/30"
          placeholder="File ID"
          value={form.fileId}
          onChange={(e) => setForm((f) => ({ ...f, fileId: e.target.value }))}
        />
        <input
          className="w-full text-xs p-2 rounded-lg bg-input border border-border/30"
          placeholder="File name"
          value={form.fileName}
          onChange={(e) => setForm((f) => ({ ...f, fileName: e.target.value }))}
        />
        <input
          className="w-full text-xs p-2 rounded-lg bg-input border border-border/30"
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm((f) => ({ ...f, description: e.target.value }))
          }
        />
        <button
          type="button"
          onClick={() =>
            addEvidence.mutate({
              disputeId,
              fileId: form.fileId,
              fileName: form.fileName,
              fileSize: BigInt(Number.parseInt(form.fileSize) || 0),
              description: form.description,
            })
          }
          className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20"
        >
          <Upload size={12} />{" "}
          {addEvidence.isPending ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
}

export default function RiskIntelligencePage() {
  const { data: risk, isLoading } = useGetRiskIntelligence();
  const createDispute = useCreateDispute();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newDispute, setNewDispute] = useState({ propertyId: "", reason: "" });

  if (isLoading)
    return (
      <div className="p-4 space-y-3 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 rounded-2xl bg-card/40" />
        ))}
      </div>
    );

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Shield size={20} className="text-primary" />
        <h1 className="text-lg font-bold">Risk Intelligence</h1>
      </div>

      <DepthCard className="p-4 flex flex-col items-center">
        <RiskScoreMeter score={risk?.riskScore ?? 0} />
      </DepthCard>

      <div className="grid grid-cols-3 gap-3">
        <DepthCard className="p-3 text-center">
          <p className="text-xl font-bold text-red-500">
            {Number(risk?.fraudAlertCount ?? 0)}
          </p>
          <p className="text-xs text-muted-foreground">Fraud Alerts</p>
        </DepthCard>
        <DepthCard className="p-3 text-center">
          <p className="text-xl font-bold text-amber-500">
            {risk?.highRiskProperties?.length ?? 0}
          </p>
          <p className="text-xs text-muted-foreground">High Risk Properties</p>
        </DepthCard>
        <DepthCard className="p-3 text-center">
          <p className="text-xl font-bold text-primary">
            {risk?.recentDisputes?.length ?? 0}
          </p>
          <p className="text-xs text-muted-foreground">Active Disputes</p>
        </DepthCard>
      </div>

      <DepthCard className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold">Dispute Tracker</h2>
          <button
            type="button"
            onClick={() => setShowNewForm((f) => !f)}
            className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20"
          >
            <Plus size={12} /> New Dispute
          </button>
        </div>

        {showNewForm && (
          <div className="mb-4 p-3 rounded-xl bg-card/30 border border-border/20 space-y-2">
            <input
              className="w-full text-xs p-2 rounded-lg bg-input border border-border/30"
              placeholder="Property ID"
              value={newDispute.propertyId}
              onChange={(e) =>
                setNewDispute((d) => ({ ...d, propertyId: e.target.value }))
              }
            />
            <textarea
              className="w-full text-xs p-2 rounded-lg bg-input border border-border/30 resize-none"
              rows={2}
              placeholder="Reason for dispute"
              value={newDispute.reason}
              onChange={(e) =>
                setNewDispute((d) => ({ ...d, reason: e.target.value }))
              }
            />
            <button
              type="button"
              onClick={() => {
                createDispute.mutate({
                  id: crypto.randomUUID(),
                  propertyId: newDispute.propertyId,
                  reason: newDispute.reason,
                  status: { open: null } as unknown as any,
                  created: BigInt(0),
                  updated: BigInt(0),
                  initiator: "" as unknown as any,
                  comments: [],
                });
                setShowNewForm(false);
              }}
              className="text-xs px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {createDispute.isPending ? "Filing..." : "File Dispute"}
            </button>
          </div>
        )}

        {!risk?.recentDisputes?.length ? (
          <p className="text-xs text-muted-foreground text-center py-4">
            No active disputes.
          </p>
        ) : (
          risk.recentDisputes.map(
            (d: {
              id: string;
              propertyId: string;
              reason: string;
              status: string;
            }) => {
              const statusColor =
                d.status === "open"
                  ? "text-red-500 bg-red-500/10"
                  : d.status === "underReview"
                    ? "text-amber-500 bg-amber-500/10"
                    : "text-emerald-500 bg-emerald-500/10";
              return (
                <div
                  key={d.id}
                  className="border border-border/20 rounded-xl p-3 mb-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-mono">{d.propertyId}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                        {d.reason}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusColor}`}
                    >
                      {d.status}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setExpanded((prev) => (prev === d.id ? null : d.id))
                    }
                    className="flex items-center gap-1 text-[10px] text-muted-foreground mt-2 hover:text-foreground"
                  >
                    {expanded === d.id ? (
                      <ChevronUp size={10} />
                    ) : (
                      <ChevronDown size={10} />
                    )}
                    {expanded === d.id ? "Hide" : "View"} details
                  </button>
                  {expanded === d.id && <DisputeDetail disputeId={d.id} />}
                </div>
              );
            },
          )
        )}
      </DepthCard>
    </div>
  );
}
