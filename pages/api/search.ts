import fs from "fs";
import readline from "readline";

import type { NextApiRequest, NextApiResponse } from "next";

// @ts-ignore
const rd = readline.createInterface({
  input: fs.createReadStream("./data/wordlist.txt"),
  // output: process.stdout,
  console: false,
});

const wordlist: string[] = [];

rd.on("line", (line) => {
  wordlist.push(line);
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req;

  try {
    if (query.term) {
      const results = wordlist.filter((word) =>
        word.startsWith(query.term as string)
      );

      return res.status(200).json({ words: results });
    }

    return res.status(404).json({ words: [] });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
