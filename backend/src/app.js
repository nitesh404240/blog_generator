import express from "express"
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors({origin: "http://localhost:5173", credentials: true}));
import blog_routes from "./routes/blog_routes.js"

app.use("/blog/" , blog_routes);

export {app}