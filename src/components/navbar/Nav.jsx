import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAllProducts from '../../url/productsApi';
import User from '../../url/User';

const Nav = () => {
const navigate = useNavigate()
  const [active, setActive] = useState('Home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userOpen, setuserOpen] = useState(false);
  const allProducts = useAllProducts()
  const user = User()

  
  const changeActive = (e) => {
    setActive(e.target.innerText);
    // console.log(user);
  };

  const toggleSidebar = (e) => {
    setSidebarOpen(true);
    if (sidebarOpen==true) {
      setSidebarOpen(false);      
    }
  };
  const toggleUser = () => {
    setuserOpen(true);
    if (userOpen==true) {
      setuserOpen(false);      
    }
  };

const logout = ()=>{
  localStorage.removeItem('smartflow_id')
  navigate('/')
}


document.addEventListener('click', function(event) {
  const sidebar = document.querySelector('.sidebar');
  const targetElement = event.target;
  if (!sidebar.contains(targetElement)) {
      const backdrop = document.querySelector('#logo-sidebar');
        backdrop.classList.add('-translate-x-full');
  }
});




  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <span
                onClick={toggleSidebar}
                className="sidebar inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400  dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </span>
              <a href="#" className="flex ms-2 md:me-24">
                {/* <img  
                  src="/profile.pn"
                  className="h-8 me-3"
                  alt="Logo"
                /> */}
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  SmartFlow
                </span>
                  
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    onClick={toggleUser}
                    onMouseOver={toggleUser}
                    
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src="/profile.png"
                      alt="user photo"
                    />
                  </button>
                </div>
                <div
                  className={`${userOpen?'absolute z-50':'hidden'} right-5 top-8 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`}
                  id="dropdown-user"
                >
                  <div className="px-4 py-3" role="none">
                    <p className="text-sm text-gray-900 dark:text-white" role="none">
                      {user.userName}
                    </p>
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                      {user.email}
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Create User
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Delete User
                      </a>
                    </li>
                    <li>
                      <span
                         onClick={logout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Log out
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          sidebarOpen ? '' : '-translate-x-full'
        } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li onClick={(e) => changeActive(e)}>
              <Link
                to="/dashboard"
                className={`flex items-center p-2 rounded-lg group ${
                  active === 'Home' ? 'bg-blue-500 text-white' : ''
                }`}
              >
                <i
                  className={`fas fa-home w-5 h-5 text-gray-500 transition duration-75 ${
                    active === 'Home' ? 'text-white' : ''
                  }`}
                ></i>
                <span className="ms-3">Home</span>
              </Link>
            </li>
            <li onClick={(e) => changeActive(e)}>
              <Link
                to="/dashboard/add-product"
                className={`flex items-center p-2 rounded-lg group ${
                  active === 'Add Product' ? 'bg-blue-500 text-white' : ''
                }`}
              >
                <i
                  className={`fas fa-plus-square w-5 h-5 text-gray-500 transition duration-75 ${
                    active === 'Add Product' ? 'text-white' : ''
                  }`}
                ></i>
                <span className="flex-1 ms-3 whitespace-nowrap">Add Product</span>
              </Link>
            </li>
            <li onClick={(e) => changeActive(e)}>
              <Link
                to="/dashboard/products"
                className={`flex items-center p-2 rounded-lg group ${
                  active === 'Products' ? 'bg-blue-500 text-white' : ''
                }`}
              >
                <i
                  className={`fas fa-box w-5 h-5 text-gray-500 transition duration-75 ${
                    active === 'Products' ? 'text-white' : ''
                  }`}
                ></i>
                <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  {allProducts.length || 0}
                </span>
              </Link>
            </li>
            <li onClick={(e) => changeActive(e)}>
              <Link
                to="#"
                className={`flex items-center p-2 rounded-lg group ${
                  active === 'Sales' ? 'bg-blue-500 text-white' : ''
                }`}
              >
                <i
                  className={`fas fa-chart-line w-5 h-5 text-gray-500 transition duration-75 ${
                    active === 'Sales' ? 'text-white' : ''
                  }`}
                ></i>
                <span className="flex-1 ms-3 whitespace-nowrap">Sales</span>
              </Link>
            </li>
            <li onClick={(e) => changeActive(e)}>
              <Link
                to="#"
                className={`flex items-center p-2 rounded-lg group ${
                  active === 'Inventory' ? 'bg-blue-500 text-white' : ''
                }`}
              >
                <i
                  className={`fas fa-cubes w-5 h-5 text-gray-500 transition duration-75 ${
                    active === 'Inventory' ? 'text-white' : ''
                  }`}
                ></i>
                <span className="flex-1 ms-3 whitespace-nowrap">Inventory</span>
              </Link>
            </li>
            <li onClick={(e) => changeActive(e)}>
              <Link
                to="#"
                className={`flex items-center p-2 rounded-lg group ${
                  active === 'Reports' ? 'bg-blue-500 text-white' : ''
                }`}
              >
                <i
                  className={`fas fa-chart-bar w-5 h-5 text-gray-500 transition duration-75 ${
                    active === 'Reports' ? 'text-white' : ''
                  }`}
                ></i>
                <span className="flex-1 ms-3 whitespace-nowrap">Reports</span>
              </Link>
            </li>
            <li onClick={logout}>
              <Link
                to="#"
                className={`flex items-center p-2 rounded-lg group ${
                  active === 'Log Out' ? 'bg-blue-500 text-white' : ''
                }`}
              >
                <i
                  className={`fas fa-sign-out-alt w-5 h-5 text-gray-500 transition duration-75 ${
                    active === 'Log Out' ? 'text-white' : ''
                  }`}
                ></i>
                <span className="flex-1 ms-3 whitespace-nowrap">Log Out</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Nav;
