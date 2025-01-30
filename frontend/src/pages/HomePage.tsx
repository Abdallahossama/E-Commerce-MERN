import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { IProduct } from "../types/Product";
import { BASE_URL } from "../constants/baseUrl";

function HomePage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/products`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };
    fetchData();
  }, []);
  if (error) {
    return (
      <h3 style={{ color: "black" }}>
        Somthing went wrong while fetching Data!
      </h3>
    );
  }
  return (
    <Container sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item sm={4}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default HomePage;
