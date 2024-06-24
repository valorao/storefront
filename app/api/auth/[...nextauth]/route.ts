import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";
import { OAuthConfig } from "next-auth/providers/oauth";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

interface UserInfo {
    id: number;
    name: string;
    email: string;
    profilePicture: string;
}

interface ValorantIntegration {
    token: string;
    puuid: string;
}

interface Profile {
    userInfo: UserInfo;
    valorantIntegration: ValorantIntegration;
}

interface CustomUserProfile {
    id: string;
    name: string;
    email: string;
    image: string;
    valorantToken: string;
    valorantPuuid: string;
}

const unifiedProvider: OAuthConfig<any> = {
    id: 'unified',
    name: 'Unified',
    style: { logo: "https://d1lnimbb3nut4m.cloudfront.net/unified-logo/svg/unified-logo-white.svg", bg: "#24292f", text: "#fff", },
    version: '2.0',
    type: 'oauth',
    authorization: {
        url: 'http://10.1.1.17:3004/login',
        params: { scope: "valorant" },
    },
    token: {
        async request(context) {
            const params = new URLSearchParams({
                client_id: process.env.UNIFIED_ID!,
                client_secret: process.env.UNIFIED_SECRET!,
                code: context.params.code!,
                grant_type: 'authorization_code',
                redirect_uri: context.provider.callbackUrl!,
            });

            const response = await fetch('http://10.1.1.17:3004/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params.toString(),
            });

            const tokens = await response.json();

            if (!response.ok) {
                throw new Error(tokens.error || 'Authorization failed');
            }

            return {
                tokens,
            };
        },
    },
    userinfo: 'http://10.1.1.17:3004/userinfo',
    clientId: process.env.UNIFIED_ID!,
    clientSecret: process.env.UNIFIED_SECRET!,
    checks: ['state'],
    profile: (profile: Profile): CustomUserProfile => {
        return {
            id: profile.userInfo.id.toString(),
            name: profile.userInfo.name,
            email: profile.userInfo.email,
            image: profile.userInfo.profilePicture,
            valorantToken: profile.valorantIntegration.token,
            valorantPuuid: profile.valorantIntegration.puuid,
        };
    },
};

interface User {
    id: string;
    valorantToken?: string;
    valorantPuuid?: string;
    // Allow name, email, and image to be null or undefined
    name?: string | null;
    email?: string | null;
    image?: string | null;
}

interface CustomSession extends Session {
    user: User;
}

interface CustomJWT extends JWT {
    id?: string;
    valorantToken?: string;
    valorantPuuid?: string;
}

export const authOptions = {
    providers: [
        unifiedProvider,
        // GitHubProvider({
        //     clientId: process.env.GITHUB_ID ?? "",
        //     clientSecret: process.env.GITHUB_SECRET ?? "",
        // }),
    ],
    callbacks: {
        async session({ session, token }: any): Promise<Session> {
            session.user = session.user ?? {};
            session.user.id = token.id ?? '';
            session.user.valorantToken = token.valorantToken;
            session.user.valorantPuuid = token.valorantPuuid;
            session.user.image = token.image;

            if (token.exp) {
                session.expires = Math.floor(Date.now() / 1000) + 3600;
            }
            if (token.initialLoginTime) {
                session.expires = token.initialLoginTime + 3600;
            }
            return session as Session;
        },
        async jwt({ token, user, account, isNewUser }: any): Promise<JWT> {
            if (user) {
                token.id = user.id;
                token.valorantToken = user.valorantToken;
                token.valorantPuuid = user.valorantPuuid;
                token.image = user.image;
            }
            if (account?.accessTokenExpires) {
                token.exp = Math.floor(new Date(account.accessTokenExpires).getTime() / 1000);
            }
            if (isNewUser || !token.initialLoginTime) {
                token.initialLoginTime = Math.floor(Date.now() / 1000);
            }
            return token;
        },
    },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
