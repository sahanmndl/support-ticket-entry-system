import React from "react";
import SupportAgentPage from "./pages/SupportAgentPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import SupportTicketPage from "./pages/SupportTicketPage";

function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<SupportAgentPage/>}/>
                <Route path="/support-ticket" element={<SupportTicketPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
