import React from "react";
import Product from "../Product/Product";

import useFetch from "../../hooks/useFetch";

import styles from "./RecomendedProducts.module.scss";

const RecomendedProducts = () => {
   const productsSearchParams = new URLSearchParams();
   productsSearchParams.append("count", 4);
   console.log(productsSearchParams.toString());

   const searchProductsUrl = `/admin/products/random`;

   const [state] = useFetch(`${searchProductsUrl}?${productsSearchParams.toString()}`);

   return (
      <section className={styles["section"]}>
         <div className={styles["section__container"]}>
            <div className={styles["title"]}>
               <h1 className={styles["title__text"]}>Recomended Products</h1>
            </div>
            <div className={styles["product-list"]}>
               {state.data?.products.length
                  ? state.data?.products.map((product) => {
                       return (
                          <Product
                             key={product._id}
                             id={product._id}
                             productImage={product.primaryImage}
                             productName={product.name}
                             productPrice={product.price}
                             productBrand={product.brand}
                          />
                       );
                    })
                  : null}
            </div>
         </div>
      </section>
   );
};

export default RecomendedProducts;
