import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import backendUrl from "../url/backendUrl";

const AddProduct = () => {
  const formik = useFormik({
    initialValues: {
      productName: "",
      purchasePrice: "",
      pricePerUnit: "",
      units: "",
      quantity: "",
      pricePerQuantity: "",
    },
    onSubmit: (values) => {
      console.log(values);
      axios.post(`${backendUrl}/addproduct.php`, values).then((result) => {
        console.log(result);
        if (result.data.status==true) {
          Swal.fire({
            title: "Product Added!",
            text: result.data.message,
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Ok"
          })
        }
      }).catch((err) => {
        console.log(err);
      });
    },
  });

  return (
    <div className="border border-gray-5 mx-auto mt-20 shadow-xl rounded md:w-[700px] p-3">
      <h2 className="text-4xl font-semibold mb-4 text-center" >Add Product</h2>
      <form onSubmit={formik.handleSubmit} className="">
      <div className="md:grid grid-cols-2 gap-4">
      <div className="mb-2">
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor="productName"
    >
      Product Name
    </label>
    <input
      type="text"
      id="productName"
      value={formik.values.productName}
      onChange={formik.handleChange}
      className="appearance-none border rounded w-full py-2 px-3"
      required
    />
  </div>
  <div className="mb-2">
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor="price"
    >
      Purchase Price
    </label>
    <input
      type="number"
      id="purchasePrice"
      value={formik.values.purchasePrice}
      onChange={formik.handleChange}
      className="appearance-none border rounded w-full py-2 px-3"
      required
    />
  </div>


  <div className="mb-2">
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor="units"
    >
      Units in Stock
    </label>
    <input
      type="number"
      id="units"
      value={formik.values.units}
      onChange={formik.handleChange}
      className="appearance-none border rounded w-full py-2 px-3"
      required
    />
  </div>
  <div className="mb-2">
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor="pricePerUnit"
    >
      Price (per unit)
    </label>
    <input
      type="number"
      id="pricePerUnit"
      value={formik.values.pricePerUnit}
      onChange={formik.handleChange}
      className="appearance-none border rounded w-full py-2 px-3"
      required
    />
  </div>
  <div className="mb-2">
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor="quantity"
    >
      Quantity in Unit
    </label>
    <input
      type="number"
      id="quantity"
      value={formik.values.quantity}
      onChange={formik.handleChange}
      className="appearance-none border rounded w-full py-2 px-3"
      required
    />
  </div>
  <div className="mb-2">
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor="pricePerQuantity"
    >
      Price (per quantity)
    </label>
    <input
      type="number"
      id="pricePerQuantity"
      value={formik.values.pricePerQuantity}
      onChange={formik.handleChange}
      className="appearance-none border rounded w-full py-2 px-3"
      required
    />
  </div>
      </div>
 <div className="flex justify-end">
 <button
    type="submit"
    className="bg-blue-500 text-white py-2 px-4 rounded"
  >
    Add Product
  </button>
 </div>
</form>

    </div>
  );
};

export default AddProduct;
