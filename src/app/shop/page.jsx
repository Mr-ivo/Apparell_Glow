"use client";
import Image from "next/image";
import styles from "../shop/page.module.css";
import { useCart } from "../context/CartContext";
import BackToTopButton from "../BackToTop/BackToTOP";

export default function Shop() {
  const { cartItems, addToCart, removeFromCart, getTotalPrice } = useCart();

  console.log(cartItems);

  // List of products available in the shop
  const products = [
    {
      id: 1,
      name: "Hydrating Cream Mask",
      price: 1200,
      image: "/image3.jpeg",
      description:
        "A rich cream mask that deeply hydrates and replenishes moisture.",
    },
    {
      id: 2,
      name: "Body Butter",
      price: 7000,
      image: "/image2.jpeg",
      description:
        "Nourish your skin with our luxurious body butter, made from organic ingredients.",
    },
    {
      id: 3,
      name: "Organic High-Curcumin Serum",
      price: 6500,
      image: "/image1.jpeg",
      description:
        "Infused with the power of curcumin, this serum brightens and rejuvenates.",
    },
  ];

  const checkCart = (item) => {
    const foundProduct = cartItems.find((product) => product.id === item.id);
    if (foundProduct) {
      alert("already in cart");
    } else {
      addToCart(item);
    }
  };
  return (
    <div className={styles.shopContainer}>
      <h1 className={styles.shopTitle}>
        Welcome to Our Beauty & Skincare Shop
      </h1>
      <p className={styles.shopDescription}>
        Discover high-quality beauty products curated for radiant and glowing
        skin. Our carefully selected range includes creams, serums, body care,
        and more, each designed to enhance your natural beauty.
      </p>

      {/* Featured Collections */}
      <div className={styles.collections}>
        <h2 className={styles.all}>Shop by Collection</h2>
        <div className={styles.collectionCards}>
          <div className={styles.collectionCard}>
            <h3>Best Sellers</h3>
            <p>
              Our customers all-time favorites that deliver outstanding results.
            </p>
          </div>
          <div className={styles.collectionCard}>
            <h3>New Arrivals</h3>
            <p>
              Explore the latest in beauty innovations and skincare
              advancements.
            </p>
          </div>
          <div className={styles.collectionCard}>
            <h3>On Sale</h3>
            <p>
              Get your favorite items at discounted prices while stocks last.
            </p>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div className={styles.productsSection}>
        <h2 className={styles.all}>Our Products</h2>
        <div className={styles.products}>
          {products.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <Image
                src={product.image}
                width={200}
                height={200}
                alt={product.name}
              />
              <h3>{product.name}</h3>
              <p className={styles.productDescription}>{product.description}</p>
              <p className={styles.price}>CAF{product.price}</p>
              <button
                className={styles.addToCartButton}
                onClick={() => checkCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
      <BackToTopButton />

      {/* Shopping Benefits */}
      <div className={styles.benefits}>
        <h2>Why Shop With Us?</h2>
        <ul className={styles.benefitsList}>
          <li>
            🌿 **Premium Ingredients**: We use only the finest organic and
            cruelty-free ingredients.
          </li>
          <li>
            💖 **Customer Satisfaction**: Enjoy a 30-day money-back guarantee on
            all products.
          </li>
          <li>
            🚚 **Free Shipping**: Free delivery on orders over $50 within the
            US.
          </li>
          <li>
            🔒 **Secure Payments**: We ensure safe and secure transactions for
            every purchase.
          </li>
          <li>
            🎁 **Exclusive Rewards**: Sign up for our loyalty program to earn
            points with every purchase.
          </li>
        </ul>
      </div>
    </div>
  );
}
