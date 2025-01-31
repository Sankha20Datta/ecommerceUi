import { useState,useEffect } from "react";
import axios from "axios";

import HeaderComponent from './header'

function ProductCategories (){

    const [categories,setCategories]=useState([]);


    useEffect(() => {
    axios.get("http://localhost:8282/divineshop/product-category?page=0&size=20")
    .then((response) => {
        console.log(response.data._embedded.productcategory)
        setCategories(response.data._embedded.productcategory)
    }) // Log the response data
    .catch((error) => console.log("Error fetching categories:", error));
}, []);

    return(
        <>
        <HeaderComponent/>
        <div className="">
            <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.categoryname} - 
            <a href={category._links.self.href}> View Details</a>
          </li>
        ))}
      </ul>

        </div>
        </>
    )
}

export default ProductCategories;