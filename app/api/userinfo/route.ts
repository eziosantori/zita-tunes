import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch user info from ZITADEL
    const userInfoResponse = await fetch(
      `${process.env.ZITADEL_ISSUER}/oidc/v1/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    if (!userInfoResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch user info" },
        { status: userInfoResponse.status }
      );
    }

    const userInfo = await userInfoResponse.json();

    return NextResponse.json(userInfo);
  } catch (error) {
    console.error("Error fetching user info:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
