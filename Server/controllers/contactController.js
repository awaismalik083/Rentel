import express from "express";
import ContactModel from "../models/ContactModel.js";

const saveContact = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, subject, message } = req.body;

    if (!email || !message || !firstName) {
      return res.status(400).json({ error: "Required fields are missing." });
    }

    const newMessage = new ContactModel({
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
    });

    await newMessage.save();

    res.status(200).json({ message: "Message received!" });
  } catch (err) {
    console.error("Contact form error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export default saveContact;
