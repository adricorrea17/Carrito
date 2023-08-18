export class Cart {
    constructor(CARTLIST) {
        this.items = [];
        this.total = 0;
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

            this.updateTotalsInView();
            return item;
        } else {
            let quantity = searchItem.quantity + 1;
            this.changeItemQuantity(sku, quantity);

            let INPUTQUANTITY = this.items[sku].element.querySelector('.inputQuantity');
            INPUTQUANTITY.value = parseInt(quantity);

            return searchItem;
        }
    }
    serchItemInCart(sku) {
        return this.items[sku];
    }
    removeItemFromCart(sku) {
        this.items[sku].element.remove();
        delete this.items[sku];
        this.updateTotalsInView();
    }
    updateTotalsInView() {
        let count_of_items = 0;

        for (let i in this.items) { count_of_items++; }

        console.dir(this.items);
        console.dir(count_of_items);

        let DIVS_CART_ITEMS = document.querySelectorAll('.cart-items');

        DIVS_CART_ITEMS.forEach(function (item) {
            item.innerHTML = count_of_items
        });
    }
    changeItemQuantity(sku, quantity) {
        this.items[sku].quantity = quantity
        return;
    }
    createElementItemCart(item) {
        let sku = item.sku;

        let DIV = document.createElement('div');
        DIV.innerHTML = this.itemTemplate(item);

        let BTNTOREMOVECART = DIV.querySelector('.removeItemFromCart');
        BTNTOREMOVECART.addEventListener('click', () => this.removeItemFromCart(sku));

        let INPUTQUANTITY = DIV.querySelector('.inputQuantity');
        INPUTQUANTITY.addEventListener('change', function () {
            item.quantity = parseInt(this.value);
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
                    <th>Precio</th>
                    <th>Color</th>
                    <th>Tamano</th>
                </tr>`;

            for (let i in this.items) {
                let props = this.items[i].product.props
                let item = this.items[i]
                console.dir(item)
                message += `<tr>
                    <td>${props.id}</td>
                    <td>${props.title}</td>
                    <td>${props.price}</td>
                    <td>${item.color.color}</td>
                    <td>${item.size}</td>
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