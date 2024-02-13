import axios from "axios";
import { Dropdown } from "flowbite-react";
import { React, useEffect, useState } from "react";
import backendUrl from "../url/backendUrl";
import useAllProducts from "../url/productsApi";
import ModifyProduct from "./ModifyProduct";

const Products = () => {
  const [id, setid] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const allProducts = useAllProducts(); // Assuming useAllProducts is a custom hook to fetch products
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    setFilteredProducts(allProducts);
  }, [allProducts]);
  
 
  
  const toggleModal = (id) => {
    // console.log(id);
    localStorage.setItem(
      "product",
      JSON.stringify(allProducts.find((item) => item.id == id))
    );
    setid(id);
    setShowModal(!showModal);
  };
  
  const deleteProduct = (id)=>{
    Swal.fire({
      title: "Delete Product?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        axios.post(`${backendUrl}/deleteproduct.php`, {productID: id}).then((result) => {
          console.log(result.data);
          Swal.fire({
            title: "Deleted!",
            text: result.data.message,
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
           
        }).catch((err) => {
          console.log(err);
        });
      }
    });
  }
  const searchInput = (e) => {
    const searchValue = e.target.value.toLowerCase(); // Convert search value to lowercase

    const filtered = allProducts.filter((product) =>
      product.productName.toLowerCase().includes(searchValue)
    );
    setFilteredProducts(filtered);
  };
  
  return (
    <>
      <div className="relative overflow-x-auto mt-20 m-auto md:ms-14 ">
        
<form className="max-w-sm mx-auto my-4">
    <div className="relative">
        <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5">
        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input onChange={(e)=>searchInput(e)} type="text" id="phone-input" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5"  placeholder="Search for product(s)..." required />
    </div>
</form>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500  md:ms-64 md:w-[70vw]">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                S/N
              </th>
              <th scope="col" className="px-6 py-3">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3">
                Purchase Price
              </th>
              <th scope="col" className="px-6 py-3">
                Units
              </th>
              <th scope="col" className="px-6 py-3">
                Price (Per Unit)
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Price (per quantity)
              </th>
              <th scope="col" className="px-6 py-3">
                Total Quantity left
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{index+1}</td>
                <td className="px-6 py-4">{item.productName}</td>
                <td className="px-6 py-4">{item.purchasePrice}</td>
                <td className="px-6 py-4">{item.units}</td>
                <td className="px-6 py-4">{item.pricePerUnit}</td>
                <td className="px-6 py-4">{item.quantity}</td>
                <td className="px-6 py-4">{item.pricePerQuantity}</td>
                <td className="px-6 py-4">{item.units * item.quantity}</td>
                <td>
                  <Dropdown
                    label=""
                    className="w-32"
                    dismissOnClick={false}
                    placement="left"
                    renderTrigger={() => (
                      <span className="flex w-24 items-center justify-around  bg-blue-700 p-3 text-white rounded cursor-pointer">
                        {" "}
                        Action <i className="fa-solid fa-angle-down"></i>{" "}
                      </span>
                    )}
                  >
                    <Dropdown.Item>
                      <i className="fa-solid fa-hand-holding-dollar pe-2"></i>
                      Sell
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => toggleModal(item.id)}>
                      <i className="fa-regular fa-pen-to-square pe-2"></i>
                      Modify
                    </Dropdown.Item>
                    <Dropdown.Item  onClick={()=>deleteProduct(item.id)}>
                      <i className="fa-solid fa-trash-can pe-2"></i>
                      Delete
                    </Dropdown.Item>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* The dropdown section */}

      {showModal && (
        <div
          id="static-modal"
          data-modal-backdrop="static"
          tabIndex="-1"
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Modify Product
                </h3>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  data-modal-hide="static-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5 space-y-4">
                <ModifyProduct />
                {/* <button onClick={toggleModal} className="absolute z-50 right-0 bottom-7 left-28 font-semibold ">Close</button> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
