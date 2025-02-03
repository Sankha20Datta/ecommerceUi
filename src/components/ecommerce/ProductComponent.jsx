import { useState, useEffect } from "react";
import axios from "axios";

function ProductComponent({ selectedCategory }) {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    // Fetch products when selected category or page changes
    useEffect(() => {
        if (selectedCategory === 0) return;  // Prevent fetching when no category is selected

        const url = `http://localhost:8282/divineshop/products/search/findByCategoryId?id=${selectedCategory}&page=${currentPage}&size=50`;
        console.log("Fetching products from:", url); // Check URL updates on button click

        axios.get(url)
            .then((response) => {
                console.log("Fetched Products:", response.data);
                setProducts(response.data._embedded.products || []);
                setTotalPages(response.data.page.totalPages);
            })
            .catch((error) => console.log("Error fetching products:", error));
    }, [selectedCategory, currentPage]);

    // Handle page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="col-md-10 border">
            <h3>Products for Category: {selectedCategory}</h3>
            
            <div className="row product-container">
                {products.map((product) => (
                    <div className="col-md-3" key={product.id}>
                        <div className="card product-card">
                            <img src={product.imgurl} alt={product.name} className="img-fluid card-img-top" />
                            <div className="card-body">
                                <h6 className="productName">{product.name}</h6>
                                <p className="product-price">${product.unitprice}</p>
                                <div align="center">
                                    <button className="cart-btn">ADD TO CART</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="pagination-controls mt-3">
                {currentPage > 0 && (
                    <button className="btn btn-secondary" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                )}
                <span className="mx-3">Page {currentPage + 1} of {totalPages}</span>
                {currentPage < totalPages - 1 && (
                    <button className="btn btn-secondary" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                )}
            </div>
        </div>
    );
}

export default ProductComponent;
