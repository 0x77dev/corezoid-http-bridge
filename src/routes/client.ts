import { Router, Request, Response, NextFunction } from "express";
import { v1 as uuid } from "uuid";
import { buildNC } from "../buildNATS";
import fetch from "node-fetch";
const ngrok = require('ngrok');
let URL = "";

(async () => {
    const url = await ngrok.connect(3000);
    URL = url;
    console.log(url);
})();

const nc = buildNC();
export const client = Router();
const corezoidbasepath = "https://www.corezoid.com/api/1/json/public";

client.get("/:procid/:webhookid", async (req: Request, res: Response, next: NextFunction) => {
    const { procid, webhookid } = req.params;
    const id = uuid();
    const webhook = `${corezoidbasepath}/${procid}/${webhookid}`;
    console.log("RECEIVE", id, webhook);
    try {
        const cres = await fetch(
            webhook,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    reply_url: URL + "/reply/" + id, req: {
                        headers: req.headers,
                        path: req.path,
                        id
                    }
                })
            });
        console.log("CALL COREZOID", cres.status, await cres.json());
    } catch (error) {
        next(error);
    }

    nc.subscribe("send/" + id, (data: { html: string }) => {
        res.send(data.html);
    });
})

client.get("/:procid/:webhookid/*", async (req: Request, res: Response, next: NextFunction) => {
    const { procid, webhookid } = req.params;
    const id = uuid();
    const webhook = `${corezoidbasepath}/${procid}/${webhookid}`;
    console.log("RECEIVE", id, webhook);
    try {
        const cres = await fetch(
            webhook,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    reply_url: URL + "/reply/" + id, req: {
                        headers: req.headers,
                        path: req.path,
                        id
                    }
                })
            });
        console.log("CALL COREZOID", cres.status, await cres.json());
    } catch (error) {
        next(error);
    }

    nc.subscribe("send/" + id, (data: { html: string }) => {
        res.send(data.html);
    });
})

export default client;
