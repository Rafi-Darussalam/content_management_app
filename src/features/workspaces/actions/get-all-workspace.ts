"use server";
import { requireSession } from "@/lib/auth-guard";
import { requireAuth } from "@/lib/auth-guard";
import prisma from "@/lib/prisma";

export async function getWorkspaces(page: number, limit: number = 20) {
  const session = await requireSession();
  await requireAuth();

  const skip = (page - 1) * limit;

  try {
    const [workspaces, total] = await Promise.all([
      prisma.organization.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
        where: {
          members: {
            some: {
              userId: session?.user.id,
            },
          },
        },
      }),
      prisma.organization.count({
        where: {
          members: {
            some: {
              userId: session?.user.id,
            },
          },
        },
      }),
    ]);

    const hasMore = skip + workspaces.length < total;

    return {
      workspaces,
      hasMore,
      total,
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
}
