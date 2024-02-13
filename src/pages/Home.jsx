import React from 'react'
import {Link} from 'react-router-dom'
import User from '../url/User'
const Home = () => {
    const user = User()
  return (
    <>
      <section className="flex justify-center mt-20">
        
<div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div className="flex flex-col items-center py-10">
        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="/profile.png" alt="Bonnie image"/>
        <h5 className="mb-1 text-xl font-medium text-gray-900 uppercase">{user.userName}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">{user.email}</span>
        <div className="flex mt-4 md:mt-6">
            <Link to="/dashboard/add-product" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Add Product</Link>
            <Link to="/dashboard/products" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 ms-3">See all Products</Link>
        </div>
    </div>
</div>

      </section>
    </>
  )
}

export default Home