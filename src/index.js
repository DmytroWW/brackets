module.exports = function check(str, bracketsConfig) {
  const otc = new Map();
  const cto = new Map();
  const same = new Set();

  bracketsConfig.forEach(([open, close]) => {
    otc.set(open, close);
    cto.set(close, open);
    if (open === close) {
      same.add(open);
    }
  });

  const stack = [];

  for (const char of str) {
    if (otc.has(char)) {
      if (same.has(char)) {
        if (stack.length > 0 && stack[stack.length - 1] === char) {
          stack.pop();
        } else {
          stack.push(char);
        }
      } else {
        stack.push(char);
      }
    } else if (cto.has(char)) {
      if (stack.length === 0 || stack[stack.length - 1] !== cto.get(char)) {
        return false;
      }
      stack.pop();
    }
  }

  return stack.length === 0;
};
