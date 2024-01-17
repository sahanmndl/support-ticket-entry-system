import React, {useEffect, useState} from "react";
import "./styles.css";
import {
    Alert,
    Button,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import axios from "axios";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const SupportTicketPage = () => {

    const [topic, setTopic] = useState("")
    const [description, setDescription] = useState("")
    const [severity, setSeverity] = useState("")
    const [type, setType] = useState("")
    const [assignedTo, setAssignedTo] = useState("")
    const [dateCreated, setDateCreated] = useState(dayjs())
    const [resolvedOn, setResolvedOn] = useState(dayjs())
    const [supportAgents, setSupportAgents] = useState([])
    const [supportTickets, setSupportTickets] = useState([])
    const [status, setStatus] = useState("")
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const assignAgentToTicket = async () => {
        try {
            const response = await axios.get(`http://localhost:8008/api/support-agents`)
            const supportAgents = response.data.supportAgents
            setSupportAgents(supportAgents)
            let assignedAgentEmail = null
            for (const agent of supportAgents) {
                if (!agent.active) {
                    assignedAgentEmail = agent.email
                    break
                }
            }
            if (assignedAgentEmail) {
                setAssignedTo(assignedAgentEmail)
                setStatus("Assigned")
            }
        } catch (e) {
            console.error(e)
        }
    }

    const handleCreateNewSupportTicket = async () => {
        if (topic.trim() === "" || description.trim() === "" || severity.trim() === ""
            || type.trim() === "" || assignedTo.trim() === "" || status.trim() === "") {
            setOpen(true)
            setAlertMessage("Please enter correct information")
        } else {
            try {
                setLoading(true)
                const requestBody = {
                    topic: topic.trim(),
                    description: description.trim(),
                    severity: severity.trim(),
                    type: type.trim(),
                    assignedTo: assignedTo.trim(),
                    status: status.trim(),
                    dateCreated: dateCreated.toDate()
                }
                console.log(requestBody)
                await axios.post(`http://localhost:8008/api/support-tickets`, requestBody)
                    .then((response) => {
                        setOpen(true)
                        setAlertMessage("New support ticket created!")
                        setTopic("")
                        setDescription("")
                        setSeverity("")
                        setType("")
                        setStatus("")
                        assignAgentToTicket()
                        fetchAllSupportTickets()
                    })
                    .catch((e) => {
                        console.error(e)
                        setOpen(true)
                        setAlertMessage(e.response.data.message)
                    })
            } catch (e) {
                console.error(e)
                setOpen(true)
                setAlertMessage(e.response.data.message)
            } finally {
                setLoading(false)
            }
        }
    }

    const fetchAllSupportTickets = async () => {
        try {
            await axios.get(`http://localhost:8008/api/support-tickets`)
                .then((response) => setSupportTickets(response.data.supportTickets))
                .catch((e) => console.error(e))
        } catch (e) {
            console.error(e)
        }
    }

    const resolveSupportTicket = async (ticketId, assignedTo) => {
        try {
            const requestBody = {
                ticketId: ticketId,
                assignedTo: assignedTo,
                resolvedOn: resolvedOn.toDate()
            }
            await axios.put(`http://localhost:8008/api/support-tickets`, requestBody)
                .then((response) => {
                    setOpen(true)
                    setAlertMessage("Ticket has been resolved!")
                    assignAgentToTicket()
                    fetchAllSupportTickets()
                })
                .catch((e) => {
                    console.error(e.response.data.message)
                    setOpen(true)
                    setAlertMessage(e.response.data.message)
                })
        } catch (e) {
            console.error(e.response.data.message)
            setOpen(true)
            setAlertMessage(e.response.data.message)
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    useEffect(() => {
        assignAgentToTicket()
        fetchAllSupportTickets()
    }, [])

    return (
        <div className={'ticket-page-container'}>
            <div className={'top-bar'}>
                <div className={'inputs-container'}>
                    <TextField
                        style={{marginBottom: 20, width: '320px'}}
                        label="Topic"
                        variant="outlined"
                        size="small"
                        value={topic}
                        onChange={(event) => setTopic(event.target.value)}
                    />
                    <TextField
                        style={{width: '320px'}}
                        label="Description"
                        variant="outlined"
                        size="small"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </div>
                <div className={'inputs-container'}>
                    <FormControl size={'small'} fullWidth>
                        <InputLabel>Severity</InputLabel>
                        <Select
                            value={severity}
                            label="Severity"
                            onChange={(event) => setSeverity(event.target.value)}
                        >
                            <MenuItem value={"Low"}>Low</MenuItem>
                            <MenuItem value={"Medium"}>Medium</MenuItem>
                            <MenuItem value={"High"}>High</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        style={{marginTop: 20, width: '320px'}}
                        label="Type"
                        variant="outlined"
                        size="small"
                        value={type}
                        onChange={(event) => setType(event.target.value)}
                    />
                </div>
                <div className={'inputs-container'}>
                    <TextField
                        style={{marginBottom: 20, width: '320px'}}
                        label="Assigned To"
                        variant="outlined"
                        size="small"
                        disabled={true}
                        value={assignedTo}
                    />
                    <FormControl size={'small'} fullWidth>
                        <InputLabel>Change Assigned Agent</InputLabel>
                        <Select
                            value={assignedTo}
                            label="Change Assigned Agent"
                            onChange={(event) => setAssignedTo(event.target.value)}
                        >
                            {supportAgents.filter((agent) => !agent.active).map((agent) => (
                                <MenuItem value={agent.email}>{agent.email}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className={'inputs-container'}>
                    <FormControl size={'small'} fullWidth sx={{marginBottom: '20px'}}>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={status}
                            label="Status"
                            onChange={(event) => setStatus(event.target.value)}
                        >
                            <MenuItem value={"New"}>New</MenuItem>
                            <MenuItem value={"Assigned"}>Assigned</MenuItem>
                            <MenuItem value={"Resolved"}>Resolved</MenuItem>
                        </Select>
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            slotProps={{textField: {size: 'small'}}}
                            label="Date Created"
                            value={dateCreated}
                            onChange={(date) => setDateCreated(date)}
                        />
                    </LocalizationProvider>
                </div>
            </div>
            <div className={'middle-bar'}>
                <Button
                    style={{width: '320px', height: '38px'}}
                    variant="contained"
                    color="primary"
                    size="small"
                    disabled={loading || (topic.trim() === "" || description.trim() === "" || severity.trim() === ""
                        || type.trim() === "" || assignedTo.trim() === "" || status.trim() === "")}
                    onClick={() => handleCreateNewSupportTicket()}
                >
                    Create New Support Ticket
                </Button>
            </div>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                    {alertMessage}
                </Alert>
            </Snackbar>
            <Divider flexItem/>
            <div className={'bottom-container'}>
                <Typography
                    style={{marginBottom: 10, fontWeight: '700', textAlign: 'center'}}
                    variant="subtitle1"
                >
                    Support Tickets
                </Typography>
                <TableContainer component={Paper}>
                    <Table size={'small'}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Topic</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Date Created</TableCell>
                                <TableCell>Severity</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Assigned To</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Resolved On</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {supportTickets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((ticket) => (
                                <TableRow key={ticket.assignedTo}>
                                    <TableCell>{ticket.topic}</TableCell>
                                    <TableCell>{ticket.description}</TableCell>
                                    <TableCell>{new Date(ticket.dateCreated).toLocaleDateString()}</TableCell>
                                    <TableCell>{ticket.severity}</TableCell>
                                    <TableCell>{ticket.type}</TableCell>
                                    <TableCell>{ticket.assignedTo}</TableCell>
                                    <TableCell>{ticket.status}</TableCell>
                                    <TableCell>
                                        {ticket.resolvedOn ? new Date(ticket.resolvedOn).toLocaleDateString() : (
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DateTimePicker
                                                    slotProps={{textField: {size: 'small'}}}
                                                    label="Resolved On"
                                                    value={resolvedOn}
                                                    onChange={(date) => setResolvedOn(date)}
                                                    onAccept={() => resolveSupportTicket(ticket._id, ticket.assignedTo)}
                                                />
                                            </LocalizationProvider>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10]}
                    component="div"
                    count={supportAgents.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
        </div>
    )
}

export default SupportTicketPage