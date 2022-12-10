import bodyParser from "body-parser";
import express, { Application, Request, Response } from "express";
import { img } from "./types";
import fs from "fs";
import { v4 as uuid } from "uuid";

import { promisify } from "util";
const app: Application = express();
const port: number = 3000;

app.use(
  bodyParser.json({
    limit: "1mb",
  })
);
const writeFile = promisify(fs.writeFile);

app.get("/healthCheck", (req: Request, res: Response) => {
  res.send("Hello World Server is running");
});

app.post("/api/img", async (req: Request, res: Response) => {
  let body: img = req.body;

  try {
    const buffer = Buffer.from(body.fileData, "base64");
    const fileName = uuid();
    await writeFile(`./images/${fileName}.jpg`, buffer);
    res.json({
      message: "file wite successfully",
      fileName: `${fileName}.png`,
    });
  } catch (error: any) {
    console.log(error);
    res.json(error);
  }
});
app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}/healthCheck`);
});
