import React from "react";
import {Link} from "react-router-dom";
import {Divider} from "@mui/material";

const Header = () => {
    return (
        <>
            <div style={{
                padding: "10px",
                backgroundColor: "#f0f0f0",
                height: '5vh',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <label style={{fontSize: '24px', fontWeight: '700'}}>Support Entry Ticket System</label>
                    <span style={{margin: "0 10px"}}>|</span>
                    <label style={{fontSize: '20px'}}>by Sahan Mondal</label>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <Link to="/">Support Agents</Link>
                    <span style={{margin: "0 10px"}}>|</span>
                    <Link to="/support-ticket">Support Tickets</Link>
                </div>
            </div>
            <Divider flexItem/>
        </>
    )
}

export default Header