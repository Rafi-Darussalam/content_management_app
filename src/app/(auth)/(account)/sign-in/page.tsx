import { SignInForm } from "@/features/auth/components/sign-in-form";
import { requireGuest } from "@/lib/auth-guard";

export default async function SignUpPage() {
  await requireGuest();

  return <SignInForm />;
}
