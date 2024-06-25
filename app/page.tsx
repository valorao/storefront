import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  return (
    redirect(session ? "/store" : "/api/auth/signin")
  );
}
