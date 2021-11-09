import { Router, Request, Response } from "express";
import ResponderModel from "../models/responder";

const router = Router();


router.get("/response/by/hash/:hash", async (req: Request, res: Response) => {
  const responders = await ResponderModel.findOne({ hash: req.params.hash });
  if (!responders) {
    res.status(404).json({ message: "not found" });
  } else {
    res.status(200).json(responders.data);
  }
});

export default router;