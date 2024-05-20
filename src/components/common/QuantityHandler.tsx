import { useCart } from "../../hooks/useCart";
import { productType } from "../../utils/types";
import { CustomButton } from "../ui";

const QuantityHandler = ({ product }: { product: productType }) => {
  const { getItem, addToCart, removeFromCart } = useCart();

  const cartItem = getItem(product);
  if (!cartItem)
    return (
      <CustomButton className="mt-6" onClick={() => addToCart(product)}>
        Add to Cart
      </CustomButton>
    );

  return (
    <div className="gap-3 flex items-center justify-between mt-6">
      <CustomButton onClick={() => removeFromCart(product)}>-</CustomButton>
      <span>{cartItem.quantity}</span>
      <CustomButton onClick={() => addToCart(product)}>+</CustomButton>
    </div>
  );
};

export default QuantityHandler;
