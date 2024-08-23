import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes";
import db from "./config/mongo";
import { createAdminUser } from "./config/createAdmin";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
    res.json({
        text: 'welcome'
    });
});
app.use(router);

db().then(() => {
    console.log("Connection to BD ready");
    createAdminUser()
});

app.listen(PORT, () => console.log(`Listen port: ${PORT}`));