import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { ProductReviewCont_ABI, ProductReviewCont_ADDRESS } from './config';

const App = () => {
  const [account, setAccount] = useState('');
  const [accounts, setAccounts] = useState([]); 
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [content, setContent] = useState('');
  const [contract, setContract] = useState(null);
  const [showProductInput, setShowProductInput] = useState(false);
  const [showReviewInput, setShowReviewInput] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState('');

  useEffect(() => {
    loadBlockchainData();
    loadProducts();
  }, []);

  useEffect(() => {
    if (contract && selectedProductId !== '') {
      loadReviews(selectedProductId);
    }
  }, [contract, selectedProductId]);

  const loadBlockchainData = async () => {
    try {
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
      const accounts = await web3.eth.getAccounts();
      console.log('Accounts:', accounts);
      setAccounts(accounts); 
      setAccount(accounts[0]);

      const instance = new web3.eth.Contract(ProductReviewCont_ABI, ProductReviewCont_ADDRESS);
      console.log('Contract instance:', instance);
      setContract(instance);
    } catch (error) {
      console.error('Error loading blockchain data:', error);
    }
  };

  const loadProducts = async () => {
    try {
      if (contract) {
        const productsCount = await contract.methods.getProductsCount().call();
        console.log('Products count:', productsCount);
        const productsArray = [];
        for (let i = 0; i < productsCount; i++) {
          const product = await contract.methods.getProduct(i).call();
          productsArray.push({ id: i, name: product[0], reviewsCount: product[1] });
        }
        setProducts(productsArray);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const loadReviews = async (productId) => {
    try {
      if (contract) {
        const reviewsCount = await contract.methods.getReviewsCount(productId).call();
        console.log('Reviews count:', reviewsCount);
        const reviewsArray = [];
        for (let i = 0; i < reviewsCount; i++) {
          const review = await contract.methods.getReview(productId, i).call();
          console.log(`Review ${i}:`, review);
          reviewsArray.push({ reviewer: review[0], content: review[1] });
        }
        setReviews(reviewsArray);
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  };

  const addProduct = async (event) => {
    event.preventDefault();
    try {
      if (contract && content) {
        await contract.methods.addProduct(content).send({ from: account, gas: 800000 });
        loadProducts();
        setContent('');
        alert('Product added successfully');
        setShowProductInput(false);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const addReview = async (event) => {
    event.preventDefault();
    try {
      if (contract && content && selectedProductId !== '') {
        await contract.methods.addReview(selectedProductId, content).send({ from: account, gas: 800000 });
        loadReviews(selectedProductId);
        setContent('');
        alert('Review added successfully');
        setShowReviewInput(false);
      }
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const toggleProductInput = () => {
    setShowProductInput(!showProductInput);
  };

  const toggleReviewInput = () => {
    setShowReviewInput(!showReviewInput);
  };

  return (
    <div>
      <h1>Product Reviews dApp</h1>
      <p>Your Account: {account}</p>
      <label>Change Account</label>
      <select onChange={(e) => setAccount(e.target.value)}>
        {accounts.map((acc, idx) => (
          <option key={idx} value={acc}>{acc}</option>
        ))}
      </select>
      <hr />

      <label>Select Product</label>
      <select onChange={(e) => setSelectedProductId(e.target.value)}>
        <option value="">Select a product</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>{product.name}</option>
        ))}
      </select>
      <button onClick={toggleProductInput}>Add new product</button>
      {showProductInput && (
        <form onSubmit={addProduct}>
          <div>
            <label>Product Name</label>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <button type="submit">Add Product</button>
        </form>
      )}

      <button onClick={toggleReviewInput}>Add new review</button>
      {showReviewInput && (
        <form onSubmit={addReview}>
          <div>
            <label>Review Content</label>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <button type="submit">Add Review</button>
        </form>
      )}

      <h2>All Products</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <p>Product Name: {product.name}</p>
            <p>Reviews: {product.reviewsCount}</p>
            <button onClick={() => setSelectedProductId(product.id)}>Load Reviews</button>
          </li>
        ))}
      </ul>

      <h2>All Reviews</h2>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>
            <p>Reviewer: {review.reviewer}</p>
            <p>Content: {review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;