(function(){
  const display = document.getElementById('display');
  let expr = '';

  function updateDisplay() {
    display.value = expr === '' ? '0' : expr;
  }

  function append(value) {
    // Prevent invalid sequences like multiple dots in a number segment
    // Simple heuristic: allow anything — final evaluation will validate.
    expr += value;
    updateDisplay();
  }

  function clearAll() {
    expr = '';
    updateDisplay();
  }

  function backspace() {
    expr = expr.slice(0, -1);
    updateDisplay();
  }

  function sanitizeExpression(s) {
    // only allow digits, operators, parentheses, decimal point and spaces
    // replace unicode operator symbols with JS operators
    s = s.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
    if (!/^[0-9+\-*/().\s]*$/.test(s)) return null;
    // basic parentheses balance check
    let depth = 0;
    for (let ch of s) {
      if (ch === '(') depth++;
      if (ch === ')') depth--;
      if (depth < 0) return null;
    }
    if (depth !== 0) return null;
    return s;
  }

  function calculate() {
    const sanitized = sanitizeExpression(expr);
    if (sanitized === null) {
      display.value = 'Error';
      expr = '';
      return;
    }
    try {
      // Evaluate in a safer way than plain eval: use Function constructor
      // (still executes JS; we ensured input only contains safe chars)
      const result = Function('return (' + sanitized + ')')();
      if (result === Infinity || result === -Infinity || Number.isNaN(result)) {
        display.value = 'Error';
        expr = '';
        return;
      }
      expr = String(result);
      updateDisplay();
    } catch (e) {
      display.value = 'Error';
      expr = '';
    }
  }

  // Handle button clicks
  document.body.addEventListener('click', function(e){
    const btn = e.target.closest('button');
    if (!btn) return;
    const val = btn.getAttribute('data-value');
    const action = btn.getAttribute('data-action');
    if (val !== null) {
      append(val);
    } else if (action === 'clear') {
      clearAll();
    } else if (action === 'back') {
      backspace();
    } else if (action === 'equals') {
      calculate();
    }
  });

  // Keyboard support
  window.addEventListener('keydown', function(e){
    const key = e.key;
    if ((/^[0-9]$/).test(key) || '+-*/().'.includes(key)) {
      e.preventDefault();
      append(key);
      return;
    }
    if (key === 'Enter') { e.preventDefault(); calculate(); return; }
    if (key === 'Backspace') { e.preventDefault(); backspace(); return; }
    if (key === 'Escape') { e.preventDefault(); clearAll(); return; }
  });

  // initialize
  clearAll();
})();