import express from "express";
import { initiateSTKPush } from "../controllers/mpesaController.js";

const mpesaRouter = express.Router();

mpesaRouter.post("/stkpush", initiateSTKPush);

export default mpesaRouter; 