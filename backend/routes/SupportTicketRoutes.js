import express from "express";
import {
    createSupportTicket,
    deleteAllSupportTickets,
    getAllSupportTickets, resolveSupportTicket
} from "../controllers/SupportTicketController.js";

const supportTicketRouter = express.Router()

supportTicketRouter.get('/support-tickets', getAllSupportTickets)
supportTicketRouter.post('/support-tickets', createSupportTicket)
supportTicketRouter.put('/support-tickets', resolveSupportTicket)
//supportTicketRouter.delete('/support-tickets', deleteAllSupportTickets)

export default supportTicketRouter