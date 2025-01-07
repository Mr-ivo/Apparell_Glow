'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, User, MessageSquare, FileText } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [focused, setFocused] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (field) => {
    setFocused({ ...focused, [field]: true });
  };

  const handleBlur = (field) => {
    setFocused({ ...focused, [field]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://glow-backend-2nxl.onrender.com/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: formData.email, 
          subject: formData.subject,
          text: formData.message,
        }),
      });

      if (response.ok) {
        const result = await response.text();
        console.log(result);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        alert('Message sent successfully!');
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error sending your message. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid md:grid-cols-5">
            <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-blue-700 p-8 text-white">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                  <p className="text-blue-100 mb-8">
                    We do not love to hear from you! Fill out the form and we will get back to you shortly.
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-100">Email</p>
                        <p className="font-medium">ebongthierry569@gmail.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-100">Live Chat</p>
                        <p className="font-medium">Mon-Fri from 9am to 5pm</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-12">
                  <p className="text-sm text-blue-100">
                    By submitting this form you agree to our terms and conditions and our privacy policy.
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-3 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <motion.div variants={fadeInUp} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className={`
                      block w-full pl-10 pr-3 py-3 border-2 rounded-lg
                      transition-all duration-200 ease-in-out
                      ${focused.name ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'}
                      dark:bg-gray-700 dark:border-gray-600 dark:text-white
                      focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100
                    `}
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={() => handleBlur('name')}
                  />
                </motion.div>

                <motion.div variants={fadeInUp} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className={`
                      block w-full pl-10 pr-3 py-3 border-2 rounded-lg
                      transition-all duration-200 ease-in-out
                      ${focused.email ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'}
                      dark:bg-gray-700 dark:border-gray-600 dark:text-white
                      focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100
                    `}
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={() => handleBlur('email')}
                  />
                </motion.div>

                {/* Subject Input */}
                <motion.div variants={fadeInUp} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className={`
                      block w-full pl-10 pr-3 py-3 border-2 rounded-lg
                      transition-all duration-200 ease-in-out
                      ${focused.subject ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'}
                      dark:bg-gray-700 dark:border-gray-600 dark:text-white
                      focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100
                    `}
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => handleFocus('subject')}
                    onBlur={() => handleBlur('subject')}
                  />
                </motion.div>

                <motion.div variants={fadeInUp} className="relative">
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className={`
                      block w-full px-3 py-3 border-2 rounded-lg resize-none
                      transition-all duration-200 ease-in-out
                      ${focused.message ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'}
                      dark:bg-gray-700 dark:border-gray-600 dark:text-white
                      focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100
                    `}
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={() => handleBlur('message')}
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium
                           hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                           transition-all duration-200 ease-in-out flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Send Message</span>
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
