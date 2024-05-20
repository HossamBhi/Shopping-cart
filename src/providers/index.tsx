import { PropsWithChildren } from "react";
import { CartProvider } from "./CartProvider";
import ReactQueryProvider from "./ReactQueryProvider";

const Providers = ({ children }: PropsWithChildren) => (
  <ReactQueryProvider>
    <CartProvider>{children}</CartProvider>
  </ReactQueryProvider>
);

export default Providers;
