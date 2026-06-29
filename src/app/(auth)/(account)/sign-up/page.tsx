import { SignUpForm } from "@/features/auth/components/sign-up-form";
import { requireGuest } from "@/lib/auth-guard";

export default async function SignUpPage() {
  await requireGuest();

  return <SignUpForm />;
}
