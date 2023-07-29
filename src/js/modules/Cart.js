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
            <img src="${props.image}"
                alt="" class="h-16 w-16 rounded object-cover" />
            <div>
                <h3 class="text-sm text-gray-900">${props.title}</h3>

            </div>
        </li>`;
        return html;
    }

    pushItem(product) {
        let id = product.props.id;
        let searchItem = this.serchItemInCart(id);

        if(!searchItem) {
            let item = {
                quantity: 1,
                product: product
            };
    
            this.items[id] = item;
            this.createElementItemCart(item)
            
            return item;
        } else {
            let quantity = searchItem.quantity + 1;
            this.changeItemQuantity(id, quantity);


            return searchItem;
        }
    }
    serchItemInCart(id) {
        return this.items[id];
    }
    removeItemFromCart(id) {
        return delete this.items[id];
    }
    changeItemQuantity(id, quantity) {
        return this.items[id].quantity = quantity;
    }
    createElementItemCart(item){
        let DIV = document.createElement('div');
        DIV.innerHTML = this.itemTemplate(item);
        this.CARTLIST.append(DIV)
    }
}