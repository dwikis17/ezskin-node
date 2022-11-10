import nodemailer from 'nodemailer'

export const sendEmail =  async (custEmail, orderId) => {
    console.log(custEmail, 'email')
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'ezskinemailservice@gmail.com',
          pass: process.env.emailPassword
        }
      });

      var mailOptions = {
        from: 'ezskinemailservice@gmail.com',
        to: custEmail,
        subject: `Order ID : ${orderId}`,
        text: `Terimakasih sudah berbelanja !! silakan melanjutkan ke pembayaran untuk order id ${orderId}`
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}