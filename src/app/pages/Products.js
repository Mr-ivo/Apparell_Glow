 'use client';
import { useState } from 'react';
import { Pencil, Trash, PlusCircle } from 'lucide-react';

const initialProducts = [
  {
    id: 1,
    name: 'Product 1',
    description: 'This is product 1',
    price: 50,
    image: '/download (1).jpeg',
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'This is product 2',
    price: 30,
    image: '/image2.jpeg',
  },
  {
    id: 3,
    name: 'Product 3',
    description: 'This is product 3',
    price: 20,
    image: '/Valina.jpeg',
  },
];

export default function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '', // Store image URL, not file object
  });
  const [imagePreview, setImagePreview] = useState('');

  // Handle image change (for preview)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the image preview URL
        setCurrentProduct({ ...currentProduct, image: reader.result }); // Store image as URL
      };
      reader.readAsDataURL(file);
    }
  };

  // Save or update product
  const handleSave = () => {
    if (editMode) {
      const updatedProducts = products.map((product) =>
        product.id === currentProduct.id ? currentProduct : product
      );
      setProducts(updatedProducts);
    } else {
      setProducts([
        ...products,
        {
          id: products.length + 1,
          name: currentProduct.name,
          description: currentProduct.description,
          price: currentProduct.price,
          image: currentProduct.image, // Use the image URL
        },
      ]);
    }
    setShowModal(false);
    setCurrentProduct({ name: '', description: '', price: '', image: '' });
    setImagePreview('');
    setEditMode(false);
  };

  // Delete product
  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Open modal in edit mode
  const handleEdit = (product) => {
    setCurrentProduct(product);
    setImagePreview(product.image); // Set preview as the image URL
    setEditMode(true);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Products</h1>
        <button
          onClick={() => {
            setEditMode(false);
            setShowModal(true);
          }}
          className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          <PlusCircle className="w-5 h-5 mr-2" /> Add Product
        </button>
      </div>

      {/* Table for displaying products */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left text-gray-600 dark:text-gray-300">Name</th>
              <th className="py-2 px-4 border-b text-left text-gray-600 dark:text-gray-300">Description</th>
              <th className="py-2 px-4 border-b text-left text-gray-600 dark:text-gray-300">Price</th>
              <th className="py-2 px-4 border-b text-left text-gray-600 dark:text-gray-300">Image</th>
              <th className="py-2 px-4 border-b text-left text-gray-600 dark:text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-100">{product.name}</td>
                <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-100">{product.description}</td>
                <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-100">${product.price}</td>
                <td className="py-2 px-4 border-b">
                  <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-md" />
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-yellow-500 hover:text-yellow-600 mr-2"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for adding/editing a product */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">{editMode ? 'Edit Product' : 'Add Product'}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm text-gray-600 dark:text-gray-300">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full mt-1 p-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                  value={currentProduct.name}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm text-gray-600 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  id="description"
                  className="w-full mt-1 p-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                  value={currentProduct.description}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-sm text-gray-600 dark:text-gray-300">
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  className="w-full mt-1 p-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                  value={currentProduct.price}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="block text-sm text-gray-600 dark:text-gray-300">
                  Image
                </label>
                <input
                  id="image"
                  type="file"
                  className="w-full mt-1 p-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                  onChange={handleImageChange}
                  accept="image/*"
                />
                {imagePreview && (
                  <div className="mt-4">
                    <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-md" />
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  {editMode ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
