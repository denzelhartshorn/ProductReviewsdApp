// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductReview {
    struct Review {
        address reviewer;
        string content;
    }

    struct Product {
        string name;
        Review[] reviews;
    }

    Product[] public products;

    function addProduct(string memory _name) public {
        require(bytes(_name).length > 0, "Product name cannot be empty.");
        // Initialize an empty array of reviews
        Product storage newProduct = products.push();
        newProduct.name = _name;
    }

    function addReview(uint _productId, string memory _content) public {
        require(_productId < products.length, "Product does not exist.");
        require(bytes(_content).length > 0, "Review content cannot be empty.");
        products[_productId].reviews.push(Review({
            reviewer: msg.sender,
            content: _content
        }));
    }

    function getProduct(uint _index) public view returns (string memory, uint) {
        require(_index < products.length, "Product index out of bounds.");
        Product storage product = products[_index];
        return (product.name, product.reviews.length);
    }

    function getReview(uint _productId, uint _reviewIndex) public view returns (address, string memory) {
        require(_productId < products.length, "Product does not exist.");
        Product storage product = products[_productId];
        require(_reviewIndex < product.reviews.length, "Review index out of bounds.");
        Review storage review = product.reviews[_reviewIndex];
        return (review.reviewer, review.content);
    }

    function getProductsCount() public view returns (uint) {
        return products.length;
    }

    function getReviewsCount(uint _productId) public view returns (uint) {
        require(_productId < products.length, "Product does not exist.");
        Product storage product = products[_productId];
        return product.reviews.length;
    }
}