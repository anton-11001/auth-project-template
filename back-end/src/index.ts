import express, { Express, Request, Response } from "express";

const app: Express = express();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (request: Request, response: Response) => {
  const name = request.query.name || "World";
  response.send(`Hello ${name}`);
});
