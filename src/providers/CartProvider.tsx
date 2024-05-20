import { PropsWithChildren, createContext, useState } from "react";
import { productType } from "../utils/types";

type cartType = {
  product: productType;
  quantity: number;
};

type cartContextType = {
  getItem: (product: productType) => cartType | null;
  addToCart: (product: productType) => void;
  removeFromCart: (product: productType) => void;
  getItemCount: () => number;
  cartItems: cartType[];
};

export const CartContext = createContext<cartContextType>(
  {} as cartContextType
);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<cartType[]>([]);

  const getItem = (product: productType) => {
    const index = cartItems.findIndex((item) => item.product.id === product.id);
    return index !== -1 ? cartItems[index] : null;
  };

  const addToCart = (product: productType) => {
    const item = getItem(product);

    if (item) {
      // If the product is already in the cart, update its quantity
      setCartItems(
        cartItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      setCartItems([...cartItems, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product: productType) => {
    const item = getItem(product);
    if (!item) return;

    if (item.quantity > 1) {
      setCartItems(
        cartItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } else
      setCartItems(cartItems.filter((item) => item.product.id !== product.id));
  };

  const getItemCount = () =>
    cartItems.reduce((total, product) => total + product.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        getItem,
        addToCart,
        removeFromCart,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
