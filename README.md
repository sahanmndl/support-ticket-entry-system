# Support Ticket Entry System

Create new support tickets and agents; Assign agents to any ticket and resolve them

## Features

- Create support agent
- Create support ticket
- Automatically assign agent to a ticket (in Round Robin way) or can manually assign any agent
- Resolve the ticket

## Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/sahanmndl/support-ticket-entry-system.git
cd support-ticket-entry-system
```

2. Install dependencies:

- Install in frontend (React)
```bash
cd frontend
npm install
```

- Install in backend (Node.js)
```bash
cd backend
npm install
```
Also, create a `.env` file in `backend` folder to store the MONGODB url in this format: `MONGODB_URL = {YOUR_MONGODB_URL}`

3. Run

- frontend (React)
```bash
cd frontend
npm start
```

- backend (Node.js)
```bash
cd backend
nodemon index.js
```