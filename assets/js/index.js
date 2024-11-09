const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (HTML form)
app.use(express.static('public'));

// POST route to handle form submission
app.post('/contact-form', (req, res) => {
    const { name, surname, email, subject, message } = req.body;

    // Create Nodemailer transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // Replace with your Gmail email
            pass: 'your-email-password'   // Replace with your Gmail password or app-specific password
        }
    });

    // Set up email data
    let mailOptions = {
        from: email,
        to: 'your-email@gmail.com',      // The email address you want to receive messages at
        subject: subject || 'New Contact Form Submission',
        text: `You have a new message from ${name} ${surname} (${email}):\n\n${message}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        res.send('Success: Your message has been sent!');
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
