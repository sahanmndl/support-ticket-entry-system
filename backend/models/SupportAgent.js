import {model, Schema} from 'mongoose';

const SupportAgentSchema = new Schema(
    {
        email: {
            type: String,
            default: "",
            required: true,
            unique: true
        },
        name: {
            type: String,
            default: "",
            required: true,
        },
        phone: {
            type: String,
            default: "",
            required: true
        },
        description: {
            type: String,
            default: "",
            required: true
        },
        active: {
            type: Boolean,
            default: false,
            required: true
        },
        dateCreated: {
            type: Date,
            default: Date.now(),
            required: true
        }
    }
)

const SupportAgent = model('SupportAgent', SupportAgentSchema)
export default SupportAgent