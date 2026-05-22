import { Router, Request, Response } from "express";
import { captureCard, getPlayerCaptures } from "../services/captureService";

const router = Router();

// POST /api/captures
router.post("/", (req: Request, res: Response) => {
  const { playerId, cardId, latitude, longitude } = req.body;

  if (!playerId || !cardId || typeof latitude !== "number" || typeof longitude !== "number") {
    res.status(400).json({ error: "playerId, cardId, latitude, longitude requis" });
    return;
  }

  const result = captureCard(playerId, cardId, latitude, longitude);
  if (!result.success) {
    res.status(400).json({ success: false, message: result.message });
    return;
  }
  res.status(201).json(result);
});

// GET /api/captures/:playerId
router.get("/:playerId", (req: Request, res: Response) => {
  const captures = getPlayerCaptures(req.params.playerId as string);
  res.json(captures);
});

export default router;
