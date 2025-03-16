import { setLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.dataSource = dataSource;
        this.product = {}; // This will store the fetched product details
    }

    async init() {
        // Fetch the product details using the data source
        this.product = await this.dataSource.findProductById(this.productId);

        if (!this.product) {
            console.error("Product not found");
            return;
        }

        // Render the product details on the page
        this.renderProductDetails();

        // Add event listener to the "Add to Cart" button
        document
            .getElementById("addToCart")
            .addEventListener("click", this.addProductToCart.bind(this));
    }

    renderProductDetails() {
        // Get the product details section
        const productDetailContainer = document.getElementById("productDetails");

        if (!productDetailContainer) {
            console.error("Product details container not found!");
            return;
        }

        // Generate the product HTML dynamically
        productDetailContainer.innerHTML = `
            <h2>${this.product.Name}</h2>
            <img src="${this.product.Image}" alt="${this.product.Name}">
            <p>${this.product.Description}</p>
            <p><strong>Price:</strong> $${this.product.Price}</p>
            <button id="addToCart">Add to Cart</button>
        `;
    }

    addProductToCart() {
        setLocalStorage("so-cart", this.product);
        alert(`${this.product.Name} added to cart!`);
    }
}
