import "@/styles/globals.css";
import { ProductProvider } from "@/components/Product/ProductContext";
import Header from "@/components/Header/Header";

export default function App({ Component, pageProps }) {
  return (
    <ProductProvider>
      <Header />
      <Component {...pageProps} />
    </ProductProvider>
  );
}
