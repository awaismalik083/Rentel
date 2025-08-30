import express from "express";
import authMiddleware from "../middlewares/auth.js";
import sellerController from "../controllers/sellerController.js";

const sellerRoute = express.Router();
// Seller routes
{
  /*http://localhost:3000/api/seller/createseller */
}
sellerRoute.post(
  "/createseller",
  authMiddleware,
  sellerController.createSeller
);
{
  /*http://localhost:3000/api/seller/:id */
}
sellerRoute.get("/:id", sellerController.getSellerId); // ✅ fixed
{
  /*http://localhost:3000/api/seller/updateseller */
}
sellerRoute.post(
  "/updateseller",
  authMiddleware,
  sellerController.updateSeller
);
{/*http://localhost:3000/api/seller/deletseller */}
sellerRoute.post("/deleteseller",  authMiddleware,sellerController.deleteSeller);
export default sellerRoute;
