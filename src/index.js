import express from "express";
import cors from "cors";
import usersRouters from "./routes/users.routes.js";


const app = express();
app.use(cors());
app.use(express.json());
app.use(usersRouters);


app.listen(5000, () => console.log("Server running in port 5000"));