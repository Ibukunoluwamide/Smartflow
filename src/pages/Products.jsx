import axios from "axios";
import { Dropdown } from "flowbite-react";
import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import backendUrl from "../url/backendUrl";
import useAllProducts from "../url/productsApi";
import ModifyProduct from "./ModifyProduct";
import SellProduct from "./SellProduct";

const Products = () => {
  const [id, setid] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const allProducts = useAllProducts(); 
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentModal, setCurrentModal] = useState("");

  useEffect(() => {
    setFilteredProducts(allProducts);
  }, [allProducts]);
  
 
  
  const toggleModal = ({id, e}) => {
    localStorage.setItem(
      "product",
      JSON.stringify(allProducts.find((item) => item.id == id))
    );
    if (e.target.innerText=='Modify') {
      setCurrentModal('Modify')
      
    }else{
      setCurrentModal('Sell')
    }
    setShowModal(!showModal); 
    setid(id);
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
            title: "Product Deleted!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000
            })
            setTimeout(() => {
              window.location.reload()
              
            }, 2000)
           
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
        
            {
              filteredProducts && (
                <>
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
                Units Left
              </th>
              <th scope="col" className="px-6 py-3">
                Total Unit Price
              </th>
              
            </tr>
          </thead>
          <tbody>
            {filteredProducts && filteredProducts.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{index+1}</td>
                <td className="px-6 py-4">{item.productName}</td>
                <td className="px-6 py-4">{item.purchasePrice}</td>
                <td className="px-6 py-4">{item.units}</td>
                <td className="px-6 py-4">{item.pricePerUnit}</td>
                <td className="px-6 py-4">{item.unitsLeft}</td>
                <td className="px-6 py-4">{item.totalUnitsPrice}</td>
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
                    <Dropdown.Item onClick={(e) => toggleModal({id:item.id, e:event})}>
                      <i className="fa-solid fa-hand-holding-dollar pe-2"></i>
                      Sell
                    </Dropdown.Item>
                    <Dropdown.Item onClick={(e) => toggleModal({id:item.id, e:event})}>
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
                </>
              )
            }
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
                  {
                  currentModal=="Modify"?'Modify Product':"Sell Product"
                }
                </h3>
                <button
                  type="button"
                  onClick={(e)=>toggleModal({e:event})}
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
                {
                  currentModal=="Modify"?<ModifyProduct />:<SellProduct/>
                }
                
                {/* <button onClick={toggleModal} className="absolute z-50 right-0 bottom-7 left-28 font-semibold ">Close</button> */}
              </div>
            </div>
          </div>
        </div>
      )}


      {
        !filteredProducts && (
          <>
          

<div id="toast-interactive" class="flex justify-center w-[100vw] md:w-[700px] mx-auto p-4 text-gray-500 bg-white rounded-lg shadow-lg" role="alert">
    <div class="flex">
        <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:text-blue-300 dark:bg-blue-900">
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"/>
            </svg>
            <span class="sr-only">Refresh icon</span>
        </div>
        <div class="ms-3 text-xl font-normal">
            <span class="mb-1 text-2xl font-semibold text-gray-900 dark:text-white">No products available</span>
            <div class="mb-2 text-md font-normal">Add a new product(s)</div> 
            <div class="grid grid-cols-2 gap-2">
                <div>
                    <Link to="/dashboard/add-product" class="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800">Add</Link>
                </div>
                <div>
                    <a href="#" class="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Not now</a> 
                </div>
            </div>    
        </div>
       
    </div>
</div>


          </>
        )
      }
    </>
  );
};

export default Products;
