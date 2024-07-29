import { PrismaClient } from "@prisma/client";
import type { RequestHandler } from "@sveltejs/kit";

const prisma = new PrismaClient();

const getUserIdFromRequest = (request) => {
  // This function should extract the user ID from the request, 
  // typically from a session or an authorization token.
  // You will need to implement this based on your authentication method.
  // For example:
  // const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  // return verifyTokenAndGetUserId(token);
  return 1; // Placeholder, replace with actual implementation.
};

export const GET: RequestHandler = async ({ request }) => {
  try {
    const userId = getUserIdFromRequest(request);

    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { walletAddress: true },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ walletAddress: user.walletAddress }), { status: 200 });
  } catch (error) {
    console.error("Error fetching wallet address:", error);
    return new Response(JSON.stringify({ error: "Error fetching wallet address" }), { status: 500 });
  }
};
