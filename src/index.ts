import "source-map-support/register";
import express from "express";

import { json } from "body-parser";
import reply from "./routes/reply";
import client from "./routes/client";

const app = express();
app.use(json());

app.listen(process.env.PORT || 3000);


app.use("/reply", reply);
app.use("/", client);
