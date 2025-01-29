import mongoose, { Schema, Document } from "mongoose";

export interface IorderItem {
  productTitle: string;
  productImage: string;
  unitPrice: number;
  quantity: number;
}
interface Iorder extends Document {
  orderItems: IorderItem[];
  totalPrice: number;
  address: string;
}

const orderItemSchema = new Schema<IorderItem>({
  productTitle: { type: String, required: true },
  productImage: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = new Schema<Iorder>({
  orderItems: [orderItemSchema],
  totalPrice: { type: Number, required: true },
  address: { type: String, required: true },
});

const orderModel = mongoose.model<Iorder>("Order", orderSchema);

export default orderModel;
