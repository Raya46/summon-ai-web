"use server";

import nodemailer from "nodemailer";

interface FormDataValues {
  name: string;
  email: string;
  budget: string;
  service: string;
  message: string;
}

export async function sendEmail(formData: FormDataValues) {
  const { name, email, budget, service, message } = formData;

  if (!name || !email || !budget || !service || !message) {
    return { success: false, message: "Missing required fields." };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST || "smtp.gmail.com",
    port: parseInt(process.env.NODEMAILER_PORT || "587"),

    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Summon AI Website Contact" <${process.env.GMAIL_USERNAME}>`,
      to: "muhammadrayaarrizki@gmail.com",
      subject: `New Partnership Inquiry from ${name}`,
      html: `
        <h1>New Partnership Inquiry</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Budget Range:</strong> ${budget}</p>
        <p><strong>Service Interested In:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
      replyTo: email,
    });
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error(error);
  }
}
