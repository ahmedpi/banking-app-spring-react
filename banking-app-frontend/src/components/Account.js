import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';

export default function Account() {
    const paperStyle = {
        padding: '10px 20px',
        width: 600,
        margin: "20px auto"
    }
    const [accountHolderName, setAccountHolderName] = useState(undefined)
    const [balance, setBalance] = useState(0)
    const [accounts, setAccounts] = useState([])
    const [success, setSuccess] = useState(false)
    const [successMessage,setSuccessMessage] = useState('')
    const [errorMessage,setErrorMessage] = useState('')

    const account = {
        accountHolderName: accountHolderName,
        balance: balance
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        console.log(JSON.stringify(account))
        setSuccess(false)
        setSuccessMessage('')
        setErrorMessage('')

        if (e.target.checkValidity()) {
            fetch(
                "http://localhost:8080/api/accounts",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(account)
                }).then(() => {
                    setSuccess(true)
                    setSuccessMessage('New account created successfully!')
                    console.log("New Account created")
                })
        } else {
            setSuccess(false);
            setErrorMessage("Form is invalid! Please check the required fields");
        }
    }

    useEffect(() => {
        fetch("http://localhost:8080/api/accounts")
            .then(res => res.json())
            .then((result) => {
                setAccounts(result)
            })
    })

    return (
        <Container>
            <Paper elevator={3} style={paperStyle}>
                <h1 style={{ color: "blue" }}><u>Create Account</u></h1>
                <Box
                    component="form" onSubmit={handleSubmitClick}
                   // sx={{
                   //     '& > :not(style)': { m: 1, width: '25ch' },
                    //}}
                    noValidate
                    autoComplete="off"
                >
                    <TextField error id="outlined-basic" label="Account Holder Name" variant="outlined" required fullWidth value={accountHolderName} onChange={(e) => setAccountHolderName(e.target.value)} />
                    <TextField error id="outlined-basic" label="Balance" variant="outlined" required  fullWidth margin="normal" 
                        value={balance} onChange={(e) => setBalance(e.target.value)} />
                        {success ? 
                        <h4 style={{textAlign: "center", color:"green"}}>{successMessage}</h4>
                        :  <h4 style={{textAlign: "center", color:"red"}}>{errorMessage}</h4> }
                    <Button  variant="contained" type="submit">Submit</Button>

                </Box>
            </Paper>
            <h1>Accounts</h1>
            <Paper elevation={3} style={paperStyle}>
                {accounts.map(account => (
                    <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={account.id}>
                        Id: {account.id} <br />
                        Name: {account.accountHolderName}  <br />
                        Balance: {account.balance}
                    </Paper>
                ))
                }
            </Paper>
        </Container>
    );
}
