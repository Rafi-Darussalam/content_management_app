import prisma from "@/lib/prisma";
import { requireSession } from "@/lib/auth-guard";
import { requireAuth } from "@/lib/auth-guard";

export async function getDashboardStats() {
  await requireAuth();
  const session = await requireSession();

  try {
    const [organizations] = await Promise.all([
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

    return [
      {
        label: "Workspaces",
        value: organizations,
      },
      {
        label: "Workspaces",
        value: organizations,
      },
      {
        label: "Workspaces",
        value: organizations,
      },
      {
        label: "Workspaces",
        value: organizations,
      },
    ];
  } catch (error) {}
}
