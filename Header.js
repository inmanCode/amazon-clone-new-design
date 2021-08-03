const getcartItems = () => {
  db.collection('cart-items').onSnapshot((Snapshot) => {
    let totalCount = 0;
    Snapshot.forEach((doc) => {
      totalCount += doc.data().quantity;
    });
    setCartCounter(totalCount);
  });
};

const setCartCounter = (totalCount) => {
  document.querySelector('.cart_number').innerText = totalCount;
};
getcartItems();
