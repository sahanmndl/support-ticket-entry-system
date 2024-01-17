import SupportTicket from "../models/SupportTicket.js";
import SupportAgent from "../models/SupportAgent.js";

export const createSupportTicket = async (req, res, next) => {
    try {
        const {topic, description, severity, type, assignedTo, status, dateCreated} = req.body

        const newTicket = await SupportTicket.create({
            topic: topic,
            description: description,
            severity: severity,
            type: type,
            assignedTo: assignedTo,
            status: status,
            dateCreated: dateCreated,
            resolvedOn: status === "Resolved" ? dateCreated : null
        })

        if (status !== "Resolved") {
            const assignedAgent = await SupportAgent.findOne({email: assignedTo})
            if (assignedAgent) {
                assignedAgent.active = true
                await assignedAgent.save()
            }
        }

        await newTicket.save()
        return res.status(200).json({supportTicket: newTicket})
    } catch (e) {
        console.error("Support Ticket Create Error: ", e)
        return res.status(500).json({message: 'Error creating new support ticket!'})
    }
}

export const getAllSupportTickets = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const skip = (page - 1) * limit

        const filter = {}
        if (req.query.status) filter.status = req.query.status
        if (req.query.assignedTo) filter.assignedTo = req.query.assignedTo
        if (req.query.severity) filter.severity = req.query.severity
        if (req.query.type) filter.type = req.query.type

        const sort = {}
        if (req.query.sortBy && (req.query.sortBy === 'dateCreated' || req.query.sortBy === 'resolvedOn')) {
            sort[req.query.sortBy] = req.query.sortOrder && req.query.sortOrder.toLowerCase() === 'desc' ? -1 : 1
        }

        const supportTickets = await SupportTicket.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limit)

        return res.status(200).json({supportTickets, page, limit})
    } catch (e) {
        console.error("Support Tickets Return Error: ", e)
        return res.status(500).json({message: 'Error returning all support tickets!'})
    }
}

export const resolveSupportTicket = async (req, res, next) => {
    try {
        const {ticketId, assignedTo, resolvedOn} = req.body

        const supportTicket = await SupportTicket.findById(ticketId)
        if (!supportTicket) {
            return res.status(404).json({message: 'Ticket not found'})
        }

        const assignedAgent = await SupportAgent.findOne({email: assignedTo})
        if (!assignedAgent) {
            return res.status(404).json({message: 'Agent not found'})
        }

        if (assignedAgent) {
            assignedAgent.active = false
            await assignedAgent.save()
        }

        supportTicket.status = "Resolved"
        supportTicket.resolvedOn = resolvedOn
        await supportTicket.save()

        return res.status(200).json({supportTicket: supportTicket})
    } catch (e) {
        console.error("Support Tickets Resolve Error: ", e)
        return res.status(500).json({message: 'Error resolving support ticket!'})
    }
}

export const deleteAllSupportTickets = async (req, res, next) => {
    try {
        await SupportTicket.deleteMany({})
        return res.status(200).json({message: 'All tickets deleted successfully'})
    } catch (e) {
        return res.status(500).json({message: 'Error deleting tickets'})
    }
}