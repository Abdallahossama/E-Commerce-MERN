import mongoose, { Document, Schema, ObjectId } from "mongoose";
import { Iproduct } from "./productModel";

let cartStatusEnum = ["active", "completed"];

interface IcartItem {
  product: Iproduct;
  unitPrice: number;
  quantity: number;
}
interface Icart extends Document {
  userId: ObjectId;
  items: IcartItem[];
  totalPrice: number;
  status: "active"| "completed";
}

const cartItemSchema = new Schema<IcartItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, default: 1 },
  unitPrice: { type: Number, required: true },
});

const cartSchema = new Schema<Icart>({
  userId: { type: Schema.Types.ObjectId, required: true },
  items: [cartItemSchema],
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: cartStatusEnum, default: "active" },
});

const cartModel = mongoose.model("Cart", cartSchema);

export default cartModel;
