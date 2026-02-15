import { useRouter } from "next/router";
import React from "react";
import { useProducts } from "../Product/ProductContext";

const Header = () => {
  const router = useRouter();
  const { favorites } = useProducts();
  return (
    <div className="header justify-between">
      <div>Vrushti's Spry Mart</div>
      <div>
        <div className="favorites" onClick={() => router.push("/favorites")}>
          ❤️ Favorites ({Object.values(favorites).filter(Boolean).length})
        </div>
      </div>
    </div>
  );
};

export default Header;
