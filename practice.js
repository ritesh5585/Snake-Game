// =============================================================

// const arr = [1, 2, 3];
// const newArr = [...arr, 4, 5]; // 12345

// function sum(...numbers) {
//     return numbers.reduce((a, b) => a + b);
// }

// console.log(newArr); // 1, 2, 3, 4, 5
// console.log(sum(1, 2, 3, 4)); // 10

// ==============================================================

// Promise.resolve(1)
//     .then(x => {
//         console.log(x); // 1
//         return x + 1;
//     })
//     .then(x => {
//         console.log(x); // 2
//         return x + 1;
//     })
//     .then(x => console.log(x)); // 3

// =============================================================

// function fetchData(callback) {
//     setTimeout(() => callback({ id: 1 }), 1000);
// }

// fetchData((user) => {
//     fetchData((posts) => {
//         fetchData((comments) => {
//             console.log('Done'); "Done after 3 sec"
//         });
//     });
// });

// fetch vs axios // axios is well optimized to do task with error handling features

// =============================================================

// const nums = [1, 2, 3, 4, 5];

// const mapped = nums.map(x => x * 2);
// const filtered = nums.filter(x => x > 2);
// const reduced = nums.reduce((acc, x) => acc + x, 0);

// console.log(mapped); // 2, 4, 6, 8, 10
// console.log(filtered); // 3, 4, 5
// console.log(reduced); // 15

// ================================================================

// // Object
// const obj = { 'key1': 'value1' };

// // Map
// const map = new Map([['key1', 'value1']]);

// console.log(obj['key1']); // value1
// console.log(map.get('key1')); // value1

// ==============================================================

// const original = { name: 'John', address: { city: 'NYC' } };

// // Shallow copy
// const shallow = { ...original };
// shallow.address.city = 'LA';

// // Deep copy
// const deep = JSON.parse(JSON.stringify(original));
// // kyuki isne dusri string bana kiya
// deep.address.city = 'SF';

// console.log(original.address.city); // LA? 
// console.log(original) // { name: 'John', address: { city: 'LA' } }
// console.log(shallow) // { name: 'John', address: { city: 'LA' } }
// console.log(deep) // { name: 'John', address: { city: 'SF' } }

// ==============================================================

{/* <ul id="list"><li>Item 1</li><li>Item 2</li></ul>

document.getElementById('list').addEventListener('click', (e) => {
    console.log(e.target.textContent);
}); */}

// What happens when you click on <li>?

// const names = ["ritesh", "rahul", "riya"];

// const r = names.filter(name => name[1] === "i")
// console.log(r) // ritesh riya

// ==================================================================

// const products = [
//   { name: "phone", price: 10000 },
//   { name: "laptop", price: 50000 },
//   { name: "tablet", price: 20000 }
// ];

// const tprice = products.reduce((acc, curr) => acc + curr.price, 0)
// console.log(tprice)
// // console.log(products[0].price)

// ====================================================================

// const products = [
//     { name: "phone", price: 10000, inStock: true },
//     { name: "laptop", price: 50000, inStock: false },
//     { name: "tablet", price: 20000, inStock: true },
//     { name: "watch", price: 5000, inStock: true }
// ];

// const inStock = products.filter(product => product.inStock === true)
// console.log(inStock)
// const tprice = inStock.reduce((acc, curr) => acc + curr.price, 0)
// console.log(tprice)

// =====================================================================
// function doSomething(number, callback) {
//   const result = number * 2;
//   callback(result);
// }

// doSomething(5, function(ans) {
//   console.log(ans)
// })

// ==================================================================

// async function foo() {
// console.log('1');
// await Promise.resolve();
// console.log('2');
// }
// foo();
// console.log('3');

// 1 → 3 → 2. foo() starts synchronously and prints 1. await suspends foo — execution returns to caller. Caller prints 3. Then microtask queue runs, foo resumes and prints 2.

// ===================================================================

// async function fetchA() {
//     console.log("A")
// }
// async function fetchB() {
//     console.log("B")
// }

// const results = await Promise.all([fetchA(), fetchB()]);
// // vs
// const a = await fetchA();
// const b = await fetchB();

// Promise.all runs both fetches in PARALLEL — total time = max(A,B). Sequential awaits run one AFTER the other — total time = A + B. If fetchA takes 300ms and fetchB takes 500ms: parallel = 500ms, sequential = 800ms. This is one of the most common backend performance bugs.

// =========================================================================

// async function fetchApi() {
//   const response = await fetch("https://jsonplaceholder.typicode.com/posts")
//   const data = await response.json()
//   console.log(data.filter(arr => arr.userId == 1))
// }

// fetchApi()

// ============================================================================

let prompt = require('prompt-sync')();
let n = Number(prompt("give your number"))

for (let i = 1; i <= 10; i++) {
    console.log(n + "*" + i + "=" + "n*i")
}