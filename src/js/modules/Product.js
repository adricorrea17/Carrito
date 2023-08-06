export class Product {
    constructor(props,cart) {
      this.props = props;
      this.element = this.createElement();
      this.Cart = cart;
      this.styles = `
        <style>
          .Product input + label {
            opacity: .5;
            transition: all .9s ease;
          }
          .Product input:checked + label {
            opacity: 1;
            box-shadow: 2px 2px 2px gray;
            transform: scale(1.2)
          }
        </style>
      `;

      document.head.insertAdjacentHTML('beforeend', this.styles);
    }

    template() {
      let html = `
          <form class="group relative block overflow-hidden Product">
              <button type="button" class="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
                  <span class="sr-only">Wishlist</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
              </button>
              <img src="${this.props.image}" alt="" class="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72" />
              <div class="relative border border-gray-100 bg-white p-6">
                  <span class="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium">
                  New
                  </span>
                  <h3 class="mt-4 text-lg font-medium text-gray-900 mb-2"> ${this.props.title} </h3>

                  <div class="flex justify-between mb-2">
                    <div class="mt-1.5 flex gap-1">
                      <fieldset>
                        <legend class="sr-only">Color</legend>
                      </fieldset>
              
                      <div
                        class="flex flex-wrap justify-center gap-1 [&:hover_label]:opacity-75"
                      >
                        <div>
                          <input type="radio" checked name="color" value="Gray" id="ColorSg${this.props.id}" class="sr-only" />
              
                          <label
                            for="ColorSg${this.props.id}"
                            class="block h-4 w-4 cursor-pointer rounded-full bg-[#595759] transition"
                          >
                            <span class="sr-only"> Space Gray </span>
                          </label>
                        </div>
              
                        <div>
                          <input type="radio" name="color" value="Silver" id="ColorS${this.props.id}" class="sr-only" />
              
                          <label
                            for="ColorS${this.props.id}"
                            class="block h-4 w-4 cursor-pointer rounded-full bg-[#d2d3d4] transition"
                          >
                            <span class="sr-only"> Silver </span>
                          </label>
                        </div>
              
                        <div>
                          <input type="radio" name="color" value="Pink" id="ColorP${this.props.id}" class="sr-only" />
              
                          <label
                            for="ColorP${this.props.id}"
                            class="block h-4 w-4 cursor-pointer rounded-full bg-[#d89f97] transition"
                          >
                            <span class="sr-only"> Pink </span>
                          </label>
                        </div>
              
                        <div>
                          <input type="radio" name="color" value="Green" id="ColorG${this.props.id}" class="sr-only" />
              
                          <label
                            for="ColorG${this.props.id}"
                            class="block h-4 w-4 cursor-pointer rounded-full bg-[#afbfab] transition"
                          >
                            <span class="sr-only"> Green </span>
                          </label>
                        </div>
              
                        <div>
                          <input type="radio" name="color" value="Blue" id="ColorSb${this.props.id}" class="sr-only" />
              
                          <label
                            for="ColorSb${this.props.id}"
                            class="block h-4 w-4 cursor-pointer rounded-full bg-[#91a5bb] transition "
                          >
                            <span class="sr-only"> Blue </span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="sizes flex gap-2">
                      <div>
                        <input type="radio" id="SizeS${this.props.id}" name="size" value="S" class="sr-only" />
            
                        <label
                          for="SizeS${this.props.id}"
                          class="block h-6 w-6 cursor-pointer text-center line-height-6 text-black transition display-block bg-gray-400"
                        >
                          S 
                        </label>
                      </div>
                      <div>
                        <input type="radio" checked id="SizeM${this.props.id}" name="size" value="M" class="sr-only" />
            
                        <label
                          for="SizeM${this.props.id}"
                          class="block h-6 w-6 cursor-pointer text-center line-height-6 text-black transition display-block bg-gray-400"
                        >
                          M
                        </label>
                      </div>
                      <div>
                        <input type="radio" id="SizeL${this.props.id}" name="size" value="L" class="sr-only" />
            
                        <label
                          for="SizeL${this.props.id}"
                          class="block h-6 w-6 cursor-pointer text-center line-height-6 text-black transition display-block bg-gray-400"
                        >
                          L
                        </label>
                        </div>
                      </div>
                    </div>
                  <p class="mt-1.5 text-sm text-gray-700">$ ${this.props.price}</p>
                  
                  <button type="button" class="addItemToCart mt-4 block w-full rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105">
                      Add to Cart
                  </button>
              </div>
          </form>
      `;
      return html;
    }
  
    createElement() {
      let DIV = document.createElement('div');
      DIV.innerHTML = this.template();
  
      let BTNTOADDCART = DIV.querySelector('.addItemToCart');
  
      BTNTOADDCART.addEventListener('click', () => {

            let color = DIV.querySelector('input[name="color"]:checked').value
            let size = DIV.querySelector('input[name="size"]:checked').value
            console.dir(color)
            console.dir(size)

        this.Cart.pushItem( this );
      });
  
      return DIV;
    }

}