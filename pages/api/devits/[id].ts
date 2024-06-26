import { generateTimesline } from "@/test/factories/timeline";
import { NextApiRequest, NextApiResponse } from "next";

const timeline = generateTimesline();

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const item = timeline.find((item) => item.id === id);

  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  res.status(200).json(item);
};

export default handler;
