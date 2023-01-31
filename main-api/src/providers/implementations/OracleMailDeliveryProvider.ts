import { IMail, IMailDeliveryProvider } from "@providers/IMailDeliveryProvider";
import {
  MAIL_FROM_ADDRESS,
  MAIL_FROM_NAME,
  MAIL_HOST,
  MAIL_MOCK,
  MAIL_PASSWORD,
  MAIL_PORT,
  MAIL_USERNAME,
} from "@main/config/environment";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export class OracleMailDeliveryProvider implements IMailDeliveryProvider {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      port: MAIL_PORT,
      secure: false,
      requireTLS: true,
      tls: {
        rejectUnauthorized: true,
        minVersion: "TLSv1.2",
      },
      auth: {
        user: MAIL_USERNAME,
        pass: MAIL_PASSWORD,
      },
    });
  }
  async sendMail(mail: IMail): Promise<void> {
    await this.transporter.sendMail(
      {
        to: {
          name: MAIL_MOCK ?? mail.to.name,
          address: mail.to.email,
        },
        from: {
          name: MAIL_FROM_NAME,
          address: MAIL_FROM_ADDRESS,
        },
        subject: mail.subject,
        html: `<p>Olá ${mail.body.name}, clique aqui para validar seu email: <a href="${mail.body.url}" target="_blank">${mail.body.url}</a></p>`,
      },
      (err, info) => {
        if (err) {
          console.error(err, info);
          throw new Error(err.message || err.name || "unexpected mail error");
        }
      }
    );
  }
}
