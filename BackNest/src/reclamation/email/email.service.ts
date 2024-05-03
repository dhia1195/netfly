/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'aziz1.jellazi@gmail.com',
          pass: 'rrmg bcvp nfbi xiln',
        },
      });

      const mailOptions = {
        from: 'aziz1.jellazi@gmail.com',
        to,
        subject,
        text,
      };

      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
