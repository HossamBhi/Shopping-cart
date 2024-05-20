import { render, screen } from "@testing-library/react";
import { delay, http, HttpResponse } from "msw";
import React from "react";
import { describe, expect, it } from "vitest";
import HomePage from "../../src/pages/HomePage";
import AllProviders from "../AllProviders";
import { server } from "../mocks/server";

describe("HomePage", () => {
  it("should render products", async () => {
    render(<HomePage />, { wrapper: AllProviders });

    const items = await screen.findAllByTestId("product");
    expect(items?.length).toBeGreaterThan(0);
  });

  it("should render a loading indicator when fetching data", async () => {
    server.use(
      http.get("/products", async () => {
        await delay();
        return HttpResponse.json([]);
      })
    );

    render(<HomePage />, { wrapper: AllProviders });

    expect(await screen.findByTestId("logoLoader")).toBeInTheDocument();
  });

  it("should render no products available if no product is found", async () => {});
  it("should render an error message when there is an error", async () => {});
  it("should remove the loading indicator after data is fetched", async () => {});
  it("should remove the loading indicator if data fetching fails", async () => {});
});
