import React, {useEffect, useState} from "react";
import "./styles.css";
import {
    Alert,
    Button,
    Divider,
    Paper,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import {validateSupportAgentForm} from "../../utils/formValidation";
import axios from "axios";

const SupportAgentPage = () => {

    let validationResults = {}

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [loading, setLoading] = useState(false)
    const [description, setDescription] = useState("")
    const [open, setOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [supportAgents, setSupportAgents] = useState([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const handleCreateNewSupportAgent = async () => {
        validationResults = validateSupportAgentForm(email, name, phone, description)
        if (Object.keys(validationResults).length > 0) {
            if (validationResults.email) {
                setAlertMessage(validationResults.email)
            } else if (validationResults.name) {
                setAlertMessage(validationResults.name)
            } else if (validationResults.phone) {
                setAlertMessage(validationResults.phone)
            } else if (validationResults.description) {
                setAlertMessage(validationResults.description)
            }
        } else {
            try {
                setLoading(true)
                const requestBody = {
                    email: email,
                    name: name,
                    phone: phone,
                    description: description
                }
                await axios.post(`http://localhost:8008/api/support-agents`, requestBody)
                    .then((response) => {
                        setEmail("")
                        setName("")
                        setPhone("")
                        setDescription("")
                        setOpen(true)
                        fetchAllSupportAgents()
                    })
                    .catch((e) => {
                        console.error(e)
                        setAlertMessage(e.response.data.message)
                    })
            } catch (e) {
                console.error(e)
                setAlertMessage(e.response.data.message)
            } finally {
                setLoading(false)
            }
        }
    }

    const fetchAllSupportAgents = async () => {
        try {
            await axios.get(`http://localhost:8008/api/support-agents`)
                .then((response) => setSupportAgents(response.data.supportAgents))
                .catch((e) => console.error(e))
        } catch (e) {
            console.error(e)
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
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    useEffect(() => {
        fetchAllSupportAgents()
    }, [])

    return (
        <div className={'agent-page-container'}>
            <div className={'top-bar'}>
                <div className={'inputs-container'}>
                    <TextField
                        style={{marginBottom: 20, width: '320px'}}
                        label="Email"
                        variant="outlined"
                        size="small"
                        value={email}
                        onChange={(event) => {
                            setAlertMessage("")
                            setEmail(event.target.value)
                        }}
                    />
                    <TextField
                        style={{width: '320px'}}
                        label="Name"
                        variant="outlined"
                        size="small"
                        value={name}
                        onChange={(event) => {
                            setAlertMessage("")
                            setName(event.target.value)
                        }}
                    />
                </div>
                <div className={'inputs-container'}>
                    <TextField
                        style={{marginBottom: 20, width: '320px'}}
                        className="textField"
                        label="Phone"
                        variant="outlined"
                        size="small"
                        value={phone}
                        onChange={(event) => {
                            setAlertMessage("")
                            setPhone(event.target.value)
                        }}
                    />
                    <TextField
                        style={{width: '320px'}}
                        className="textField"
                        label="Description"
                        variant="outlined"
                        size="small"
                        value={description}
                        onChange={(event) => {
                            setAlertMessage("")
                            setDescription(event.target.value)
                        }}
                    />
                </div>
                <div className={'inputs-container'}>
                    <Button
                        style={{width: '320px', height: '38px'}}
                        variant="contained"
                        color="primary"
                        size="small"
                        disabled={loading || (name.trim() === "" || email.trim() === "" || phone.trim() === "" || description.trim() === "")}
                        onClick={() => handleCreateNewSupportAgent()}
                    >
                        Create new Support Agent
                    </Button>
                    {alertMessage !== "" && (
                        <Alert
                            style={{marginTop: 20, width: '300px'}}
                            severity="error"
                        >
                            {alertMessage}
                        </Alert>
                    )}
                </div>
                <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                        New support agent added!
                    </Alert>
                </Snackbar>
            </div>
            <Divider flexItem/>
            <div className={'bottom-container'}>
                <Typography
                    style={{marginBottom: 10, fontWeight: '700', textAlign: 'center'}}
                    variant="subtitle1"
                >
                    Support Agents
                </Typography>
                <TableContainer component={Paper}>
                    <Table size={'small'}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Email</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Active</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {supportAgents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((agent) => (
                                <TableRow key={agent.email}>
                                    <TableCell>{agent.email}</TableCell>
                                    <TableCell>{agent.name}</TableCell>
                                    <TableCell>{agent.phone}</TableCell>
                                    <TableCell>{agent.description}</TableCell>
                                    <TableCell>{agent.active ? "Yes" : "No"}</TableCell>
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

export default SupportAgentPage