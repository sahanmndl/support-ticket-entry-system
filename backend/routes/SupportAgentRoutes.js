import express from "express";
import {
    createSupportAgent,
    deleteAllSupportAgents,
    getAllSupportAgents
} from "../controllers/SupportAgentController.js";

const supportAgentRouter = express.Router()

supportAgentRouter.post('/support-agents', createSupportAgent)
supportAgentRouter.get('/support-agents', getAllSupportAgents)
//supportAgentRouter.delete('/support-agents', deleteAllSupportAgents)

export default supportAgentRouter