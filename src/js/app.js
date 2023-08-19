import { Product } from './modules/Product.js';
import { Cart } from './modules/Cart.js';

window.addEventListener("DOMContentLoaded", (event) => {
    const PRODUCTS = document.getElementById('productsList');
    const CARTLIST = document.getElementById('CartList');

    const theCart = new Cart(CARTLIST);

    window.theCart = theCart;
    
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(json => {
            for (let thisProduct of json) {
                let currentPoduct = new Product(thisProduct, theCart);

                PRODUCTS.append(currentPoduct.element);
            }
        });
        
    const checkoutModal = document.querySelector('.checkoutModal');
    const modal = document.querySelector('.modalmask');

    const sideBar = document.getElementById('sideBar');
    const btnCart = document.getElementById('btnCart');
    const closeCart = document.querySelector('.toggleCart');
    let isClosed = false;

    function toogleSidebar(closedInFn) {
        if( !closedInFn ) {
            const widthSideBar = sideBar.offsetWidth
            sideBar.style.left = -widthSideBar + 'px';
            sideBar.style.position = 'absolute';
            btnCart.classList.remove('hidden');
            closedInFn = true
        } else {
            sideBar.style.left = '0px';
            sideBar.style.position = 'relative';
            btnCart.classList.add('hidden')
            closedInFn = false
        }
        return closedInFn;
    }

    closeCart.addEventListener('click', () => {
        isClosed = toogleSidebar(isClosed);
    });
    btnCart.addEventListener('click', () => {
        isClosed = toogleSidebar(isClosed);
    });

    

    checkoutModal.addEventListener('click', () => {
        theCart.modalCheckout();            
    })



});