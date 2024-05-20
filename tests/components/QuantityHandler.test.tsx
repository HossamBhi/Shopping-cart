import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { productType } from "../../src/utils/types";
import { CartProvider } from "../../src/providers/CartProvider";
import { QuantityHandler } from "../../src/components/common";

describe("QuantityHandler", () => {
  const renderComponent = () => {
    const product: productType = {
      id: 1,
      title: "Phone",
      price: 500,
      thumbnail: "url",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio debitis dolores laboriosam tempora ducimus natus doloremque aspernatur dignissimos, itaque quod expedita tenetur sequi est tempore nemo. Ad, quas perspiciatis. Nostrum, dolorum praesentium incidunt mollitia exercitationem, expedita aliquam accusamus quibusdam perspiciatis animi explicabo quis reiciendis ea et quidem debitis. Nam, ad.",
    };

    render(
      <CartProvider>
        <QuantityHandler product={product} />
      </CartProvider>
    );

    const getAddToCartButton = () =>
      screen.queryByRole("button", {
        name: /add to cart/i,
      });

    const getQuantityControls = () => ({
      quantity: screen.queryByRole("quantity"),
      decrementButton: screen.queryByRole("button", {
        name: "-",
      }),
      incrementButton: screen.queryByRole("button", {
        name: "+",
      }),
    });

    const user = userEvent.setup();

    const addToCart = async () => {
      const button = getAddToCartButton();
      await user.click(button!);
    };

    const incrementQuantity = async () => {
      const { incrementButton } = getQuantityControls();
      await user.click(incrementButton!);
    };

    const decrementQuantity = async () => {
      const { decrementButton } = getQuantityControls();
      await user.click(decrementButton!);
    };

    return {
      getAddToCartButton,
      getQuantityControls,
      addToCart,
      incrementQuantity,
      decrementQuantity,
    };
  };

  it("should render the Add to Cart button", () => {
    const { getAddToCartButton } = renderComponent();

    expect(getAddToCartButton()).toBeInTheDocument();
  });

  it("should add the product to the cart", async () => {
    const { getAddToCartButton, addToCart, getQuantityControls } =
      renderComponent();

    await addToCart();
    screen.debug();
    const { quantity, incrementButton, decrementButton } =
      getQuantityControls();
    expect(quantity).toHaveTextContent("1");
    expect(decrementButton).toBeInTheDocument();
    expect(incrementButton).toBeInTheDocument();
    expect(getAddToCartButton()).not.toBeInTheDocument();
  });

  it("increment the quantity", async () => {
    const { incrementQuantity, addToCart, getQuantityControls } =
      renderComponent();
    await addToCart();

    await incrementQuantity();

    const { quantity } = getQuantityControls();
    expect(quantity).toHaveTextContent("2");
  });

  it("decrement the quantity", async () => {
    const {
      incrementQuantity,
      decrementQuantity,
      addToCart,
      getQuantityControls,
    } = renderComponent();
    await addToCart();
    await incrementQuantity();

    await decrementQuantity();

    const { quantity } = getQuantityControls();
    expect(quantity).toHaveTextContent("1");
  });

  it("should remove the product from the cart", async () => {
    const {
      getAddToCartButton,
      decrementQuantity,
      addToCart,
      getQuantityControls,
    } = renderComponent();
    await addToCart();

    await decrementQuantity();

    const { incrementButton, decrementButton, quantity } =
      getQuantityControls();
    expect(quantity).not.toBeInTheDocument();
    expect(decrementButton).not.toBeInTheDocument();
    expect(incrementButton).not.toBeInTheDocument();
    expect(getAddToCartButton()).toBeInTheDocument();
  });
});
