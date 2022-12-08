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
        pass: "zajuuolomdisyagh", // generated ethereal password
    },
});

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/SendMessage', (req, res) => {

    let {name, email, subj, message} = req.body
    res.send('Hello World!')

    // send mail with defined transport object
    let info =  transporter.sendMail({
        from: "testSender", // sender address
        to: "serg.ks@gmail.com", // list of receivers
        subject: subj, // Subject line
        text: "Hello world?", // plain text body
        html: `<div><h1>Hello world?</h1><h3>${name}</h3><h3>${email}</h3><p>${message}</p></div>`, // html body
    });

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})