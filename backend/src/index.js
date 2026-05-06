import { app } from "./app.js";
import dotenv from "dotenv";
import connectdb from "./database_connect/index.js";

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 8000;

connectdb()
  .then(() => {

    app.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`);
    });

  })
  .catch((error) => {

    console.log("MongoDB connection failed", error);

    process.exit(1);

  });