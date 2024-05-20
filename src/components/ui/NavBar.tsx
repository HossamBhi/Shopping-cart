import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "../../assets/svg";
import { useCart } from "../../hooks/useCart";

const NavBar = () => {
  const { getItemCount } = useCart();

  return (
    <nav className="mx-auto max-w-5xl bg-background-card px-4 py-4">
      <header className="flex justify-between">
        <Link to={"/"}>
          <img src="/vite.svg" className="h-12 w-12" alt="Shopping cart logo" />
        </Link>
        <Link
          to={"cart"}
          aria-label="Go to cart"
          className="relative flex h-12 w-12 items-center justify-center rounded-sm bg-background px-2"
        >
          <span className="absolute -left-[5px] -top-2 rounded-full bg-background-card px-[5px] text-sm">
            {getItemCount()}
          </span>
          <ShoppingCartIcon className="h-6 w-6" />
        </Link>
      </header>
    </nav>
  );
};

export default NavBar;
