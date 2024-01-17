import {model, Schema} from 'mongoose';

const SupportTicketSchema = new Schema(
    {
        topic: {
            type: String,
            default: "",
            required: true,
        },
        description: {
            type: String,
            default: "",
            required: true,
        },
        dateCreated: {
            type: Date,
            default: Date.now(),
            required: true,
        },
        severity: {
            type: String,
            default: "",
            enum: ['Low', 'Medium', 'High'],
            required: true,
        },
        type: {
            type: String,
            default: "",
            required: true,
        },
        assignedTo: {
            type: String,
            default: "",
            required: true,
        },
        status: {
            type: String,
            default: "New",
            enum: ['New', 'Assigned', 'Resolved'],
            required: true,
        },
        resolvedOn: {
            type: Date,
            default: null,
        },
    }
)

const SupportTicket = model('SupportTicket', SupportTicketSchema)
export default SupportTicket