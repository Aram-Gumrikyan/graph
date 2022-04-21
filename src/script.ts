const calculate = require("../build/Release/calculate");

// const loop = () => {
//   for (let i = 0; i < 100_000_000; i++) {}
// };

console.time("c++");
calculate.calc(10);
console.timeEnd("c++");

// console.time("js");
// loop();
// console.timeEnd("js");
