import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardCard } from "./card";
import { getDashboardStats } from "../actions/get-stats";
import { Skeleton } from "@/components/ui/skeleton";

export async function DashboardStats() {
  const stats = await getDashboardStats();

  return (
    <>
      {stats?.map((s, i) => (
        <DashboardCard key={i}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-normal text-xs tracking-wide">
              {s.label}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-row items-center gap-2">
            <p className="font-semibold text-2xl tabular-nums">{s.value}</p>
          </CardContent>
        </DashboardCard>
      ))}
    </>
  );
}

export function StatsFallback() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <DashboardCard key={i}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-normal text-xs tracking-wide">
              <Skeleton className="w-16 h-3" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-row items-center gap-2">
            <Skeleton className="w-12 h-8" />
          </CardContent>
        </DashboardCard>
      ))}
    </>
  );
}
