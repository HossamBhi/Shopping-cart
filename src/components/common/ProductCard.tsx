import { productType } from "../../utils/types";
import { QuantityHandler } from "../common";

const ProductCard = ({ product }: { product: productType }) => (
  <div data-testid="product" className="flex flex-col rounded-sm bg-background-card p-5">
    <img
      alt={product.title}
      src={product.thumbnail}
      className="h-[160px] w-[100%] object-contain"
    />
    <div className="flex justify-between pt-2">
      <h3 className="text-md font-bold">{product.title}</h3>
      <p role="price">£{product.price.toFixed(2)}</p>
    </div>
    <p className="truncate text-sm opacity-50">{product.description}</p>
    <QuantityHandler product={product} />
  </div>
);
export default ProductCard;
