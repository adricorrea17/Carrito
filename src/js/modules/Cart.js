export class Cart {
    constructor(CARTLIST) {
        this.items = [];
        this.subtotal = 0;
        this.discounts = 0;
        this.iva = 0;
        this.total = 0;
        this.totalDescounted = 0;
        this.tax = 0.21;
        this.count_of_items = 0;
        this.CARTLIST = CARTLIST;
    }
    itemTemplate(item) {
        let props = item.product.props;
        let html = `
        <li class="flex items-center gap-4">
            <button class="removeItemFromCart">X</button>
            <img src="${props.image}"
                alt="" class="h-16 w-16 rounded object-cover" />
                    <input
                    type="number"
                    min="${item.quantity}"
                    value="1"
                    class="inputQuantity h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                />

                <h3 class="text-sm text-gray-900">${props.title}</h3>
                <div>
    
                <div class="flex">
                    <div class="block h-4 w-4 mb-2 cursor-pointer rounded-full bg-[${item.product.colors[item.product.getColor()].hex}]">
                    <span class="sr-only"> ${item.product.colors[item.product.getColor()].color} </span>
                    </div>
                </div>
                <div>
               
                <div class="block h-6 w-6 cursor-pointer text-center line-height-6 text-black transition display-block bg-gray-400"
                >
                  ${item.product.getSize()} 
                </div>
              </div>
              </div>
            </div>
        </li>`;
        return html;
    }
    pushItem(product) {
        let sku = product.getSKU();
        let searchItem = this.serchItemInCart(sku);

        if (!searchItem) {
            let item = {
                sku: sku,
                quantity: 1,
                product: product,
                color: product.colors[ product.getColor() ],
                size: product.getSize()
            };
            

            this.items[sku] = item;
            this.createElementItemCart(this.items[sku])

            this.updateTotal();
            return item;
        } else {
            let quantity = searchItem.quantity + 1;
            this.changeItemQuantity(sku, quantity);

            let INPUTQUANTITY = this.items[sku].element.querySelector('.inputQuantity');
            INPUTQUANTITY.value = parseInt(quantity);
            
            this.updateTotal();
            return searchItem;
        }
    }
    changeDiscount(discount = 0){
        if(discount > 100) {
            return 0;
        }
        this.discounts = discount;
        this.updateTotal();
        
        return 1;
    }
    serchItemInCart(sku) {
        return this.items[sku];
    }
    removeItemFromCart(sku) {
        this.items[sku].element.remove();
        delete this.items[sku];
        this.updateTotal();
    }
    priceToHuman(price) {
        var roundedPrice = price.toFixed(2);
        return "$" + roundedPrice;
    }
    updateTotal() {
        let count_of_items = 0;
        let subtotal = 0;

        // recorremos items para contabilizar
        for (let i in this.items) {
            count_of_items++; 
            subtotal += this.items[i].product.props.price * this.items[i].quantity;
        }

        this.count_of_items = count_of_items;

        this.subtotal = subtotal;
        
        this.totalDescounted = this.discounts / 100 * this.subtotal;
        subtotal = subtotal -this.totalDescounted;

        this.iva = subtotal * this.tax;
        this.total = subtotal + this.iva;
        


        this.updateTotalsInView();

    }
    updateTotalsInView() {
        // cambiamos los valores en el document
        let DIVS_CART_ITEMS = document.querySelectorAll('.cart-items');
        let DIVS_CART_TOTAL = document.querySelectorAll('.cartTotals');
        let _this = this;

        let templateTotals = ` 
            <dl class="space-y-0.5 text-sm text-gray-700">
                <div class="flex justify-between">
                <dt>Subtotal</dt>
                <dd>${this.priceToHuman(this.subtotal)}</dd>
                </div>
                `;
                
            if( this.discounts ){
                templateTotals +=`
                <div class="flex justify-between">
                <dt>Descuentos</dt>
                <dd>${this.discounts}% (${this.priceToHuman(this.totalDescounted)})</dd>
                </div>`;
            }
        templateTotals += `
                <div class="flex justify-between">
                <dt>IVA</dt>
                <dd>${this.priceToHuman(this.iva)}</dd>
                </div>


                <div class="flex justify-between !text-base font-medium">
                <dt>Total</dt>
                <dd>${this.priceToHuman(this.total)}</dd>
                </div>
            </dl>`;
        
        DIVS_CART_TOTAL.forEach(function (div) {
            div.innerHTML = templateTotals
        });
    
    
        DIVS_CART_ITEMS.forEach(function (div) {
            div.innerHTML = _this.count_of_items
        });
    
        
    }
    changeItemQuantity(sku, quantity) {
        this.items[sku].quantity = quantity
        return;
    }
    createElementItemCart(item) {
        let sku = item.sku;
        let _this = this;

        let DIV = document.createElement('div');
        DIV.innerHTML = this.itemTemplate(item);

        let BTNTOREMOVECART = DIV.querySelector('.removeItemFromCart');
        BTNTOREMOVECART.addEventListener('click', () => this.removeItemFromCart(sku));

        let INPUTQUANTITY = DIV.querySelector('.inputQuantity');
        INPUTQUANTITY.addEventListener('change', function () {
            item.quantity = parseInt(this.value);
            _this.updateTotal();
        });

        this.CARTLIST.append(DIV)
        item.element = DIV;
        return this.items[sku];
    }
    modalCheckout() {
        const { value: formValues } = Swal.fire({
            title: 'Multiple inputs',
            html:
                'Nombre <input id="swal-input1" class="swal2-input">' +
                'Apellido <input id="swal-input2" class="swal2-input">' +
                'Email <input id="swal-input3" class="swal2-input">',
            focusConfirm: false,
        }).then((result) => {

            let firstname = document.getElementById('swal-input1').value;
            let lastname = document.getElementById('swal-input2').value;
            let email = document.getElementById('swal-input3').value;

            let message = `
                <b>Nombre:</b> ${firstname} <br>
                <b>Apellido:</b> ${lastname} <br>
                <b>Email:</b> ${email}

                <p>
                <b>Items:</b>
                <table>
                <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Color</th>
                    <th>Tamaño</th>
                    <th>Precio</th>
                </tr>`;

            for (let i in this.items) {
                let props = this.items[i].product.props
                let item = this.items[i]
                console.dir(item)
                message += `<tr>
                    <td>${props.id}</td>
                    <td>${props.title}</td>
                    <td>${item.color.color}</td>
                    <td>${item.size}</td>
                    <td>${props.price}</td>
                  </tr>`;

            }

            message += `</table>`;

            Swal.fire({
                title: 'Genial',
                width: '80%',
                html: 'Se envió el siguiente pedido: <br>' + message,
                icon: 'success'
            });
        })


    }
}