import express from "express";
import ItemController from "../controllers/ItemC.js";

const router = express.Router();
const item = new ItemController();

router.get("/", item.getData);

export default router;
