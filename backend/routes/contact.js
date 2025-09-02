const express = require("express");
const Contact = require("../models/Contact");
const { authenticateToken, requireAdmin } = require("../middleware/auth");
const nodemailer = require("nodemailer");

const router = express.Router();

// ✅ Email transporter (fixed createTransport)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Submit contact form
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Save to DB
    const contact = new Contact({
      name,
      email,
      subject,
      message,
      ipAddress: req.ip,
      userAgent: req.get("User-Agent"),
    });

    await contact.save();

    // Send email notification to admin
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || "arun@example.com",
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3B82F6; border-bottom: 2px solid #3B82F6; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          <div style="background: white; padding: 20px; border-radius: 10px; border-left: 4px solid #3B82F6;">
            <h3>Message:</h3>
            <p style="line-height: 1.6;">${message}</p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            Received on ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Send auto-reply
    const autoReply = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Thanks for reaching out, ${name}!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3B82F6;">Thank you for your message!</h2>
          <p>Hi ${name},</p>
          <p>Thank you for reaching out through my portfolio. I've received your message and will get back to you within 24 hours.</p>
          <div style="background: #f8fafc; padding: 15px; border-radius: 10px; margin: 20px 0;">
            <p><strong>Your message:</strong></p>
            <p style="font-style: italic;">"${message}"</p>
          </div>
          <p>Best regards,<br>Arun Kumar</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            This is an automated response. Please don't reply to this email.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(autoReply);

    res.json({
      message: "Message sent successfully! I'll get back to you soon.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    res
      .status(500)
      .json({ message: "Failed to send message. Please try again." });
  }
});

// ✅ Get all contacts (Admin only)
router.get("/", authenticateToken, requireAdmin, async (req, res) => {
  try {
    let { status, page = 1, limit = 10 } = req.query;

    page = Number(page);
    limit = Number(limit);

    let filter = {};
    if (status && status !== "all") filter.status = status;

    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    const total = await Contact.countDocuments(filter);

    res.json({
      contacts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    console.error("Get contacts error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Update contact status (Admin only)
router.put("/:id/status", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        status,
        ...(status === "replied" && {
          responded: true,
          responseDate: new Date(),
        }),
      },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json(contact);
  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
