import nodemailer from 'nodemailer'

export const sendEmail =  async (custEmail, orderId) => {
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'topupkuymailservice@gmail.com',
          pass: process.env.emailPassword
        }
      });

      var mailOptions = {
        from: 'topupkuymailservice@gmail.com',
        to: custEmail,
        subject: `Order ID : ${orderId}`,
        text: `Thanks for your order ! your order id is ${orderId}`
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}
