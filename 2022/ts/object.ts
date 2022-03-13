const o: {
  a: string;
  b?: {
    c: string;
  };
} = { a: "1" };

console.log(o.b.c);
