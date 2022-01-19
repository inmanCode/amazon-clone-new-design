// const getcartItems = () => {
//   db.collection('cart-items').onSnapshot((Snapshot) => {
//     let totalCount = 0;
//     Snapshot.forEach((doc) => {
//       totalCount += doc.data().quantity;
//     });
//     setCartCounter(totalCount);
//   });
// };

// const setCartCounter = (totalCount) => {
//   document.querySelector('.cart_number').innerText = totalCount;
// };
// getcartItems();
const name = 'Rachel';

const age = 31;

const person = { name, age };

console.log(person);
