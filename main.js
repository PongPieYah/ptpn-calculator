const display = document.getElementById("display");
let isOperatorInput = true;

/**
 * 数式文字列を数字部分と演算子部分に分けて、それぞれ配列に格納したものを返す
 * @param {string} str 文字列
 * @returns {[string[], string[]]}
 */
const separateValsAndOpes = (str) => {
  let key = 0;
  const valueStrs = [""];
  const operators = [];
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    switch (char) {
      case "+":
      case "-":
      case "*":
      case "/":
        operators[key] = char;
        key++;
        valueStrs[key] = "";
        break;
      default:
        valueStrs[key] += char;
    }
  }

  return [valueStrs, operators];
};

const calc = () => {
  const [valueStrs, operators] = separateValsAndOpes(display.innerHTML);
  // 数字部分の配列は計算用に数字型に変換しておく
  const values = valueStrs.map((x) => Number(x));
  // 初期値として数字配列の最初の値を取得
  let calculated = values.shift();
  operators.forEach((operator, index) => {
    const value = values[index];
    switch (operator) {
      case "+":
        calculated += value;
        break;
      case "-":
        calculated -= value;
        break;
      case "*":
        calculated *= value;
        break;
      case "/":
        calculated /= value;
        break;
    }
  });

  return calculated;
};

// 数字ボタンを押した時のイベント
document.getElementsByName("number").forEach((e) => {
  e.addEventListener("click", () => {
    isOperatorInput = false;
    display.innerHTML += e.innerHTML;
  });
});

// "=" を除く演算子ボタンを押した時のイベント
document.getElementsByName("operator").forEach((e) => {
  e.addEventListener("click", () => {
    // 連続で演算子ボタンが押された場合は処理しない
    if (isOperatorInput) return;
    isOperatorInput = true;
    display.innerHTML += e.innerHTML;
  });
});

// "=" を押した時のイベント
document.getElementById("calc").addEventListener("click", () => {
  isOperatorInput = false;
  display.innerHTML = calc(display.innerHTML);
});

// AC を押した時のイベント
document.getElementById("clear").addEventListener("click", () => {
  isOperatorInput = true;
  // 初期値は "0"
  display.innerHTML = "0";
});
