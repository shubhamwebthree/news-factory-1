import { db } from "../../../database"; // Adjust import based on your setup

// @ts-ignore
export async function post(req, res) {
  const { id } = req.params;
  
  try {
    await db.query('UPDATE articles SET likes = likes + 1 WHERE id = ?', [id]);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error updating likes:', error);
    res.sendStatus(500);
  }
}
