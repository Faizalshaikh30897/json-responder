import { Router, Request, Response, NextFunction } from "express";
import ResponderModel from "../models/responder";
import { v4 as uuidv4 } from "uuid";

const router = Router();

router.get("/responders", async (_req: Request, res: Response) => {
  const responders = await ResponderModel.find();
  if (!responders) {
    res.status(404).json({ message: "not found" });
  } else {
    res.status(200).json(responders);
  }
});

router.get("/responder/by/hash/:hash", async (req: Request, res: Response) => {
  const responder = await ResponderModel.findOne({ hash: req.params.hash });
  if (!responder) {
    res.status(404).json({ message: "not found" });
  } else {
    res.status(200).json(responder);
  }
});

router.post("/responders", async (req: Request, res: Response,next: NextFunction) => {
  try{
    console.log(`Request to generate api: ${JSON.stringify(req.body)}`);
    const { data } = req.body.responder;
    const hash = uuidv4();
    const responder = ResponderModel.build({ hash, data });
    await responder.save();
    res.status(201).send(responder);
  }
  catch(e){
    
    next(e);
  }
});

export default router;
