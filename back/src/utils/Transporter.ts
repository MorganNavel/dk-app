import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export class Transporter {
  private static instance: Transporter | null;
  private static transporter: any;
  private constructor() {
    if (!Transporter.instance) {
      Transporter.instance = this;
    }
  }

  private createTransporter() {
    Transporter.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
    return Transporter.transporter;
  }
  static getTransporter() {
    if (!Transporter.instance) {
      Transporter.instance = new Transporter();
      return Transporter.instance.createTransporter();
    }
    return Transporter.transporter;
  }
}
