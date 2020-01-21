// ルートノードの取得。
var app = document.querySelector("#app");
const TAX_RATE = 0.1;

// イベントハンドラの割り当て

// ページ読み込み完了時のイベント
window.addEventListener("load", onPageLoad, false);

// 入力内容変更イベント（DVD仕上がり予定日）
app.querySelector("#delivery_date").addEventListener("change", onInputChanged, false);

// 入力内容変更イベント（BGM手配）
app.querySelector("#opt1").addEventListener("change", onInputChanged, false);

// 入力内容変更イベント（撮影）
app.querySelector("#opt2").addEventListener("change", onInputChanged, false);

// 入力内容変更イベント（DVD盤面印刷）
app.querySelector("#opt3").addEventListener("change", onInputChanged, false);

// 入力内容変更イベント（写真スキャニング）
// スピンボタン付入力欄のため、入力値を変更した時にイベントが発生するようにする
app.querySelector("#opt4").addEventListener("input", onInputChanged, false);



// イベントハンドラ

// ページの読み込み完了時に呼び出されるイベントハンドラ
function onPageLoad(event) {
  // フォームコントロールを取得
  var wedding_date = app.querySelector('#wedding_date');
  var delivery_date = app.querySelector('#delivery_date');

  // 今日の日付
  var dt = new Date();

  // 挙式日に2ヶ月後の日付を設定
  dt.setMonth(dt.getMonth() + 2);
  wedding_date.value = formatDate(dt);

  // DVD仕上がり予定日に挙式日の１週間前の日付を設定
  dt.setDate(dt.getDate() - 7);
  delivery_date.value = formatDate(dt);

  // DVD仕上がり予定日に翌日以降しか入力できないようにする
  // inputtype='date'のmin属性を利用する
  delivery_date.setAttribute('min', tommorow());

  // フォームの表示を更新
  updateForm();
}

// 入力内容変更時のイベントハンドラ
function onInputChanged(event) {
  updateForm();
}


// 関数


// 日付をフォーマットするメソッド
function formatDate(dt) {
  var y = dt.getFullYear();
  // getMonthは0からスタートのため１を足す
  // 桁数を２に揃えるため０を頭に付けてから下2桁を切り出す
  var m = ('00' + (dt.getMonth() + 1)).slice(-2);
  var d = ('00' + dt.getDate()).slice(-2);
  return (`${y}-${m}-${d}`);
}

// 明日の日付をフォーマットするメソッド
function tommorow() {
  var dt = new Date();
  dt.setDate(dt.getDate() + 1);
  return formatDate(dt);
}

// 税込計算処理
function incTax(untaxed) {
  return Math.floor(untaxed * (1 + TAX_RATE));
}

// 金額表示フォーマット
function number_format(val) {
  return val.toLocaleString();
}

// 日付の差を求める関数
function getDateDiff(dateString1, dateString2) {
  var date1 = new Date(dateString1);
  var date2 = new Date(dateString2);

  var msDiff = date1.getTime() - date2.getTime();

  return Math.ceil(msDiff / (1000 * 60 * 60 * 24));
}

// 再計算した基本料金を返す
function taxedBasePrice() {
  var addPrice = 0;
  var delivery_date = app.querySelector('#delivery_date');
  var dateDiff = getDateDiff(delivery_date.value, (new Date()).toLocaleString());

  if (21 <= dateDiff && dateDiff < 30) {
    addPrice = 5000;
  }
  else if (14 <= dateDiff && dateDiff < 21) {
    addPrice = 10000;
  }
  else if (7 <= dateDiff && dateDiff < 14) {
    addPrice = 15000;
  }
  else if (3 <= dateDiff && dateDiff < 7) {
    addPrice = 20000;
  }
  else if (dateDiff == 3) {
    addPrice = 40000;
  }
  else if (dateDiff == 2) {
    addPrice = 45000;
  }
  else if (dateDiff == 1) {
    addPrice = 50000;
  }
  return incTax(30000 + addPrice);
}

// 再計算したオプション料金を返す
function taxedOptPrice() {
  var optPrice = 0;

  var opt1 = app.querySelector('#opt1');
  var opt2 = app.querySelector('#opt2');
  var opt3 = app.querySelector('#opt3');
  var opt4 = app.querySelector('#opt4');

  if (opt1.checked) { optPrice += 5000; }
  if (opt2.checked) { optPrice += 5000; }
  if (opt3.checked) { optPrice += 5000; }
  if (opt4.value == '') { opt4 = 0; }
  optPrice += opt4.value * 500;
  return incTax(optPrice);
}

// 金額の表示を更新する関数
function updateForm() {
  // フォームコントロールを取得
  var sum_base = app.querySelector('#sum_base');
  var sum_opt = app.querySelector('#sum_opt');
  var sum_total = app.querySelector('#sum_total');

  // 金額の再計算
  var basePrice = taxedBasePrice();
  var optPrice = taxedOptPrice();
  console.log(optPrice)
  var totalPrice = basePrice + optPrice;

  // 表示を更新
  sum_base.value = number_format(basePrice);
  sum_opt.value = number_format(optPrice);
  sum_total.value = number_format(totalPrice);
}
