const ProductReview = artifacts.require("ProductReview");

module.exports = async function (deployer, network, accounts) {
    await deployer.deploy(ProductReview);
    const productReview = await ProductReview.deployed();

    // Test adding a product
    try {
        await productReview.addProduct("Product 1");
        const productsCount = await productReview.getProductsCount();
        console.log(`Number of products: ${productsCount.toNumber()}`);
        if (productsCount.toNumber() !== 1) {
            throw new Error("Product count should be 1");
        }
    } catch (error) {
        console.error("Failed to add product:", error.message);
    }

    // Test adding a review to a product
    try {
        await productReview.addReview(0, "This is a review.");
        const reviewsCount = await productReview.getReviewsCount(0);
        console.log(`Number of reviews for product 0: ${reviewsCount.toNumber()}`);
        if (reviewsCount.toNumber() !== 1) {
            throw new Error("Review count should be 1");
        }
    } catch (error) {
        console.error("Failed to add review:", error.message);
    }

    // Test retrieving a product
    try {
        const product = await productReview.getProduct(0);
        console.log(`Product 0: ${product[0]}, Number of reviews: ${product[1].toNumber()}`);
        if (product[0] !== "Product 1" || product[1].toNumber() !== 1) {
            throw new Error("Product details are incorrect");
        }
    } catch (error) {
        console.error("Failed to retrieve product:", error.message);
    }

    // Test retrieving a review from a product
    try {
        const review = await productReview.getReview(0, 0);
        console.log(`Review 0 for product 0: ${review[0]}, ${review[1]}`);
        if (review[1] !== "This is a review.") {
            throw new Error("Review content is incorrect");
        }
    } catch (error) {
        console.error("Failed to retrieve review:", error.message);
    }
};