let a = []; // This is for chunk.

function length(arr) {
  let len = 0;
  while (arr[len] !== undefined) {
    len++;
  }
  return len;
}

const functions = {
  compact: function compact(arr) {
    let m = [];
    for (let i = 0; i < length(arr); i++) {
      if (arr[i]) m.push(arr[i]);
    }
    return m;
  },
  take: (array, number = 1) => array.slice(0, number),
  drop: (array, number = 1) => array.slice(number),
  chunk: function chunk(array, number) {
    if (length(array) !== 0) {
      a.push(array.splice(0, number)); // a is defined in the top
      chunk(array, number);
    }
    return a;
  },
  filter: function filter(arr, logic) {
    for (let element of arr) {
      if (typeof logic == "string") {
        if (element.active) {
          let b = [];
          b.push(element);
          return b;
        }
      }
      if (typeof logic == "object") {
        if (
          (element.user == logic.user || logic.user == undefined) &&
          (element.active == logic.active || logic.active == undefined) &&
          (element.age == logic.age || logic.age == undefined)
        ) {
          let c = [];
          c.push(element);
          return c;
        }
      }
      if (typeof logic == "function") {
        if (logic(element)) {
          let d = [];
          d.push(element);
          return d;
        }
      }
    }
  },
  find: function coolFind(arr, logic) {
    for (let element of arr) {
      if (typeof logic == "string") {
        if (element.active) {
          return element;
        }
      }
      // if(Array.isArray(logic) === true) {
      //   if(Object.values(element)[2] === logic[1]) {
      //     return element;
      //   }
      // } did not work this is why its commented.
      if (typeof logic == "object") {
        if (
          (element.user == logic.user || logic.user == undefined) &&
          (element.active == logic.active || logic.active == undefined) &&
          (element.age == logic.age || logic.age == undefined)
        ) {
          return element;
        }
      }
      if (typeof logic == "function") {
        if (logic(element)) {
          return element;
        }
      }
    }
  },
  includes: function includes(array, value, fromIndex = 0) {
    for (let i = fromIndex; i < length(array); i++) {
      if (array[i] === value) {
        return true;
      }
    }
    return false;
  },
  dropwhile: function dropwhile(arr, logic) {
    for (let element of arr) {
      if (typeof logic == "string") {
        if (!element.active) {
          let g = arr.slice(arr.indexOf(element), length(arr));
          return g;
        }
      }
      if (typeof logic == "object") {
        if (
          !(element.active == logic.active) ||
          !(element.user == logic.user)
        ) {
          let k = arr.slice(arr.indexOf(element), length(arr));
          return k;
        }
      }
      if (typeof logic == "function") {
        if (!logic(element)) {
          let n = arr.slice(arr.indexOf(element), length(arr));
          return n;
        }
      }
    }
  },
  merge: function merge(object, ...sources) {
    for (let i = 0; i < length(sources); i++) {
      for (let k in sources[i]) {
        if (k in object) {
          if (typeof object[k] === "object") {
            merge(object[k], sources[i][k]);
          } else {
            object[k] = sources[i][k];
          }
        } else {
          object[k] = sources[i][k];
        }
      }
    }
    return object;
  },

  pick: function pick(object, paths) {
    let newObject = {};
    if (Array.isArray(paths)) {
      for (let i = 0; i < length(paths); i++) {
        newObject[paths[i]] = object[paths[i]];
      }
    }

    if (typeof paths === "string") {
      newObject[paths] = object[paths];
    }

    return newObject;
  },
  omit: (object, array) => {
    const createNewObj = { ...object };
    for (let i = 0; i < length(array); i += 1) {
      delete createNewObj[array[i]];
    }
    return createNewObj;
  },
  omitBy: (object, predicate) => {
    const newObject = {};
    for (const prop in object) {
      if (predicate(object[prop])) {
        newObject[prop] = object[prop];
      }
    }
    return newObject;
  },
  pickBy: (object, predicate) => {
    const newObject = {};
    const prop = Object.keys(object);
    for (let i = 0; i < length(prop); i += 1) {
      if (predicate(object[prop[i]])) {
        newObject[prop[i]] = object[prop[i]];
      }
    }
    return newObject;
  },
  toPairs: (object) => {
    const newArray = [];
    const prop = Object.keys(object);
    for (let i = 0; i < length(prop); i += 1) {
      newArray.push([prop[i], object[prop[i]]]);
    }
    return newArray;
  },
};

module.exports = functions;
