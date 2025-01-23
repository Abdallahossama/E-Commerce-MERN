import productModule from "../models/productModel";

export const getAllProducts = async () => {
  const products = await productModule.find();
  if (!products) return { data: "sonmthing went wrong!", status: 400 };
  return { data: products, status: 200 };
};

export const seedInitialProducts = async () => {
  const dummyProducts = [
    {
      title: "HP Laptop",
      price: 500,
      image:
        "https://cairosales.com/54218-large_default/hp-laptop-156-intel-pentium-n5030-ram-4gb-1tb-black-hp-250-g7.jpg",
      stock: 4,
    },
  ];
  const products = await productModule.find();
  if (products.length === 0) {
     await productModule.insertMany(dummyProducts);
  }
};
