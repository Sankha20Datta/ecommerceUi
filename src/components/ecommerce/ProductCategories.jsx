import { useState, useEffect } from "react";
import axios from "axios";

import HeaderComponent from './header';
import FooterComponent from './footer';
import ProductComponent from './ProductComponent';

import './ecommerce.css';

function ProductCategories() {
    const [categories, setCategories] = useState([]);
    const [productcategoryId, setCategoryId] = useState(1);

    useEffect(() => {
        axios.get("http://localhost:8282/divineshop/product-category?page=0&size=20")
            .then((response) => {
                setCategories(response.data._embedded.productcategory);
            })
            .catch((error) => console.log("Error fetching categories:", error));
    }, []);

    return (
        <>
            <HeaderComponent />
            <div className="row mt-3">
                <div className="col-md-2 border ">
                    <ul>
                        {categories.map((category) => (
                            <div key={category.id}>
                                <button className="btn bg-transparent" onClick={() => setCategoryId(category.id)}>
                                    {category.categoryname}
                                </button>
                            </div>
                        ))}
                    </ul>
                </div>
                <ProductComponent selectedCategory={productcategoryId} />
            </div>
            <FooterComponent />
        </>
    );
}

export default ProductCategories;
