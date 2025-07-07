import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import ZitadelProvider from "next-auth/providers/zitadel";

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const tokenUrl = `${process.env.ZITADEL_ISSUER}/oauth/v2/token`;

    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: token.refreshToken as string,
        client_id: process.env.ZITADEL_CLIENT_ID!,
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      expiresAt: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error("Error during refreshAccessToken", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

const handler = NextAuth({
  providers: [
    ZitadelProvider({
      issuer: process.env.ZITADEL_ISSUER,
      clientId: process.env.ZITADEL_CLIENT_ID ?? "",
      clientSecret: process.env.ZITADEL_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          scope: `openid email profile offline_access`,
        },
      },
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          firstName: profile.given_name,
          lastName: profile.family_name,
          email: profile.email,
          loginName: profile.preferred_username,
          image: profile.picture,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.user = user;
      }
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = (account.expires_at ?? 0) * 1000;
      }
      token.error = undefined;

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.expiresAt as number)) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = {
          id: token.user.id,
          email: token.user.email || null,
          image: token.user.image || null,
          name: token.user.name || null,
          loginName: token.user.loginName,
        };
      }
      session.clientId = process.env.ZITADEL_CLIENT_ID ?? "";
      session.error = token.error;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
