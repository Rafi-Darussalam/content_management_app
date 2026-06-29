import { auth } from "./auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";

async function requireSession() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    return session
}

export async function requireAuth() {
    const session = await requireSession()

    if (!session) {
        redirect('/')
    }
}

export async function requireGuest() {
    const session = await requireSession()

    if (session) {
        redirect('/')
    }
}

export async function requireAdmin() {
    const session = await requireSession()

    if (session?.user.role !== "admin") {
        notFound()
    }
}