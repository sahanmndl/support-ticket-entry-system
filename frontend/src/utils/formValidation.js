const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

const isPhoneValid = (phone) => {
    const phoneRegex = /^\d{10}$/
    return phoneRegex.test(phone)
}

export const validateSupportAgentForm = (email, name, phone, description) => {
    const errors = {}

    if (!email.trim()) {
        errors.email = 'Email is required'
    } else if (!isEmailValid(email)) {
        errors.email = 'Invalid email format'
    }

    if (!name.trim()) {
        errors.name = 'Name is required'
    }

    if (!phone.trim()) {
        errors.phone = 'Phone is required'
    } else if (!isPhoneValid(phone)) {
        errors.phone = 'Invalid phone number'
    }

    if (!description.trim()) {
        errors.description = 'Description is required'
    }

    return errors
}
