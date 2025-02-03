const nodemailer=require('nodemailer');

console.log(nodemailer);

exports.handler=async function(event,context){

    const transporter = nodemailer.createTransport({
        service: 'gmail',  // Using Gmail SMTP service
        auth: {
            user: 'zubinchadha@gmail.com',  // Your Gmail email address
            pass: 'jydcahsvmthpnmiy'  // Use your app password here if using 2FA
        }
    });

    // Email setup
    const mailOptions = {
        from: process.env.GMAIL_USER,  // Sender email (your Gmail address)
        to: 'zubinchadha@gmail.com',  // Replace with your recipient's email address
        subject: `New message from ${name}`,
        text: `You have received a message from ${name} (${email})`,
        html: `<p>You have received a message from <strong>${name}</strong> (${email})</p>`
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: `Email sent successfully to ${email}` }),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to send email', error: error.message }),
        };
    }
}