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
                    <div class="block h-4 w-4 mb-2 cursor-pointer rounded-full bg-[${ item.product.colors[ item.product.getColor() ].hex }]">
                    <span class="sr-only"> ${ item.product.colors[ item.product.getColor() ].color } </span>
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
                product: product
            };


            this.items[sku] = item;
            this.createElementItemCart(this.items[sku])


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

        return delete this.items[sku];
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
            BTNTOREMOVECART.addEventListener('click', () => this.removeItemFromCart(sku) );
        
        let INPUTQUANTITY = DIV.querySelector('.inputQuantity');
            INPUTQUANTITY.addEventListener('change', function() {
                item.quantity = parseInt(this.value);
            });

        this.CARTLIST.append(DIV)
        item.element = DIV;
        return this.items[sku];
    }
}