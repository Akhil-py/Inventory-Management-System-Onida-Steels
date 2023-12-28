'use client'
import { useState, useEffect } from 'react'; // Import useState from React for handling form input
import { collection, addDoc, getDoc, querySnapshot, query, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from './firebase';

export default function Home() {
  const [productData, setProductData] = useState({ name: '', quantity: '' }); // State for the input fields
  const [items, setItems] = useState([]); // Define and initialize 'items' state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  // Add item to the database
  const handleAddProduct = async () => {
    if (productData.name != '' && productData.quantity != '') {

      await addDoc(collection(db, 'inventory'), {
        name: productData.name.trim(),
        quantity: productData.quantity,
      });
    }
    setProductData({name: '', quantity: ''});
  };

  // Read items from the database
  useEffect(() => {
    const q = query(collection(db, 'inventory'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      // Set the 'items' state with the retrieved items
      setItems(itemsArr); // Loop back around to this
    });
    return () => unsubscribe();
  }, []);

  // Delete items from the database
  const handleDeleteProduct = async (id) => {
    await deleteDoc(doc(db, 'inventory', id))
  };

  // Edit quantities in the database
  const handleEditProduct = async () => {
    // TODO
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-900">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className='text-4xl p-4 text-center'>Onida Steels</h1>

        {/* Input fields for adding new inventory */}
        <div className="w-full p-4">
          <div className="flex space-x-4">
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
              placeholder="Product Name"
              className="px-3 py-2 border rounded-lg w-1/2 text-black"
            />
            <input
              type="number"
              name="quantity"
              value={productData.quantity}
              onChange={handleInputChange}
              placeholder="Quantity"
              className="px-3 py-2 border rounded-lg w-1/4 text-black"
            />
            <button
              onClick={handleAddProduct}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add Inventory
            </button>
          </div>
        </div>

        {/* Table for displaying existing inventory */}
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-700 transition-all">
                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button 
                  onClick={handleEditProduct}
                  className="text-blue-500 hover:underline">Edit</button>
                  <button 
                  onClick={() => handleDeleteProduct(item.id)}
                  className="text-red-500 hover:underline ml-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
