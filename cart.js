const getCartItems = () => {
  db.collection('cart-items').onSnapshot((snapshot) => {
    let cartItems = [];
    snapshot.docs.forEach((doc) => {
      cartItems.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    generateCartItems(cartItems);
    getTotalCost(cartItems);
  });
};

const getTotalCost = (cartItems) => {
  let totalCost = 0;
  cartItems.forEach((item) => {
    totalCost += item.price * item.quantity;
  });
  document.querySelector('.total_cost_number').innerText =
    numeral(totalCost).format('$0,0.00');
};

const decreaseCount = (itemId) => {
  let cartItem = db.collection('cart-items').doc(itemId);
  cartItem.get().then((item) => {
    if (item.exists && item.data().quantity > 1) {
      cartItem.update({
        quantity: item.data().quantity - 1,
      });
    }
  });
};
const increaseCount = (itemId) => {
  let cartItem = db.collection('cart-items').doc(itemId);
  cartItem.get().then((item) => {
    if (item.exists) {
      cartItem.update({
        quantity: item.data().quantity + 1,
      });
    }
  });
};
const deleteItem = (itemId) => {
  db.collection('cart-items').doc(itemId).delete();
};
const generateCartItems = (cartItems) => {
  let itemsHtml = '';
  cartItems.forEach((item) => {
    itemsHtml += `<div
    class="cart_item flex items-center pb-4 border-b border-gray-100"
  >
    <div class="item_img w-40 h-24 bg-white p-4 rounded-lg">
      <img
        class="w-full h-full object-contain"
        src=${item.img}
        alt=""
      />
    </div>
    <div class="cart_item_details flex-grow">
      <div class="item_title font-bold text-sm text-gray-600">
       ${item.name}
      </div>
      <div class="item_brand text-sm text-gray-400">${item.make}</div>
    </div>
    <div class="cart_item_counter w-48 flex items-center">
      <div
      data-id='${item.id}'
        class="
          chavon_left
          cursor-pointer
          text-gray-400
          bg-gray-100
          rounded
          h-6
          w-6
          flex
          items-center
          justify-center
          hover:bg-gray-200
          mr-2
          cart-items-decrease
        "
      >
        <i class="fas fa-chevron-left fa-xs"></i>
      </div>
      <h4 class="text-gray-400">x${item.quantity}</h4>
      <div
      data-id='${item.id}'
        class="
          chavon_right
          cursor-pointer
          text-gray-400
          bg-gray-100
          rounded
          h-6
          w-6
          flex
          items-center
          justify-center
          hover:bg-gray-200
          ml-2
          cart-items-increase
        "
      >
        <i class="fas fa-chevron-right fa-xs"></i>
      </div>
    </div>
    <div class="cart_item_cost w-48 font-bold text-gray-500">
      ${numeral(item.price * item.quantity).format('$0,0.00')}
    </div>
    <div
      class="
        cart_item_delete
        w-10
        font-bold
        text-gray-400
        cursor-pointer
        hover:text-gray-500
        
      "
      data-id='${item.id}'
    >
      <i class="fas fa-times fa-xs"></i>
    </div>
  </div>`;
  });
  document.querySelector('.cart_items').innerHTML = itemsHtml;
  createEventListeners();
};
const createEventListeners = () => {
  let decreaseButtons = document.querySelectorAll('.cart-items-decrease');
  let increaseButtons = document.querySelectorAll('.cart-items-increase');
  let deleteButtons = document.querySelectorAll('.cart_item_delete');
  decreaseButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      decreaseCount(btn.dataset.id);
    });
  });
  increaseButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      increaseCount(btn.dataset.id);
    });
  });
  deleteButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      deleteItem(btn.dataset.id);
    });
  });
};
getCartItems();
