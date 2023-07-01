export function camelCase(name) {
  return name.replace(/-([a-z])/g, function(g) {
    return g[1].toUpperCase();
  });
}

export function call(func) {
  if (typeof func === 'function') {
    func();
  }
}

export function $(selector) {
  if (typeof selector !== 'string') {
    return selector;
  }
  return document.querySelector(selector);
}
