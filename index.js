// ===== 設定 =====
const names = [
"有限会社伏見商会 今村大輔 様",
"（株）九州恵商会 原　広志 様",
"ヤブ原 柴崎 様",
"株式会社茶甚 玉寄秀和 様",
"株式会社茶甚 喜納康太 様",
"株式会社ニシイ 松藤洋平 様",
"ヤマエ久野 木本夢心 様",
"（株）熊井産業 島村 様",
"アビックス 高木順次 様",
"株式会社アビックス 小川大将 様",
"ニシイ 柴田英則 様",
"株式会社ニシイ 栗原　秀樹 様",
"金忠 有村忠士 様",
"オチアイ 陣内　均 様",
"（株）ニシイ　北九州支店第一グループ 岡田　賢弥 様",
"（株）ニシイ 太田隆児 様",
"（株）新洋 山内愼之介 様",
"（株）新洋 石原昌尚 様",
"株式会社アビックス 阪倉聖人 様",
"株式会社オチアイ 竹谷昇悟 様",
"株式会社マルシン 林　芳雄 様",
"オチアイ 永渕 様",
"株式会社オチアイ 米光勇樹 様",
"株式会社ニシイ 杉原有香 様",
"株式会社ニシイ 海切千怜 様",
"株式会社　茶甚 小山 幹太 様",
"日曹商事株式会社 村田聡 様",
"株式会社ニシイ 植山 様",
"ニシイ 西井博文 様",
"九州恵商会 井口翔平 様",
"（株）オチアイ 亀崎浩二 様",
"九州恵商会 山浦謙次 様",
"九州恵商会 平野孝 様",
"志岐産業株式会社 志岐和重 様",
"ヤヒロ 八尋大八 様",
"九州恵商会 平野孝 様",
"マルシン 裏川照夫 様",
"野原グループ 上田和明 様",
"株式会社中園 牛島健太郎 様",
];


const list = document.getElementById("list");
const startBtn = document.getElementById("startBtn");
const overlay = document.getElementById("winnerOverlay");
const winnerName = document.getElementById("winnerName");

// ===== リスト生成（無限スクロール用）=====
for (let i = 0; i < 10; i++) {
  names.forEach(name => {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = name;
    list.appendChild(div);
  });
}

let position = 0;
let speed = 300;
let timer = null;

// ===== スタート =====
startBtn.addEventListener("click", start);
function start() {
  clearInterval(timer);
  speed = 100;
  overlay.classList.add("hidden");

  const items = document.querySelectorAll(".item");
  const itemHeight = items[0].offsetHeight;

  // ランダムな開始位置
  const randomIndex = Math.floor(Math.random() * names.length);
  position = -randomIndex * itemHeight;
  list.style.top = position + "px";

  timer = setInterval(() => {
    position -= speed;
    list.style.top = position + "px";

    // 無限スクロール
    if (Math.abs(position) > list.offsetHeight / 2) {
      position = 0;
    }

    // 減速処理（変更なし）
    if (speed > 10) {
      speed *= 0.985;
    } else if (speed > 1) {
      speed *= 0.993;
    } else {
      // ===== 中央停止フェーズ（ここだけ修正） =====
      if (Math.abs(position % itemHeight) < speed) {
        clearInterval(timer);

        // ▼ ここでは一切 position を動かさない
        // ▼ すでに中央に来た瞬間なのでそのまま止める

        setTimeout(() => {
          decideWinner();
        }, 500);
      }
    }
  }, 16);
}

// function start() {
//   clearInterval(timer);
//   speed = 100;
//   overlay.classList.add("hidden");

//   const items = document.querySelectorAll(".item");
//   const itemHeight = items[0].offsetHeight;


// // ランダムな開始位置
// const randomIndex = Math.floor(Math.random() * names.length);
// position = -randomIndex * itemHeight;
// list.style.top = position + "px";

// timer = setInterval(() => {
//   position -= speed;
//   list.style.top = position + "px";

//   // 無限スクロール
//   if (Math.abs(position) > list.offsetHeight / 2) {
//     position = 0;
//   }

//   // 減速処理
//   if (speed > 10) {
//     speed *= 0.985;
//   } else if (speed > 1) {
//     speed *= 0.993;
//   } else {
//     // ===== 完全停止フェーズ =====
//     clearInterval(timer);

//     // ▼ 中央に一番近い行を計算
//     const offset = position % itemHeight;
//     position -= offset;

//     // ▼ ピタッと中央に吸着
//     list.style.top = position + "px";

//     // ▼「止まった感」を作る間
//     setTimeout(() => {
//       decideWinner();
//     }, 500);
//   }
// }, 16);
// }


// ===== 当選判定 =====
function decideWinner() {
  const frame = document.querySelector(".frame");
  const frameRect = frame.getBoundingClientRect();
  const lineY = frameRect.top + frameRect.height / 2;

  const items = document.querySelectorAll(".item");

  let closest = null;
  let minDiff = Infinity;

  items.forEach(item => {
    const rect = item.getBoundingClientRect();
    const center = rect.top + rect.height / 2;
    const diff = Math.abs(center - lineY);

    if (diff < minDiff) {
      minDiff = diff;
      closest = item;
    }
  });

  showWinner(closest.textContent);
}

// ===== 当選演出 =====
function showWinner(name) {
  winnerName.textContent = name;
  overlay.classList.remove("hidden");
}

