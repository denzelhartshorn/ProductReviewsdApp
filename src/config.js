

export const ProductReviewCont_ABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "getProductsCount",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "getProduct",
    "outputs": [
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "reviews",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_name",
        "type": "string"
      }
    ],
    "name": "addProduct",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_productId",
        "type": "uint256"
      },
      {
        "name": "_content",
        "type": "string"
      }
    ],
    "name": "addReview",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_productId",
        "type": "uint256"
      }
    ],
    "name": "getReviewsCount",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_productId",
        "type": "uint256"
      },
      {
        "name": "_reviewIndex",
        "type": "uint256"
      }
    ],
    "name": "getReview",
    "outputs": [
      {
        "name": "reviewer",
        "type": "address"
      },
      {
        "name": "content",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

export const ProductReviewCont_ADDRESS = '0xcAf9fE2142b1c46711f1dc2F98f307b582c99b12';