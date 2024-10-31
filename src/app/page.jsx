"use client";
import styles from "../app/page.module.css";
import Image from "next/image";
import Slider from "react-slick";
import { useCart } from "./context/CartContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BackToTopButton from "./BackToTop/BackToTOP";
import Link from "next/link";
import Footer from "./Footer/Footer";

export default function Page() {
  const { addToCart } = useCart();
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const products = [
    {
      id: 1,
      name: "Nivea Q10",
      price: 4500,
      oldPrice: 2500,
      image: "/images (1).jpeg",
    },

    {
      id: 2,
      name: "Valina Body LOtion",
      price: 84.0,
      oldPrice: 100.0,
      image: "/Valina.jpeg",
    },

    { id: 3, 
      name: "Barty",
       price: 6000, oldPrice: 3000,
        image: "/barty.jpeg" },
    { id: 4,
       name: "Derma",
        price: 2000, 
        oldPrice: 2000, 
        image: "/derma.jpeg" },
   
  ];

  return (
    <>
      <div className={styles.hero}>
        <h1>Discover The Secrets Of Beauty</h1>
        <p>
          Get them together (for less) for dewy, natural-looking coverage that
          still looks like skin.
        </p>
        <Link href={"/shop"}>
          <button className={styles.shopButton}>Shop Now</button>
        </Link>
      </div>

      {/* Promotions Section */}
      <section className={styles.promotions}>
        <Slider {...sliderSettings} className={styles.imageGrid}>
          {products.map((product,index) => (
            <div key={index} className={styles.promotion}>
              <Image
                className={styles.img}
                src={product.image}
                height={250}
                width={300}
                alt="NiVEA"
              />
              <h3>{product.name}</h3>
              <button
                className={styles.shopButton}
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
         
        </Slider>
      </section>
      <section className={styles.products}>
        <div className={styles.productSections}>
          {/* Best Seller Section */}
          <div className={styles.productSection}>
            <h2>Best Seller</h2>
          {products.map((product,index) => (
            <div key={index} className={styles.productCard}>
              <Image src={product.image} height={100} width={100} />
              <div>
                <h3>{product.name}</h3>
                <p>CAF2200</p>
                <p className={styles.oldPrice}>CAF5000</p>
                <button
                  className={styles.addToCartButton}
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
         

          </div>

          {/* Top Rated Section */}
          <div className={styles.productSection}>
            <h2>Top Rated</h2>
            {products.map((product,index) => (
            <div key={index} className={styles.productCard}>
              <Image src={product.image} height={100} width={100} />
              <div>
                <h3>{product.name}</h3>
                <p>CAF8400</p>
                <p className={styles.oldPrice}>CAF1000</p>
                <button
                  className={styles.addToCartButton}
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
            ))}
          </div>

          {/* On Sale Section */}
          <div className={styles.productSection}>
            <h2>On Sale</h2>
            {products.map((product,index) => (
            <div key={index} className={styles.productCard}>
              <Image src={product.image} height={100} width={100} />
              <div>
                <h3>{product.name}</h3>
                <p>CAF2000</p>
                <p className={styles.oldPrice}>CAF3000</p>
                <button
                  className={styles.addToCartButton}
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
            ))}
           
          </div>
        </div>
          {/* // ))} */}
      </section>
      <BackToTopButton />
      <Footer />
    </>
  );
}
