import React, { useState } from "react";
import Layout from "./../layout/Layout";
import { useAppStore } from "../../store/appStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart } = useAppStore();
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    pincode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      // Clear all items from cart
      for (const item of cart) {
        await useAppStore.getState().removeCart(item.product.id);
      }
      toast.success("Order placed successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen p-6 bg-gray-100">
        <div className="container max-w-screen-lg mx-auto">
          <form onSubmit={handlePlaceOrder} className="bg-white rounded shadow-lg p-4 px-4 md:p-8">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">
              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label>Full Name</label>
                    <input
                      name="fullName"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label>Address</label>
                    <input
                      name="address"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label>City</label>
                    <input
                      name="city"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label>Pincode</label>
                    <input
                      name="pincode"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="md:col-span-5 mt-4">
                    <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
                  </div>

                  <div className="md:col-span-5">
                    <label>Card Number</label>
                    <input
                      name="cardNumber"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label>Expiry Date</label>
                    <input
                      name="expiryDate"
                      placeholder="MM/YY"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label>CVV</label>
                    <input
                      name="cvv"
                      type="password"
                      maxLength="3"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.cvv}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="md:col-span-5 text-right mt-4">
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      type="submit"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;