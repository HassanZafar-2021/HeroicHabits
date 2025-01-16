import express from "express";
import path from "path";

const app = express();

app.get("/", (req: express.Request, res: express.Response) => {
  const filePath = path.join(__dirname, "home.html");
  res.sendFile(filePath, (err: NodeJS.ErrnoException | null) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error occurred while sending the file.");
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
