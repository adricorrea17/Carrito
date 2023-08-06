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

            </div>
        </li>`;
        return html;
    }

    pushItem(product) {
        let id = product.props.id;
        let searchItem = this.serchItemInCart(id);

        if (!searchItem) {
            let item = {
                quantity: 1,
                product: product
            };

            this.items[id] = item;
            this.createElementItemCart(this.items[id])


            return item;
        } else {
            let quantity = searchItem.quantity + 1;
            this.changeItemQuantity(id, quantity);

            let INPUTQUANTITY = this.items[id].element.querySelector('.inputQuantity');
                INPUTQUANTITY.value = parseInt(quantity);

            return searchItem;
        }
    }
    serchItemInCart(id) {
        return this.items[id];
    }
    removeItemFromCart(id) {
        this.items[id].element.remove();

        return delete this.items[id];
    }
    changeItemQuantity(id, quantity) {
        this.items[id].quantity = quantity
        return;
    }
    createElementItemCart(item) {
        let id = item.product.props.id;

        let DIV = document.createElement('div');
            DIV.innerHTML = this.itemTemplate(item);

        let BTNTOREMOVECART = DIV.querySelector('.removeItemFromCart');
            BTNTOREMOVECART.addEventListener('click', () => this.removeItemFromCart(id) );
        
        let INPUTQUANTITY = DIV.querySelector('.inputQuantity');
            INPUTQUANTITY.addEventListener('change', function() {
                item.quantity = parseInt(this.value);
            });

        this.CARTLIST.append(DIV)
        item.element = DIV;

        return this.items[id];
    }
}