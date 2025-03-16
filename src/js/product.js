import { setLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Get product ID from URL parameters
const productId = getParam("product");

// Create a new instance of ProductData for "tents" category
const dataSource = new ProductData("tents");

// Create a new ProductDetails instance and initialize it
const product = new ProductDetails(productId, dataSource);
product.init();

// Function to add product to cart
function addProductToCart(product) {
    setLocalStorage("so-cart", product);
    alert(`${product.Name} has been added to your cart!`);
}

// Add event listener for "Add to Cart" button
async function addToCartHandler(e) {
    const product = await dataSource.findProductById(e.target.dataset.id);
    if (product) {
        addProductToCart(product);
    } else {
        console.error("Product not found.");
    }
}

// Wait for DOM to load before adding event listener
document.addEventListener("DOMContentLoaded", () => {
    const addToCartButton = document.getElementById("addToCart");
    if (addToCartButton) {
        addToCartButton.addEventListener("click", addToCartHandler);
    } else {
        console.error("Add to Cart button not found!");
    }
});
