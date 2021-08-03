function getItems() {
  db.collection('items')
    .get()
    .then((querySnapshot) => {
      let items = [];
      querySnapshot.forEach((doc) => {
        items.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      generateItems(items);
    });
}
const addToCart = (item) => {
  let cartItem = db.collection('cart-items').doc(item.id);
  cartItem.get().then((doc) => {
    doc.exists
      ? cartItem.update({ quantity: doc.data().quantity + 1 })
      : cartItem.set({
          img: item.img,
          name: item.name,
          make: item.make,
          rating: item.rating,
          price: item.price,
          quantity: 1,
        });
  });
};
const generateItems = (items) => {
  items.forEach((item) => {
    let doc = document.createElement('div');
    doc.classList.add('main_product', 'mr-5');
    doc.innerHTML = `<div class="product_image w-48 h-22 bg-white rounded-lg">
    <img
      class="w-full f-full object-contain p-4"
      src='${item.img}'
      alt=""
    />
  </div>
  <div class="product_name text-gray-700 font-bold mt-2 text-sm">
    ${item.name}
  </div>
  <div class="poduct_make text-green-700">${item.make}</div>
  <div class="product_rate text-yellow-300 my-1">
    ⭐⭐⭐⭐ ${item.rating}
  </div>
  <div class="product_price text-gray-700 text-lg font-bold">
  ${numeral(item.price).format('$0,0.00')}
  </div>
 `;
    let AddToCart = document.createElement('div');
    AddToCart.classList.add(
      'add_to_cart',
      'h-8',
      'w-28',
      'bg-yellow-500',
      'flex',
      'items-center',
      'justify-center',
      'text-white',
      'rounded',
      'cursor-pointer',
      'text-md',
      'hover:bg-yellow-600'
    );
    AddToCart.innerText = 'Add to cart';
    AddToCart.addEventListener('click', () => {
      addToCart(item);
    });
    doc.appendChild(AddToCart);
    document.querySelector('.main_section_products').appendChild(doc);
  });
};
getItems();
