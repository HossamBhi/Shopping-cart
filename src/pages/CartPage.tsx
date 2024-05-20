import { useMemo } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/cart/ProductCard";
import { useCart } from "../hooks/useCart";

const CartPage = () => {
  const { cartItems } = useCart();

  const calculatePrice = useMemo(
    () =>
      cartItems
        .reduce((prev, curr) => prev + curr.product.price * curr.quantity, 0)
        .toFixed(2),
    [cartItems]
  );

  const renderProducts = () => {
    if (cartItems!.length === 0)
      return (
        <div className="flex flex-col justify-center items-center gap-5 pt-[20vh]">
          <p className="text-center">No product was found!</p>
          <Link
            to={"/"}
            className="w-fit border-primary border-[2px] px-4 py-2 rounded-sm"
          >
            Explore Now
          </Link>
        </div>
      );

    return (
      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-4 py-4 xl:grid-cols-3 pb-12">
        {cartItems?.map(({ product }) => (
          <ProductCard product={product} key={product.id} />
        ))}
        <div className="fixed bottom-0 bg-background-card w-full max-w-5xl p-4 ">
          <p>
            Total:&nbsp;
            <strong>£{calculatePrice}</strong>
          </p>
        </div>
      </section>
    );
  };

  return <main>{renderProducts()}</main>;
};

export default CartPage;
