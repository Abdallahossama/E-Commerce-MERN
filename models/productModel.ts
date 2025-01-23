import mongoose, { Document, Schema } from "mongoose";

interface Iproduct extends Document {
  title: string;
  image: string;
  price: number;
  stock: number;
}

const productSchema = new Schema<Iproduct>({
  price: { type: Number, required: true },
  image: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
  title: { type: String, required: true },
});

const productModule = mongoose.model<Iproduct>("product", productSchema);

export default productModule;
