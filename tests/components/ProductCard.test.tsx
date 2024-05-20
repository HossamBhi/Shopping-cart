import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { productType } from "../../src/utils/types";
import { ProductCard } from "../../src/components/common";
import { CartProvider } from "../../src/providers/CartProvider";

describe("ProductCard", () => {
  it("Should render product", () => {
    const product: productType = {
      id: 1,
      title: "iPhone",
      price: 300,
      thumbnail: "url",
      description: "iphone description",
    };
    render(
      <CartProvider>
        <ProductCard product={product} />
      </CartProvider>
    );
    expect(screen.getByRole("img")).toHaveAttribute("alt", product.title);
    expect(screen.getByRole("price")).toHaveTextContent(
      `£${product.price.toFixed(2)}`
    );
    expect(screen.getByRole("heading")).toHaveTextContent(product.title);
    expect(screen.getByText(product.description)).toHaveTextContent(
      product.description
    );
  });
});
