import mongoose from "mongoose";
const { Schema } = mongoose;
const cartSchema = new Schema(
  {
    quantity: {
      type: Number,
    },
    // userId: [{ type: mongoose.Types.ObjectId, ref: "User" }],s
    productId: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Cart", cartSchema);
