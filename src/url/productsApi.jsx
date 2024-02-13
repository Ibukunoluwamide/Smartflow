import axios from "axios";
import { useEffect, useState } from "react";
import backendUrl from "./backendUrl";

const useAllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
      axios.get(`${backendUrl}/products.php`)
        .then((result) => {
        //   console.log(result.data.data);
          setAllProducts(result.data.data);
        })
        .catch((err) => {
          console.error("Error fetching products:", err);
        });
  }, []);

  return allProducts;
};

export default useAllProducts;
