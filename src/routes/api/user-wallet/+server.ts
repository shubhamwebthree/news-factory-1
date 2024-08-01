import { PrismaClient } from "@prisma/client";
import type { RequestHandler } from "@sveltejs/kit";

const prisma = new PrismaClient();

/**
 * Extracts the user ID from the request.
 * This function should be implemented based on your authentication method,
 * such as extracting from a session, JWT token, etc.
 */
const getUserIdFromRequest = (request) => {
  // Example: Extract user ID from a JWT token in the Authorization header
  // const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  // if (!token) return null;
  // const payload = verifyToken(token); // Implement verifyToken based on your auth method
  // return payload?.userId;

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
      select: { walletAddress: true, email: true, password: true },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};
