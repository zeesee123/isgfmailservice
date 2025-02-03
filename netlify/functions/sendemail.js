const nodemailer=require('nodemailer');

console.log(nodemailer);

exports.handler=async function(event,context){


    if (event.httpMethod !== 'POST') {
        
        return {
            statusCode: 405, // Method Not Allowed
            body: JSON.stringify({ message: 'Only POST method is allowed' })
        };
    }

    // Parse the request body (it will be a JSON object)
    const requestBody = JSON.parse(event.body);
    const { name,comment,link } = requestBody;

    const transporter = nodemailer.createTransport({
        service: 'gmail',  // Using Gmail SMTP service
        auth: {
            user: 'zubinchadha@gmail.com',  // Your Gmail email address
            pass: 'jydcahsvmthpnmiy'  // Use your app password here if using 2FA
        }
    });

    // Email setup
    const mailOptions = {
        from: 'zubinchadha@gmail.com',  // Sender email (your Gmail address)
        to: 'zubinchadha@gmail.com',  // Replace with your recipient's email address
        subject: `New message from ${name}`,
        text: `You have received a message from alan email with comment: ${comment}`,
        html: `<p>You have received a message from <strong>gibson</strong> teamwork</p><p>below is the link for the file</p><a href='${link}'>Link</a>`
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: `Email sent successfully to zubinchadha@gmail.com` }),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to send email', error: error.message }),
        };
    }
}