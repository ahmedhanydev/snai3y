/* eslint-disable */
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { method, url, data, token } = body;

    console.log("Request:", { method, url });

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Add authorization header if token is provided
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error?.description || "API request failed");
    }

    return NextResponse.json(responseData);
  } catch (error: any) {
    console.error("Proxy Error:", error);
    return NextResponse.json(
      {
        isSuccess: false,
        error: {
          description: error.message || "An error occurred",
          statusCode: 500,
        },
      },
      { status: 500 }
    );
  }
}
