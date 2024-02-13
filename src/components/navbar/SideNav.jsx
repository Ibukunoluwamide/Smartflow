import React, { useState } from 'react'
import {Link} from 'react-router-dom'

const SideNav = () => {
  const [active, setActive] = useState('')
  const changeActive = (e) => {
    setActive(e.target.innerText);
  
  };
  return (
    <>
     <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
   <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
   <ul className="space-y-2 font-medium">
  {/* <li onClick={(e) => changeActive(e)}>
    <Link to="#" className={`flex items-center p-2   rounded-lg group ${active === 'Home' ? 'bg-blue-500 text-white' : ''}`}>
      <i className={`fas fa-home w-5 h-5 text-gray-500 transition duration-75 ${active === 'Home' ? 'text-white' : ''}`}></i>
      <span className="ms-3">Home</span>
    </Link>
  </li> */}
  <li onClick={(e) => changeActive(e)}>
    <Link to="/dashboard/add-product" className={`flex items-center p-2 rounded-lg group ${active === 'Add Product' ? 'bg-blue-500 text-white' : ''}`}>
      <i className={`fas fa-plus-square w-5 h-5 text-gray-500 transition duration-75 ${active === 'Add Product' ? 'text-white' : ''}`}></i>
      <span className="flex-1 ms-3 whitespace-nowrap">Add Product</span>
    </Link>
  </li>
  <li onClick={(e) => changeActive(e)}>
    <Link to="/dashboard/products" className={`flex items-center p-2 rounded-lg group ${active === 'Products' ? 'bg-blue-500 text-white' : ''}`}>
      <i className={`fas fa-box w-5 h-5 text-gray-500 transition duration-75 ${active === 'Products' ? 'text-white' : ''}`}></i>
      <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
      <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
    </Link>
  </li>
  <li onClick={(e) => changeActive(e)}>
    <Link to="#" className={`flex items-center p-2 rounded-lg group ${active === 'Sales' ? 'bg-blue-500 text-white' : ''}`}>
      <i className={`fas fa-chart-line w-5 h-5 text-gray-500 transition duration-75 ${active === 'Sales' ? 'text-white' : ''}`}></i>
      <span className="flex-1 ms-3 whitespace-nowrap">Sales</span>
    </Link>
  </li>
  <li onClick={(e) => changeActive(e)}>
    <Link to="#" className={`flex items-center p-2 rounded-lg group ${active === 'Inventory' ? 'bg-blue-500 text-white' : ''}`}>
      <i className={`fas fa-cubes w-5 h-5 text-gray-500 transition duration-75 ${active === 'Inventory' ? 'text-white' : ''}`}></i>
      <span className="flex-1 ms-3 whitespace-nowrap">Inventory</span>
    </Link>
  </li>
  <li onClick={(e) => changeActive(e)}>
    <Link to="#" className={`flex items-center p-2 rounded-lg group ${active === 'Reports' ? 'bg-blue-500 text-white' : ''}`}>
      <i className={`fas fa-chart-bar w-5 h-5 text-gray-500 transition duration-75 ${active === 'Reports' ? 'text-white' : ''}`}></i>
      <span className="flex-1 ms-3 whitespace-nowrap">Reports</span>
    </Link>
  </li>
  <li onClick={(e) => changeActive(e)}>
    <Link to="#" className={`flex items-center p-2 rounded-lg group ${active === 'Log Out' ? 'bg-blue-500 text-white' : ''}`}>
      <i className={`fas fa-sign-out-alt w-5 h-5 text-gray-500 transition duration-75 ${active === 'Log Out' ? 'text-white' : ''}`}></i>
      <span className="flex-1 ms-3 whitespace-nowrap">Log Out</span>
    </Link>
  </li>
</ul>


   </div>
</aside>

    </>
  )
}

export default SideNav