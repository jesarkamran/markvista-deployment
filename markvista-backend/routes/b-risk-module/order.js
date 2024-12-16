import { Router } from "express";

import OrderController from "../../controller/b-risk-module/order.js";
import { protect } from "../../controller/a-profile-module/authController.js";

const orderRouter = Router();

// Order Management Routes
orderRouter.post("/place-order", OrderController.placeOrder); // Place a new order
orderRouter.post(
  "/place-order-risk-profile",
  OrderController.placeOrderWithRiskProfile
); // Place order with risk profile
orderRouter.get("/order-list", OrderController.getOrderListf); // Get pending orders
orderRouter.post("/cancel-order", OrderController.cancelOrder); // Cancel an existing order
orderRouter.post("/ammend-order", OrderController.ammendOrder); // Amend an order

// Position Management Routes
orderRouter.get("/active-positions", OrderController.getPositionInfof); // Get active positions
orderRouter.post("/set-leverage", OrderController.setLeverage); // Set leverage for trading
orderRouter.post("/switch-margin-mode", OrderController.switchMarginMode); // Switch margin mode

// Trade History and Risk Management Routes
orderRouter.get("/closed-pnl", OrderController.getClosedPnlf); // Get closed PnL for trade history

orderRouter.get("/showusdtbalance", OrderController.showusdtbalance);
// Account Management Routes
orderRouter.get("/account-balance", OrderController.getAccountBalance); // Get account balance details
orderRouter.get("/coin-balance", OrderController.getCoinBalance); // Get balance of all coins
orderRouter.get(
  "/single-coin-balance/:coin",
  OrderController.getSingleCoinBalance
); // Get balance of a specific coin
orderRouter.get("/transaction-log", OrderController.gettransactionlog);

export default orderRouter;
