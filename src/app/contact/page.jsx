'use client';
import { useState } from 'react';
import styles from '../contact/page.module.css';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add form submission logic here (e.g., API call)
  };

  return (
    <div className={styles.contactContainer}>
      <h2>Get in Touch</h2>
      <p>We’d love to hear from you! Fill out the form below and we’ll get back to you shortly.</p>
      
      <form className={styles.contactForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            required
            className={styles.inputField}
            value={formData.name}
            onChange={handleChange}
          />
          <label className={styles.leb} htmlFor="name">Your Name</label>
        </div>

        <div className={styles.formGroup}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            required
            className={styles.inputField}
            value={formData.email}
            onChange={handleChange}
          />
          <label className={styles.leb} htmlFor="email">Your Email</label>
        </div>

        <div className={styles.formGroup}>
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="Subject"
            required
            className={styles.inputField}
            value={formData.subject}
            onChange={handleChange}
          />
          <label className={styles.leb} htmlFor="subject">Subject</label>
        </div>

        <div className={styles.formGroup}>
          <textarea
            id="message"
            name="message"
            placeholder="Your Message"
            required
            className={styles.textareaField}
            value={formData.message}
            onChange={handleChange}
          />
          <label className={styles.leb}  htmlFor="message">Your Message</label>
        </div>

        <button type="submit" className={styles.submitBtn}>Send Message</button>
      </form>
    </div>
  );
}
