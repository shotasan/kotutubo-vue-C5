// ルートノードの取得。
var app = document.querySelector("#app");
const TAX_RATE = 0.1;

// イベントハンドラの割り当て

// ページ読み込み完了時のイベント
window.addEventListener("load", onPageLoad, false);

// 入力内容変更イベント（DVD仕上がり予定日）
app.querySelector("#delivery_date").addEventListener("change", onInputChange, false);

// 入力内容変更イベント（BGM手配）
app.querySelector("#opt1").addEventListener("change", onInputChange, false);

// 入力内容変更イベント（撮影）
app.querySelector("#opt2").addEventListener("change", onInputChange, false);

// 入力内容変更イベント（DVD盤面印刷）
app.querySelector("#opt3").addEventListener("change", onInputChange, false);

// 入力内容変更イベント（写真スキャニング）
// スピンボタン付入力欄のため、入力値を変更した時にイベントが発生するようにする
app.querySelector("#opt4").addEventListener("input", onInputChange, false);



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
function onInputChange(event) {
  updateForm();
}


// 関数

// 金額の表示を更新する関数
function updateForm() {
  // 金額の再計算
  // 表示を更新
}

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