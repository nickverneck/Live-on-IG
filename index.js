const express = require('express');
const { spawn } = require('child_process');
const app = express();
const port = 3000;

app.get('/', (req, res) => {

    var dataToSend;
    // calling script
    const python = spawn('python', ['test.py']);
    // getting data from script
    python.stdout.on('data', function (data) {
        console.log("getting data from script");
        dataToSend = data.toString();

    });

    python.on('close', (code) =>{
        console.log("closing script with code : ${code}");
        res.send(dataToSend)
    });
})
app.listen(port, () => console.log ("listening to port: ${port}"))