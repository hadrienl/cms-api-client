function getKey(name) {
  return `cache:${name}`;
}

function loadFromStorage(name) {
  const saved = localStorage[getKey(name)];
  try {
    return new Map(JSON.parse(saved));
  } catch (e) {
    return new Map();
  }
}

function saveToStorage(name, cache) {
  localStorage[getKey(name)] = JSON.stringify(Array.from(cache));
}

function clearStorage(name) {
  localStorage.removeItem(getKey(name));
}

export class Cache {
  cache = loadFromStorage(this.name);

  constructor(name) {
    this.name = name;
  }

  get(key) {
    return this.cache.get(key);
  }

  set(key, value) {
    this.cache.set(key, value);
    saveToStorage(this.name, this.cache);
  }

  clear() {
    this.cache.clear();
    clearStorage(this.name);
  }
}

export default Cache;
