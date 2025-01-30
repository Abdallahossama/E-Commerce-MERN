import productModule from "../models/productModel";

export const getAllProducts = async () => {
  try {
    const products = await productModule.find();
    if (!products) return { data: "sonmthing went wrong!", status: 400 };
    return { data: products, status: 200 };
  } catch (err) {
    return { data: err, status: 400 };
  }
};

export const seedInitialProducts = async () => {
  try {
    const dummyProducts = [
      {
        title: "HP Laptop",
        price: 1500,
        image:
          "https://cairosales.com/54218-large_default/hp-laptop-156-intel-pentium-n5030-ram-4gb-1tb-black-hp-250-g7.jpg",
        stock: 14,
      },
      {
        title: "Dell Laptop",
        price: 500,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr4z25mt_FvP45tXp7tTUS2GaTM5eeO6eSNA&s",
        stock: 4,
      },
      {
        title: "LG Laptop",
        price: 5500,
        image:
          "https://www.technoworld.com/media/catalog/product/cache/941012141e93b216d64d157444571b98/1/7/17z90r-k.ad78a1_1.jpg",
        stock: 6,
      },
    ];
    const products = await productModule.find();
    if (products.length === 0) {
      await productModule.insertMany(dummyProducts);
    }
  } catch (err) {
    console.error(err);
  }
};
