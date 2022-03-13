let num = 32 / 13;
console.log(num)(() => {
  let x, y;
  try {
    throw new Error();
  } catch (x) {
    (x = 1), (y = 2);
    console.log(x);
  }
  console.log(x);
  console.log(y);
})();

function* generator(i) {
  yield i;
  yield i * 2;
}

const gen = generator(10);

console.log(gen.next().value);
console.log(gen.next().value);

let person = { name: "lydia" };
const members = [person];
person = null;
console.log(members, "members");

const [apple, ...remains] = ["apple", "watermelon", "banana"];
console.log(remains);
const { apple, ...remains } = {
  apple: 123,
  banana: "香蕉",
  wk: "walker",
};
console.log(remains);

let original = {
  c: 3,
  d: 4,
  f: 5
};

let now = {
  c: 33,
  d: '11d这里我4 1不1想1赋2值',
  g: 66
};
let key = 'd';
let { [key]: test, ...newData } = now;
console.log(newData, 'data');
console.log(test, 'test');

let res = {
  ...original,
  ...newData
};
console.log(newData, 'newData');
console.log(res, 'res');


const [apple, watermelon = "watermelond", banana] = ["apple", , "banana"];
console.log(watermelon);