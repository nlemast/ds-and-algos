/*
Learn Lodash: _.find, Find a Value in an Array or Object
According to the lodash documentation, _.find Iterates over elements of collection, returning the first element predicate returns truthy for. The predicate is invoked with three arguments: (value, index|key, collection).

Arguments
collection (Array or Object): The collection to inspect.
[predicate=_.identity] function, object, array or string
[fromIndex=0] (number): The index to search from.
Recreate lodash's _.find using vanilla JavaScript.

The difference between lodash _.find and the JavaScript find method is that the JavaScript method can only be applied to arrays and can only receive a callback function like so: array.find(d => d.isTheBest). The lodash find method can be called on both arrays and objects and can receive a function, an object, or an array which it uses to perform the search.

Like so:

_.find(array, {isTheBest: true})

_.find(array, "isBest")

_.find(array, ["isBest", true])
Examples
var users = [
  { "user": "barney",  "age": 36, "active": true },
  { "user": "fred",    "age": 40, "active": false },
  { "user": "pebbles", "age": 1,  "active": true }
]

find(users, function(o) { return o.age < 40; }) ➞ object for "barney"

find(users, { "age": 1, "active": true }) ➞ object for "pebbles"

find(users, ["active", false]) ➞ object for "fred"

find(users, "active") ➞ object for "barney"
Notes
Do not attempt to import lodash; you are simply writing your own version.
This entire series of challenges can be found here.
*/

const find = (collection, predicate, startIndex = 0) => {
  const isArray = Array.isArray(collection);
  const collectionToIterate = isArray ? collection.slice(startIndex) : Object.keys(collection);

  for (let i = 0; i < collectionToIterate.length; i++) {
    const item = isArray ? collectionToIterate[i] : collection[collectionToIterate[i]];

    if (typeof predicate === 'string') {
      if (predicate === item || item[predicate]) {
        return item;
      }
    }

    if (Array.isArray(predicate)) {
      const [key, value] = predicate;

      if (item[key] === value) {
        return item;
      }
    }

    if (typeof predicate === 'object') {
      const predicateKeys = Object.keys(predicate);

      const hasSameKeysAndValues = predicateKeys.every((key) => {
        return item.hasOwnProperty(key) && item[key] === predicate[key];
      });

      if (hasSameKeysAndValues) {
        return item;
      }
    }

    if (predicate.call && predicate.apply) {
      if (predicate(item)) {
        return item;
      }
    }
  }
};

var users = [
  { user: 'barney', age: 36, active: true },
  { user: 'fred', age: 40, active: false },
  { user: 'pebbles', age: 1, active: true },
];

const test = find(users, ['active', false]);

console.log(test);
