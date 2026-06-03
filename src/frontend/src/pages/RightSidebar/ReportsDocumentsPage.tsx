import { Download, FileSearch, FileText, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { GeneratedPropertyReport } from "../../backend";
import DepthCard from "../../components/cards/DepthCard";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useGeneratePropertyReport } from "../../hooks/useSidebarDomainQueries";

interface GeneratedEntry {
  propertyId: string;
  report: GeneratedPropertyReport;
  generatedAt: Date;
}

function downloadReport(entry: GeneratedEntry) {
  const content = entry.report.content;
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `report-${entry.propertyId}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

function ReportSection({ line }: { line: string }) {
  const isHeader =
    line.startsWith("==") ||
    line.startsWith("--") ||
    line.toUpperCase() === line.trim();
  if (isHeader) {
    return (
      <div className="pt-3 pb-1 border-b border-white/10">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          {line.replace(/[=\-]/g, "").trim()}
        </p>
      </div>
    );
  }
  if (!line.trim()) return <div className="h-1" />;
  return <p className="text-sm text-muted-foreground">{line}</p>;
}

export default function ReportsDocumentsPage() {
  const [propertyId, setPropertyId] = useState("");
  const [history, setHistory] = useState<GeneratedEntry[]>([]);
  const [activeReport, setActiveReport] = useState<GeneratedEntry | null>(null);
  const generateReport = useGeneratePropertyReport();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    const pid = propertyId.trim();
    if (!pid) return;

    try {
      const report = await generateReport.mutateAsync(pid);
      const entry: GeneratedEntry = {
        propertyId: pid,
        report,
        generatedAt: new Date(),
      };
      setHistory((prev) => [entry, ...prev]);
      setActiveReport(entry);
      setPropertyId("");
      toast.success(`Report generated for ${pid}`);
    } catch (err: unknown) {
      toast.error(
        err instanceof Error ? err.message : "Failed to generate report",
      );
    }
  };

  return (
    <div className="min-h-screen p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-primary/10">
          <FileText className="h-7 w-7 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Reports & Documents</h1>
          <p className="text-sm text-muted-foreground">
            Generate comprehensive property intelligence reports
          </p>
        </div>
      </div>

      <DepthCard className="bg-card/60 backdrop-blur-md border border-white/10 rounded-2xl">
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-2">
            <FileSearch className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Generate Property Report</h2>
          </div>
          <form onSubmit={handleGenerate} className="flex gap-3">
            <div className="flex-1 space-y-1">
              <Label
                htmlFor="report-pid"
                className="text-xs text-muted-foreground"
              >
                Property ID
              </Label>
              <Input
                id="report-pid"
                data-ocid="reports.property_id.input"
                placeholder="e.g. PROP-001 or title number"
                value={propertyId}
                onChange={(e) => setPropertyId(e.target.value)}
                required
                disabled={generateReport.isPending}
              />
            </div>
            <div className="flex items-end">
              <Button
                type="submit"
                data-ocid="reports.generate.submit_button"
                disabled={generateReport.isPending || !propertyId.trim()}
                className="gap-2"
              >
                {generateReport.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Report"
                )}
              </Button>
            </div>
          </form>

          {generateReport.isError && (
            <div
              data-ocid="reports.error_state"
              className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
            >
              {generateReport.error.message}
            </div>
          )}
        </div>
      </DepthCard>

      {history.length > 0 && !activeReport && (
        <DepthCard className="bg-card/60 backdrop-blur-md border border-white/10 rounded-2xl">
          <div className="p-5 space-y-3">
            <h2 className="font-semibold text-sm">Session History</h2>
            <div className="space-y-2">
              {history.map((entry, idx) => (
                <button
                  key={entry.generatedAt.getTime()}
                  type="button"
                  data-ocid={`reports.history.item.${idx + 1}`}
                  className="flex items-center justify-between w-full rounded-xl bg-card/40 border border-white/10 px-4 py-2 hover:bg-white/5 transition-colors"
                  onClick={() => setActiveReport(entry)}
                >
                  <div className="text-left">
                    <p className="text-sm font-medium">{entry.propertyId}</p>
                    <p className="text-xs text-muted-foreground">
                      {entry.generatedAt.toLocaleTimeString()}
                    </p>
                  </div>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        </DepthCard>
      )}

      {activeReport ? (
        <DepthCard className="bg-card/60 backdrop-blur-md border border-white/10 rounded-2xl">
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold">
                  Report: {activeReport.propertyId}
                </h2>
                <p className="text-xs text-muted-foreground">
                  Generated {activeReport.generatedAt.toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                {history.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    data-ocid="reports.back_button"
                    onClick={() => setActiveReport(null)}
                  >
                    ← History
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  data-ocid="reports.download.button"
                  className="gap-2"
                  onClick={() => downloadReport(activeReport)}
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>

            <div
              data-ocid="reports.report.panel"
              className="max-h-[60vh] overflow-y-auto rounded-xl bg-card/30 border border-white/10 p-4 space-y-1"
            >
              {activeReport.report.content.split("\n").map((line, i) => (
                <ReportSection
                  key={`report-line-${i}-${line.slice(0, 8)}`}
                  line={line}
                />
              ))}
            </div>
          </div>
        </DepthCard>
      ) : history.length === 0 ? (
        <div
          data-ocid="reports.empty_state"
          className="rounded-2xl border border-white/10 bg-card/40 p-12 text-center space-y-2"
        >
          <FileSearch className="h-10 w-10 mx-auto text-muted-foreground/40" />
          <p className="text-muted-foreground">
            Enter a property ID to generate a comprehensive report.
          </p>
          <p className="text-xs text-muted-foreground/60">
            Reports include ownership history, dispute records, market value,
            and nearby infrastructure.
          </p>
        </div>
      ) : null}
    </div>
  );
}
