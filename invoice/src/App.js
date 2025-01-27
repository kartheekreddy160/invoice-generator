import React, { useState } from 'react';

function App() 
{
  // State to store the invoice items and customer details
  const [items, setItems] = useState([{ particulars: '', quantity: 0, price: 0, discount: 0, total: 0 }]);
  const [subTotal, setSubTotal] = useState(0);
  const [discountTotal, setDiscountTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  // State for customer details
  const [customer, setCustomer] = useState({ name: '', mobile: '', address: '' });

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...items];
    newItems[index][name] = value;
    newItems[index].total = calculateItemTotal(newItems[index]);
    setItems(newItems);
    calculateTotals(newItems);
  };

  const calculateItemTotal = (item) => {
    const itemTotal = item.quantity * item.price;
    const discountAmount = (itemTotal * item.discount) / 100;
    return itemTotal - discountAmount;
  };

  const calculateTotals = (newItems) => {
    const subTotal = newItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    const discountTotal = newItems.reduce((acc, item) => acc + ((item.quantity * item.price * item.discount) / 100), 0);
    const grandTotal = subTotal - discountTotal;

    setSubTotal(subTotal);
    setDiscountTotal(discountTotal);
    setGrandTotal(grandTotal);
  };

  const addRow = () => {
    setItems([...items, { particulars: '', quantity: 0, price: 0, discount: 0, total: 0 }]);
  };

  const removeRow = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    calculateTotals(newItems);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <header>
        <h1 className="text-xl font-bold" id='mauli'>Mauli Decor</h1><br></br>

        <h3>Jagadgirigutta, Hyderabad,500037</h3>
        <h3>Mobile : 8978053882 , 9908196703</h3>
      </header>

      <header className="flex justify-between items-center py-4 w-full max-w-4xl">
        <h2 className="text-xl font-bold">Quotation</h2>
        <button onClick={handlePrint} className="bg-blue-500 text-white py-2 px-4 rounded">
          Print
        </button>
      </header>

      {/* Customer Details */}
      <section className="w-full max-w-4xl mb-4">
        <h3 className="text-lg font-bold mb-2">Customer Details</h3>
        <div className="mb-2">
          <label className="block mb-1">
            Name:
            <input
              type="text"
              value={customer.name}
              onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
              className="border border-gray-300 px-2 py-1 w-full"
            />
          </label>
          <label className="block mb-1">
            Mobile:
            <input
              type="tel"
              value={customer.mobile}
              onChange={(e) => setCustomer({ ...customer, mobile: e.target.value })}
              className="border border-gray-300 px-2 py-1 w-full"
            />
          </label>
          <label className="block mb-1">
            Address:
            <input
              type="text"
              value={customer.address}
              onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
              className="border border-gray-300 px-2 py-1 w-full"
            />
          </label>
        </div>
      </section>

      {/* Invoice Table */}
      <table className="min-w-full max-w-4xl border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Particulars</th>
            <th className="border border-gray-300 px-4 py-2">Quantity</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Discount (%)</th>
            <th className="border border-gray-300 px-4 py-2">Total</th>
            <th className="border border-gray-300 px-4 py-2 no-print">Actions</th>
          </tr>
        </thead>
        
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="text"
                  name="particulars"
                  value={item.particulars}
                  onChange={(event) => handleInputChange(index, event)}
                  className="w-full border border-gray-300 px-2 py-1"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="number"
                  name="quantity"
                  value={item.quantity}
                  onChange={(event) => handleInputChange(index, event)}
                  className="w-full border border-gray-300 px-2 py-1"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="number"
                  name="price"
                  value={item.price}
                  onChange={(event) => handleInputChange(index, event)}
                  className="w-full border border-gray-300 px-2 py-1"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="number"
                  name="discount"
                  value={item.discount}
                  onChange={(event) => handleInputChange(index, event)}
                  className="w-full border border-gray-300 px-2 py-1"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.total.toFixed(2)}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center no-print">
                <button onClick={() => removeRow(index)} className="text-red-500">
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={addRow} className="bg-green-500 text-white py-2 px-4 rounded my-4 no-print">
        Add Item
      </button>

      {/* Totals */}
      <div className="w-full max-w-4xl flex flex-col items-end">
        <div className="text-right">
          <h2 className="text-lg font-bold">Sub Total: {subTotal.toFixed(2)}</h2>
          <h2 className="text-lg font-bold">Discount : {discountTotal.toFixed(2)}</h2>
          <h2 className="text-lg font-bold">Grand Total: {grandTotal.toFixed(2)}</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
