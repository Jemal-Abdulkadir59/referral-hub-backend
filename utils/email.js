const nodemailer = require('nodemailer');
const pug = require('pug');
const { convert } = require('html-to-text');
const FormData = require('form-data');
const Mailgun = require('mailgun.js');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `bestFlyer <${process.env.EMAIL_FROM}>`;
  }

  // 1. Create a transporter
  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Initialize Mailgun client
      const mailgun = new Mailgun(FormData);

      return mailgun.client({
        username: 'api',
        key: process.env.MAILGUN_API_KEY,
        // url: 'https://api.mailgun.net', // Use "https://api.eu.mailgun.net" for EU domains
      });
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  //send actual email
  async send(template, subject) {
    // 1. Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html),
    };

    if (process.env.NODE_ENV === 'production') {
      try {
        const response = await this.newTransport().messages.create(
          process.env.MAILGUN_DOMAIN,
          mailOptions,
        );
        console.log(response); // logs response data
      } catch (error) {
        console.log('ERROR...', error); //logs any error
      }
    } else if (process.env.NODE_ENV === 'development') {
      // 3) Create a transport and send email
      await this.newTransport().sendMail(mailOptions);
    }
  }
  async sendWelcome() {
    await this.send('welcome', 'Welcome to the bestFlyer Family!');
  }
  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)',
    );
  }
};
