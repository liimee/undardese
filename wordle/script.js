function renderGr() {
  document.querySelector('#gr').innerHTML = '';
  const a = b = 6;
  for(let c = 0; c<a; c++) {
    for(let d = 0; d<b; d++) {
      const f = document.createElement('span');
      f.className = 'g';
      f.innerText = g[c][d]||'';
      document.querySelector('#gr').appendChild(f)
    }
  }
}

let g = [
  [],
  [],
  [],
  [],
  [],
  []
]

renderGr();

let h = 0;

function makeKeys(layout = "low") {
  let keys = {};
  kb.innerText = "";
  keys.low = ["õwertyuiop", "asdfghjkl", "æœcvbnm", "⇪̃⌫"].map((e) => e.split``);
  keys.up = ["qwērtyūīōp", "āsdfghjkł", "zxcvb̃m", "↥⌫"].map((e) => e.split``);

  keys[layout].forEach((e) => {
    let el = document.createElement("div");
    el.classList.add("key-row");
    kb.appendChild(el);
    e.forEach((ch) => {
      let cel = document.createElement("span");
      cel.classList.add("key");
      cel.innerText = ch;
      el.appendChild(cel);
      if (ch == "⌫") {
        cel.onclick = () => {
          g[h].pop();
          renderGr();
        };
      } else if (ch == "⇪" || ch == "↥") {
        cel.onclick = () => {
          makeKeys(layout == "up" ? "low" : "up");
        };
      } else {
        cel.onclick = (e) => {
          if(g[h].length === b) return;
          g[h].push(e.target.innerText)
          renderGr();
        };
      }
    });
  });
}

makeKeys()
