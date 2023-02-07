import React from "react";
import useFetch from "../../hooks/useFetch";

import styles from "./Brands.module.scss";

import Slider from "../Carousel/Slider";

const Brands = () => {
   const productsSearchParams = new URLSearchParams();
   productsSearchParams.append("count", 4);

   const searchProductsUrl = `/shop/brands/random`;

   const [state] = useFetch(`${searchProductsUrl}?${productsSearchParams.toString()}`);

   const { status } = state;

   const getBrandImagesData = () => {
      if (!state.data?.brands) return [];

      return state.data.brands.map(brand => brand.images[0].url)
   }

   return (
      <section className={styles["section"]}>
         <div className={styles["section__container"]}>
            <div className={styles["title"]}>
               <h1 className={styles["title__text"]}>Our Brands</h1>
            </div>
            <div className={styles["brands-list"]}>
               { state.data?.brands ? <Slider autoPlay={true} controls={false} imagesArray={getBrandImagesData()} imagesMaxNumber={5} /> : null }
            </div>
         </div>
      </section>
   );
};

export default Brands;
