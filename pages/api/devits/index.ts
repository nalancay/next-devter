import { generateTimesline } from "@/test/factories/timeline";
import { NextApiRequest, NextApiResponse } from "next";

const timeline = generateTimesline();
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(timeline);
};

export default handler;
