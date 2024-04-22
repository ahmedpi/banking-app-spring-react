import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';

export default function Account() {
    const paperStyle ={
        padding: '50px 20px',
        width:600,
        margin:"20px auto"
    }
    const [accountHolderName, setAccountHolderName] = useState('')
    const [balance, setBalance] = useState(0)
    
    const handleSubmitClick = (e) => {
        e.preventDefault();
        console.log(JSON.stringify({accountHolderName: accountHolderName, balance: balance}))

        fetch(
            "http://localhost:8080/api/accounts",
            {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({accountHolderName: accountHolderName, balance: balance})
            }).then(() => {
                console.log("New Account created")
            })
    }

  return (
    <Container>
        <Paper elevator={3} style={paperStyle}>
            <h1 style={{color: "blue"}}><u>Create Account</u></h1>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Account Holder Name" variant="outlined" fullWidth value={accountHolderName} onChange={(e)=> setAccountHolderName(e.target.value)}/>
      <TextField id="outlined-basic" label="Balance" variant="outlined" fullWidth 
      value={balance} onChange={(e)=> setBalance(e.target.value)}/>

    <Button variant="contained" onClick={handleSubmitClick}>Submit</Button>

    </Box>

    {accountHolderName}
    {balance}
    </Paper>
    </Container>
  );
}
