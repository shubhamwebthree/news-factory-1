import { db } from "../../../database"; // Adjust import based on your setup

/**
 * @param {any} req
 * @param {{ json: (arg0: any) => void; sendStatus: (arg0: number) => void; }} res
 */
export async function get(req, res) {
  try {
    const [results] = await db.query('SELECT * FROM articles ORDER BY likes DESC LIMIT 10');
    res.json(results);
  } catch (error) {
    console.error('Error fetching trending news:', error);
    res.sendStatus(500);
  }
}
