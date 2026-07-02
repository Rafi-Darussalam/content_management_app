import { Skeleton } from "@/components/ui/skeleton";
import { DashboardStats, StatsFallback } from "./stats";
import { Suspense } from "react";

export async function DashboardUser() {
  return (
    <div className="grid grid-cols-1 gap-px bg-border p-px md:grid-cols-2 lg:grid-cols-4">
      <Suspense fallback={<StatsFallback />}>
        <DashboardStats />
      </Suspense>
    </div>
  );
}
