import { AppShell } from "@/components/app-shell/app-shell"
import { requireAuth } from "@/lib/auth-guard"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    await requireAuth()

    return (
        <AppShell>
            {children}
        </AppShell>
    )
}