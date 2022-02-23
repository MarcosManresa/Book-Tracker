const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TransfictionSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Enter a name for transaction"
    },
    value: {
      type: Number,
      required: "Enter an amount"
    },
    date: {
      type: Date,
      default: Date.now
    }
  }
);

const Transfiction = mongoose.model("Transaction", TransfictionSchema);

module.exports = Transfiction;
