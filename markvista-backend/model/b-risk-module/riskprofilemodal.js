import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const riskProfileSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  previousrisk: {
    type: Number,
    default: 0,
  },
  currentrisk: {
    type: Number,
    default: 0,
  },
  consecutiveWins: { type: Number, default: 0 }, // Track consecutive wins
  consecutiveLosses: { type: Number, default: 0 }, // Track consecutive losses
  user: {
    type: _Schema.Types.ObjectId,
    ref: "User",
  },
  SLallowedperday: {
    type: Number,
  },
  initialRiskPerTrade: {
    type: Number,
    required: true,
  },
  increaseOnWin: {
    type: Number,
  },
  decreaseOnLoss: {
    type: Number,
  },
  maxRisk: {
    type: Number,
  },
  minRisk: {
    type: Number,
  },
  reset: {
    type: Number,
  },
  growthThreshold: {
    type: Number,
  },
  payoutPercentage: {
    type: Number,
  },
  noofactivetrades: {
    type: Number,
  },
  minRiskRewardRatio: {
    type: Number,
  },
  goals: {
    type: [
      {
        goalType: {
          type: String,
          enum: ["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"],
        },
        goalAmount: { type: Number },
        setAt: { type: Date, default: Date.now },
      },
    ],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  ison: {
    type: Boolean,
    default: false,
  },
  default: {
    type: Boolean,
    default: false,
  },
});

export default model("RiskProfile", riskProfileSchema);
