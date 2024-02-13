import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import backendUrl from "../url/backendUrl";
import useAllProducts from "../url/productsApi";

const   ModifyProduct = () => {
  const [close, setClose] = useState(true);

  const [products, setProducts] = useState(JSON.parse(localStorage['product'] || null)); 
  
  // console.log(products);
  
  useEffect(() => {
    setProducts(JSON.parse(localStorage['product']) || null)
  }, [])
  
  
  const formik = useFormik({
    initialValues: {
      productID:  products.id,
      productName:  products.productName, 
      purchasePrice:  products.purchasePrice,
      pricePerUnit:  products.pricePerUnit,
      units:  products.units,
      quantity:  products.quantity,
      pricePerQuantity:  products.pricePerQuantity,
    },
    onSubmit: (values) => {
      console.log(values);
      axios.post(`${backendUrl}/modifyproduct.php`, values).then((result) => {
        console.log(result.data);
        if (result.data.status==true) {
          Swal.fire({
            title: "Product Updated!",
            // text: result.data.message,
            icon: "success",
            showConfirmButton: false,
            timer: 2000
            })
            setTimeout(() => {
              window.location.reload()
              
            }, 2000);
        }
      }).catch((err) => {
        console.log(err);
      });
    },
  });
  
  const closeBtn = ()=>{
    setClose(false)
  }
  
  return (
    <div className="">
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
      <div className="flex justify-end gap-4">

  <button
    type="submit"
    className="bg-blue-500 text-white py-2 px-4 rounded w-ful"
  >
    Update Product
  </button>
      </div>
</form>

    </div>
  );
};

export default  ModifyProduct;
