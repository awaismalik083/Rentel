import express from "express";
import saveContact from "../controllers/contactController.js";

const ContactRoute = express.Router();
{
  /*http://localhost:3000/api/contact/form */
}
ContactRoute.post("/form", saveContact);

export default ContactRoute;
