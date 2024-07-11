import { OAuthConfig } from "next-auth/providers/oauth";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";

interface UserInfo {
    id: number;
    name: string;
    email: string;
    profilePicture: string;
}

interface ValorantIntegration {
    token: string;
    puuid: string;
    ssid: string;
}

interface Profile {
    userInfo: UserInfo;
    valorantIntegration: ValorantIntegration;
}

interface CustomUserProfile extends User {
    valorantToken: string;
    valorantPuuid: string;
    valorantSsid: string;
}

interface CustomSession extends Session {
    user: CustomUserProfile;
}

interface CustomJWT extends JWT {
    id?: string;
    valorantToken?: string;
    valorantPuuid?: string;
    valorantSsid?: string;
    exp?: number;
    initialLoginTime?: number;
}

const unifiedProvider: OAuthConfig<any> = {
    id: 'unified',
    name: 'Unified',
    style: { logo: "https://d1lnimbb3nut4m.cloudfront.net/unified-logo/svg/unified-logo-white.svg", bg: "#24292f", text: "#fff" },
    version: '2.0',
    type: 'oauth',
    authorization: {
        url: 'https://oauth.rtrampox.cloud/login',
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

            const response = await fetch('https://oauth.rtrampox.cloud/api/token', {
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
    userinfo: 'https://oauth.rtrampox.cloud/api/userinfo',
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
            valorantSsid: profile.valorantIntegration.ssid,
        };
    },
};

export const authOptions: NextAuthOptions = {
    providers: [
        unifiedProvider,
    ],
    callbacks: {
        async jwt({ token, account, profile }: { token: JWT; user?: User; account?: any; profile?: any; }): Promise<JWT> {
            const customToken = token as CustomJWT;
            if (account && profile) {
                customToken.id = profile.id;
                customToken.valorantToken = profile.valorantIntegration.token;
                customToken.valorantPuuid = profile.valorantIntegration.puuid;
                customToken.valorantSsid = profile.valorantIntegration.ssid;
                customToken.refreshToken = account.refresh_token;
                customToken.accessToken = account.access_token;
            }
            if (!customToken.initialLoginTime) {
                customToken.initialLoginTime = Math.floor(Date.now() / 1000);
                customToken.exp = customToken.initialLoginTime + 3600;
            }

            return customToken;
        },
        async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
            const customSession = session as CustomSession;
            const customToken = token as CustomJWT;
            if (customSession.user) {
                customSession.user.id = customToken.id ?? '';
                customSession.user.valorantToken = customToken.valorantToken ?? '';
                customSession.user.valorantPuuid = customToken.valorantPuuid ?? '';
                customSession.user.valorantSsid = customToken.valorantSsid ?? '';
            }

            if (customToken.exp) {
                customSession.expires = new Date(customToken.exp * 1000).toISOString();
            }

            return customSession;
        },
    },
    session: {
        strategy: 'jwt',
    },
    jwt: {
        maxAge: 3600,
    },
};
