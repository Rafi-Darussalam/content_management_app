"use client";
import { useEffect, useState, useCallback, useRef, Suspense } from "react";
import { getWorkspaces } from "../actions/get-all-workspace";
import { Workspaces } from "../types";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";
import { DashboardSkeleton } from "@/components/app-shell/dashboard-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export function WorkSpaces() {
  const [workspaces, setWorkspaces] = useState<Workspaces[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastWorkspacesRef = useRef<HTMLDivElement | null>(null);

  const loadWorkspaces = useCallback(async () => {
    if (!loading && !hasMore) {
      return;
    }

    setLoading(true);
    try {
      const result = await getWorkspaces(page, 40);
      setWorkspaces((prev) => [...prev, ...result.workspaces]);
      setHasMore(result.hasMore);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    loadWorkspaces();
  }, []);

  useEffect(() => {
    const handleWorkspaceCreated = async () => {
      setLoading(true);
      try {
        const result = await getWorkspaces(1, 40);
        setWorkspaces(result.workspaces);
        setHasMore(result.hasMore);
        setPage(2);
      } catch (error) {
        console.error("Error loading workspaces:", error);
      } finally {
        setLoading(false);
      }
    };

    window.addEventListener("workspaceCreated", handleWorkspaceCreated);
    return () => {
      window.removeEventListener("workspaceCreated", handleWorkspaceCreated);
    };
  }, []);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadWorkspaces();
        }
      },
      { threshold: 0.5 },
    );

    if (lastWorkspacesRef.current) {
      observerRef.current.observe(lastWorkspacesRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [loadWorkspaces, hasMore, loading]);

  return (
    <>
      {loading ? (
        <div className="grid grid-cols-1 gap-px p-px md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 16 }).map((_, i) => (
            <Card className={cn("rounded-none bg-background")} key={i}>
              <CardContent className="flex flex-row items-center gap-2 whitespace-nowrap overflow-hidden text-ellipsis">
                <Skeleton className="h-3 w-10" />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Skeleton className="h-4 w-12" />
                <Skeleton  className="w-12 h-12 rounded-full"/>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-px p-px md:grid-cols-2 lg:grid-cols-4">
          {workspaces.map((item, i) => (
            <Card className={cn("rounded-none bg-background")} key={i}>
              <CardContent className="flex flex-row items-center gap-2 whitespace-nowrap overflow-hidden text-ellipsis">
                <p>{item.name}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                {new Date(item.createdAt).toLocaleDateString()}
                <Button asChild className="rounded-full">
                  <Link href={`/workspaces/${item.id}`}>
                    <MoveUpRight />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
