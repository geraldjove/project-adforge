import { Badge } from "@/components/ui/badge";
import type { ReviewStatus } from "@/data/mockData";

const map: Record<ReviewStatus, { label: string; variant: "success" | "warning" | "destructive" | "secondary" }> = {
  approved: { label: "Approved", variant: "success" },
  "needs-revision": { label: "Needs Revision", variant: "warning" },
  rejected: { label: "Rejected", variant: "destructive" },
  pending: { label: "Pending Review", variant: "secondary" },
};

export function StatusBadge({ status }: { status: ReviewStatus }) {
  const s = map[status];
  return <Badge variant={s.variant}>{s.label}</Badge>;
}
