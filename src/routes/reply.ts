import { Router, Request, Response, NextFunction } from "express";
import { buildNC } from "../buildNATS";

const nc = buildNC();
export const reply = Router();

reply.post("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) next("id is missing");
    console.log("RETURN", id, req.body);

    nc.publish("send/" + id, { ...req.body }, () => {
        res.json({});
    });
});

export default reply;
