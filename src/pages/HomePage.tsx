import axios from "axios";
import { useQuery } from "react-query";
import ProductCard from "../components/home/ProductCard";
import { LogoLoader } from "../components/ui";
import { productType } from "../utils/types";

const HomePage = () => {
  const { data: products, isLoading, error } = useProducts();

  const renderProducts = () => {
    if (isLoading) return <LogoLoader />;

    if (error) return <div>Error: {error.message}</div>;

    if (products!.length === 0) return <p>No product was found!</p>;

    return (
      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-4 py-4 xl:grid-cols-3">
        {products?.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </section>
    );
  };

  return <main>{renderProducts()}</main>;
};

const useProducts = () =>
  useQuery<productType[], Error>({
    queryKey: ["products"],
    queryFn: () => axios.get("products").then((res) => res.data?.products),
  });

export default HomePage;
