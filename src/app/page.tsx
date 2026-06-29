"use client"
import { signOut } from "@/lib/auth-client";

export default function Home() {
  async function handleSignOut() {
    await signOut()
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
}
