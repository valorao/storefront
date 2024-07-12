import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth-options";

export const handler = NextAuth(authOptions) as never;
export { handler as GET, handler as POST };
