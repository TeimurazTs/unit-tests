const functions = require("./functions");

let users = [
  { user: "barney", age: 36, active: true },
  { user: "fred", age: 40, active: false },
  { user: "pebbles", age: 1, active: true },
]; // This is for find

let usersFilter = [
  { user: "barney", age: 36, active: true },
  { user: "fred", age: 40, active: false },
]; // This is for filter

let usersDropWhile = [
  { user: "barney", active: false },
  { user: "fred", active: false },
  { user: "pebbles", active: true },
];

test("remove falsie values", () => {
  expect(functions.compact([0, 1, false, 2, "", 3])).toStrictEqual([1, 2, 3]);
});

test("Creates a new array with given number of", () => {
  expect(functions.take([1, 2, 3])).toStrictEqual([1]);
  expect(functions.take([1, 2, 3], 2)).toStrictEqual([1, 2]);
  expect(functions.take([1, 2, 3], 5)).toStrictEqual([1, 2, 3]);
  expect(functions.take([1, 2, 3], 0)).toStrictEqual([]);
});

test("drop", () => {
  expect(functions.drop([1, 2, 3])).toStrictEqual([2, 3]);
  expect(functions.drop([1, 2, 3], 2)).toStrictEqual([3]);
  expect(functions.drop([1, 2, 3], 5)).toStrictEqual([]);
  expect(functions.drop([1, 2, 3], 0)).toStrictEqual([1, 2, 3]);
});

test("creates arrays from an array", () => {
  expect(functions.chunk(["a", "b", "c", "d"], 2)).toStrictEqual([
    ["a", "b"],
    ["c", "d"],
  ]);
  // expect(functions.chunk(['a', 'b', 'c', 'd'], 3)).toStrictEqual([['a', 'b', 'c'], ['d']]);
});

test("works like JS filter", () => {
  expect(
    functions.filter(usersFilter, function (o) {
      return !o.active;
    })
  ).toStrictEqual([{ user: "fred", age: 40, active: false }]);
  expect(
    functions.filter(usersFilter, { age: 36, active: true })
  ).toStrictEqual([{ user: "barney", age: 36, active: true }]);
  // expect(functions.filter(userFilter, ['active', false])).toStrictEqual([{ 'user': 'fred',   'age': 40, 'active': false }]);
  expect(functions.filter(usersFilter, "active")).toStrictEqual([
    { user: "barney", age: 36, active: true },
  ]);
});

test("works like JS find", () => {
  expect(
    functions.find(users, function (o) {
      return o.age < 40;
    })
  ).toStrictEqual({ user: "barney", age: 36, active: true });
  expect(functions.find(users, { age: 1, active: true })).toStrictEqual({
    user: "pebbles",
    age: 1,
    active: true,
  });
  // expect(functions.find(users, ['active', false])).toStrictEqual({ 'user': 'fred',    'age': 40, 'active': false });
  expect(functions.find(users, "active")).toStrictEqual({
    user: "barney",
    age: 36,
    active: true,
  });
});

test('test of "includes" function', () => {
  expect(functions.includes([1, 2, 3], 1)).toStrictEqual(true);
  expect(functions.includes([1, 2, 3], 1, 2)).toStrictEqual(false);
  expect(functions.includes(["a", "b", "c", "d"], "b")).toStrictEqual(true);
});

test("dropwhile", () => {
  expect(functions.dropwhile(usersDropWhile, "active")).toStrictEqual([
    { user: "barney", active: false },
    { user: "fred", active: false },
    { user: "pebbles", active: true },
  ]);
  // expect(functions.dropwhile(usersDropWhile,['active', false])).toStrictEqual([{ 'user': 'pebbles', 'active': true }]);
  expect(
    functions.dropwhile(usersDropWhile, function (o) {
      return !o.active;
    })
  ).toStrictEqual([{ user: "pebbles", active: true }]);
  expect(
    functions.dropwhile(usersDropWhile, { user: "barney", active: false })
  ).toStrictEqual([
    { user: "fred", active: false },
    { user: "pebbles", active: true },
  ]);
});

test("merge", () => {
  expect(
    functions.merge({ a: [{ b: 2 }, { d: 4 }] }, { a: [{ c: 3 }, { e: 5 }] })
  ).toStrictEqual({
    a: [
      { b: 2, c: 3 },
      { d: 4, e: 5 },
    ],
  });
});

test("pick", () => {
  expect(functions.pick({ a: 1, b: "2", c: 3 }, ["a", "c"])).toStrictEqual({
    a: 1,
    c: 3,
  });
});
test("omit", () => {
  expect(functions.omit({ a: 1, b: "2", c: 3 }, ["a", "c"])).toEqual({
    b: "2",
  });
});
test("omitBy", () => {
  const object = { a: 1, b: 2, c: 3, d: 4, e: 5 };
  const functionOmit = (value) => !(value > 2);
  expect(functions.omitBy(object, functionOmit)).toEqual({ a: 1, b: 2 });
});
test("pickby", () => {
  expect(
    functions.pickBy({ a: 1, b: "2", c: 3 }, (x) => typeof x === "number")
  ).toEqual({
    a: 1,
    c: 3,
  });
  expect(
    functions.pickBy({ a: 1, b: "2", c: 3 }, (x) => typeof x === "string")
  ).toEqual({
    b: "2",
  });
});
test("toPairs", () => {
  function Foo() {
    this.a = 1;
    this.b = 2;
  }
  Foo.prototype.c = 3;
  expect(functions.toPairs(new Foo())).toEqual([
    ["a", 1],
    ["b", 2],
  ]);
});
