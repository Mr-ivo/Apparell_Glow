'use client'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import styles from '../about/page.module.css';
import BackToTopButton from '../BackToTop/BackToTOP';

export default function Page() {
  return (
    <>
      <div className={styles.aboutHero}>
        <h1>Welcome to ApparellGlow</h1>
        <p>Your trusted destination for premium skincare and beauty products.</p>
      </div>

      <section className={styles.aboutContent}>
        <div className={styles.aboutSection}>
          <h2>Our Story</h2>
          <p>
            At ApparellGlow, we believe that beauty is not just about appearances, but about self-confidence, well-being, and self-expression. 
            Established in 2004, our mission has always been to provide high-quality, natural, and ethically sourced cosmetic products to our customers.
          </p>
          <p>
            Our founde, MR IVO started the journey after realizing that skincare products should nourish and protect, not harm, your skin. With a deep passion for natural ingredients, we carefully curate products that are designed to bring out the best in every skin type.
          </p>
        </div>

        <div className={styles.aboutSection}>
          <h2>Our Mission</h2>
          <p>
            Our mission is simple: to empower individuals to feel confident in their skin by offering skincare solutions that are as effective as they are gentle. We are committed to using clean, safe, and high-performance ingredients that respect your skin and the environment.
          </p>
        </div>

        <div className={styles.aboutSection}>
          <h2>Why Choose Us?</h2>
          <ul>
            <li><strong>Natural Ingredients:</strong> We believe in harnessing the power of nature. Our products are free from harmful chemicals and toxins.</li>
            <li><strong>Cruelty-Free:</strong> We are proud to offer cruelty-free products, never tested on animals.</li>
            <li><strong>Quality Assurance:</strong> Every product is carefully selected and tested to meet our high standards of quality and effectiveness.</li>
            <li><strong>Sustainable Packaging:</strong> We care about the planet. Our packaging is eco-friendly and sustainable.</li>
          </ul>
        </div>

        <div className={styles.aboutSection}>
          <h2>Our Vision</h2>
          <p>
            We envision a world where everyone feels confident and beautiful in their own skin. Our goal is to expand our product range and introduce innovative skincare solutions that cater to a wider audience, all while remaining committed to sustainability and ethical practices.
          </p>
        </div>

        <div className={styles.aboutSection}>
          <h2>Get in Touch</h2>
          <p>
            Whether you have questions about our products, need skincare advice, or simply want to share your beauty journey, we’re here for you! Reach out to us through our social media platforms or send us an email at ebongthierry569@gmail.com.
          </p>
          <div className={styles.socialIcons}>
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
          </div>
        </div>
      </section>

      <BackToTopButton />

      <footer className={styles.footer}>
        <p>&copy; 2024 ApparellGlow. All rights reserved.</p>
      </footer>
    </>
  );
}
