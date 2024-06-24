import { getServerSession } from "next-auth/next";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  return (
    redirect(session ? "/storefront" : "/api/auth/signin")
  );
}
