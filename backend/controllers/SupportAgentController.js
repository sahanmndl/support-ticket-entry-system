import SupportAgent from "../models/SupportAgent.js";
import SupportTicket from "../models/SupportTicket.js";

export const createSupportAgent = async (req, res, next) => {
    try {
        const {email, name, phone, description} = req.body

        const existingAgent = await SupportAgent.findOne({email})
        if (existingAgent) {
            return res.status(400).json({message: 'Support agent with this email already exists'})
        }

        const newAgent = await SupportAgent.create({
            email: email,
            name: name,
            phone: phone,
            description: description
        })

        await newAgent.save()
        return res.status(200).json({supportAgent: newAgent})
    } catch (e) {
        console.error("Support Agent Create Error: ", e)
        return res.status(500).json({message: 'Error creating new support agent!'})
    }
}

export const getAllSupportAgents = async (req, res, next) => {
    try {
        const supportAgents = await SupportAgent.find({})
        return res.status(200).json({supportAgents})
    } catch (e) {
        console.error("Support Agents Return Error: ", e)
        return res.status(500).json({message: 'Error returning all support agents!'})
    }
}

export const deleteAllSupportAgents = async (req, res, next) => {
    try {
        await SupportAgent.deleteMany({})
        return res.status(200).json({message: 'All agents deleted successfully'})
    } catch (e) {
        return res.status(500).json({message: 'Error deleting agents'})
    }
}