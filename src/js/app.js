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
        theCart.modalCheckout()

    //     modal.innerHTML = `<div>
    //             <a href="#close" title="Close" class="close">X</a>
                
    //             <form id="registrationForm">
    //                 <label for="name">Nombre:</label>
    //                 <input type="text" id="name" name="name" required><br><br>

    //                 <label for="email">Correo Electrónico:</label>
    //                 <input type="email" id="email" name="email" required><br><br>

    //                 <label for="password">Contraseña:</label>
    //                 <input type="password" id="password" name="password" required><br><br>

    //                 <label for="creditCard">Número de Tarjeta de Crédito:</label>
    //                 <input type="text" id="creditCard" name="creditCard" required><br><br>

    //                 <label for="cvu">CVU:</label>
    //                 <input type="text" id="cvu" name="cvu" required><br><br>

    //                 <button type="submit">Registrarse</button>
    //             </form>

    //         </div>`
            
    })



});