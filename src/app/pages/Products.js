'use client';
import { useState, useEffect } from 'react';
import { Pencil, Trash, PlusCircle } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    name: '',
    description: '',
    price: '',
    stockQuantity: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://glow-backend-2nxl.onrender.com/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImagePreview(URL.createObjectURL(file));
      setCurrentProduct({ ...currentProduct, image: file });
    } else {
      alert('Please upload a valid image file.');
    }
  };

  const handleSave = async () => {
    if (
      !currentProduct.name ||
      !currentProduct.description ||
      !currentProduct.price ||
      !currentProduct.stockQuantity ||
      (!editMode && !currentProduct.image)
    ) {
      alert('All fields are required.');
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append('name', currentProduct.name);
      formData.append('description', currentProduct.description);
      formData.append('price', Number(currentProduct.price));
      formData.append('stockQuantity', Number(currentProduct.stockQuantity));
      if (currentProduct.image) {
        formData.append('image', currentProduct.image);
      }

      const endpoint = editMode
        ? `https://glow-backend-2nxl.onrender.com/api/products/${currentProduct._id}`
        : 'https://glow-backend-2nxl.onrender.com/api/products';

      console.log('Submitting to:', endpoint);
      console.log('Form data:', {
        name: currentProduct.name,
        description: currentProduct.description,
        price: Number(currentProduct.price),
        stockQuantity: Number(currentProduct.stockQuantity),
        hasImage: !!currentProduct.image
      });

      const response = await fetch(endpoint, {
        method: editMode ? 'PUT' : 'POST',
        body: formData,
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response' }));
        console.error('Error response:', errorData);
        throw new Error(errorData.message || `Server returned ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Success response:', responseData);

      if (editMode) {
        setProducts(products.map((product) =>
          product._id === currentProduct._id ? responseData : product
        ));
        toast.success('Product updated successfully!');
      } else {
        setProducts([...products, responseData]);
        toast.success('Product added successfully!');
      }

      resetForm();
    } catch (err) {
      console.error('Error saving product:', err);
      toast.error('Error saving product: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(
          `https://glow-backend-2nxl.onrender.com/api/products/${id}`,
          {
            method: 'DELETE',
          }
        );

        if (!response.ok) {
          throw new Error('Failed to delete product');
        }

        setProducts(products.filter((product) => product._id !== id));
        toast.success('Product deleted successfully!');
      } catch (err) {
        toast.error('Error deleting product: ' + err.message);
      }
    }
  };

  const handleEdit = (product) => {
    setCurrentProduct({
      ...product,
      image: null,
    });
    setImagePreview(product.image);
    setEditMode(true);
    setShowModal(true);
  };

  const resetForm = () => {
    setCurrentProduct({
      name: '',
      description: '',
      price: '',
      stockQuantity: '',
      image: null,
    });
    setImagePreview('');
    setShowModal(false);
    setEditMode(false);
  };

  if (loading) {
    return <div className="text-center text-gray-700 dark:text-gray-300">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-6 py-8 mt-20"> 
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

        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left text-gray-600 dark:text-gray-300">Name</th>
                <th className="py-2 px-4 border-b text-left text-gray-600 dark:text-gray-300">Description</th>
                <th className="py-2 px-4 border-b text-left text-gray-600 dark:text-gray-300">Price</th>
                <th className="py-2 px-4 border-b text-left text-gray-600 dark:text-gray-300">Stock</th>
                <th className="py-2 px-4 border-b text-left text-gray-600 dark:text-gray-300">Image</th>
                <th className="py-2 px-4 border-b text-left text-gray-600 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-100">{product.name}</td>
                  <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-100">{product.description}</td>
                  <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-100">Cfa{product.price}</td>
                  <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-100">{product.stockQuantity}</td>
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
                      onClick={() => handleDelete(product._id)}
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

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"> 
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-[800px] max-h-[90vh] overflow-y-auto"> 
              <h2 className="text-2xl font-semibold mb-4">{editMode ? 'Edit Product' : 'Add Product'}</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
                encType="multipart/form-data"
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <label htmlFor="name" className="block text-sm text-gray-600 dark:text-gray-300">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={currentProduct.name}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm text-gray-600 dark:text-gray-300">
                    Price
                  </label>
                  <input
                    id="price"
                    type="number"
                    value={currentProduct.price}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    min="0"
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label htmlFor="description" className="block text-sm text-gray-600 dark:text-gray-300">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={currentProduct.description}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    rows="3"
                    required
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="stockQuantity" className="block text-sm text-gray-600 dark:text-gray-300">
                    Stock Quantity
                  </label>
                  <input
                    id="stockQuantity"
                    type="number"
                    value={currentProduct.stockQuantity}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, stockQuantity: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="image" className="block text-sm text-gray-600 dark:text-gray-300">
                    Image
                  </label>
                  <input
                    id="image"
                    type="file"
                    onChange={handleImageChange}
                    className="w-full p-2 border rounded-lg"
                    accept="image/*"
                    required={!editMode}
                  />
                </div>

                <div className="col-span-2 flex items-center space-x-4">
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-grow flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
