// ルートノードの取得
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
// 入力内容変更イベント（DVD盤面印刷）
// 入力内容変更イベント（写真スキャニング）


// イベントハンドラ

// ページの読み込み完了時に呼び出されるイベントハンドラ
function onPageLoad(event) {
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