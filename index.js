const express = require('express')
const nodemailer = require("nodemailer");
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()
const port = 3010

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: "gmail",
    // host: "smtp.ethereal.email",
    port: 465,
    secure: true, // true for 465, false for other ports
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: "serg.ks@gmail.com", // generated ethereal user
        pass: "your psswd", // generated ethereal password
    },
});

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

app.post('/sendmessage', async (req, res) => {
    let {name, email, subj, message} = req.body


    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: "testSender", // sender address
        to: "serg.ks@gmail.com", // list of receivers
        subject: "From my site: " + subj, // Subject line
        text: "Hello world?", // plain text body
        html: `<div>
                    <h1>From my site</h1>
                    <h2><strong>Name:</strong> ${name? name : ""}</h2>
                    <h2><strong>Email:</strong> ${email? email : ""}</h2>
                    <h3><strong>Message:</strong> ${message? message: ""}</h3>
                </div>`, // html body
    });
    res.send('Sanded!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})