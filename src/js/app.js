import { Product } from './modules/Product.js';
import { Cart } from './modules/Cart.js';

window.addEventListener("DOMContentLoaded", (event) => {
    const PRODUCTS = document.getElementById('productsList');
    const CARTLIST = document.getElementById('CartList');

    const theCart = new Cart(CARTLIST);

    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(json => {
            for (let thisProduct of json) {
                let currentPoduct = new Product(thisProduct, theCart);

                PRODUCTS.append(currentPoduct.element);
            }
        });
});