import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WorkflowStage } from "@/data/mockData";

export function WorkflowProgress({ stages }: { stages: WorkflowStage[] }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-0">
      {stages.map((stage, i) => {
        const isLast = i === stages.length - 1;
        return (
          <div key={stage.key} className="flex flex-1 items-center">
            <div className="flex flex-col items-center text-center sm:flex-1">
              <div
                className={cn(
                  "flex size-9 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                  stage.status === "complete" && "border-success bg-success text-success-foreground",
                  stage.status === "active" && "border-primary bg-primary text-primary-foreground",
                  stage.status === "upcoming" && "border-border bg-card text-muted-foreground"
                )}
              >
                {stage.status === "complete" ? <Check className="size-4" /> : i + 1}
              </div>
              <span
                className={cn(
                  "mt-2 hidden text-xs font-medium sm:block",
                  stage.status === "upcoming" ? "text-muted-foreground" : "text-foreground"
                )}
              >
                {stage.label}
              </span>
            </div>
            {!isLast && (
              <div
                className={cn(
                  "mx-1 hidden h-0.5 flex-1 sm:block",
                  stage.status === "complete" ? "bg-success" : "bg-border"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
