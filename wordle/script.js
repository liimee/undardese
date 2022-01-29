const a = 6,
b = 6;

let fnish = false;

document.getElementById("gr").style.gridTemplateColumns =
document.getElementById("gr").style.gridTemplateAreas =
`repeat(${a}, 4em)`

function renderGr() {
  document.querySelector('#gr').innerHTML = '';
  for (let c = 0; c < a; c++) {
    for (let d = 0; d < b; d++) {
      const f = document.createElement('span');
      f.className = 'g';
      if(d === g[h].length-1 && c === h) f.style.animation = 's .25s';
      const i = document.createElement('span');
      i.innerText = g[c][d] || '';
      i.style.verticalAlign = 'middle';
      f.appendChild(i)
      document.querySelector('#gr').appendChild(f)
    }
  }
  bg(true)
}

let g = [
  [],
  [],
  [],
  [],
  [],
  []
]

let keys = {};
keys.low = ["wertyuiop", "asdfghjkl", "æœcvbnm", "⇪̃⌫"].map((e) => e.split``);
keys.up = ["qwērtyūīōp", "āsdfghjkł", "zxcvb̃m", "↥⌫"].map((e) => e.split``);
keys.low[0].unshift("õ");

let h = 0;

var word = wordlist[Math.floor(Math.random() * wordlist.length)];
function makeKeys(layout = "low") {
  kb.innerText = "";
  keys[layout].forEach((e, i) => {
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
          if (g[h].length === b && e.target.innerText != "̃" || fnish) return;
          if (e.target.innerText == "̃")
          g[h][g[h].length - 1] += e.target.innerText
          else g[h].push(e.target.innerText)
          renderGr();
        };
      }
    });
    if (i === 3) {
      const f = document.createElement('span')
      f.innerText = 'Enter'
      f.className = 'key';
      f.addEventListener('click', () => enter())
      el.appendChild(f)
    }
  });
}

function enter() {
  if (g[h].length !== b) {
    err('ełthnge pathādh');
    return;
  };
  if (!wordlist.includes(g[h].join(''))) {
    err('avārthe patyallelle');
    return;
  }
  bg(false)
  if (Array(6).fill(1).every((value, index) => value === check(h)[index])) {
    finish(true);
    return;
  } else if (g[5].length > 0 && g[5].every((value) => value !== 1)) {
    finish(false);
    return;
  }
  h++;
}

window.addEventListener('keydown', e => {
  if(fnish) return;
  if (e.key === 'Backspace') {
    g[h].pop();
    renderGr();
  } else if (e.key === 'Enter') {
    enter()
  } else {
    if (![].concat.apply([], keys.low).includes(e.key) && ![].concat.apply([], keys.up).includes(e.key)) return;
    if (g[h].length === b && e.key != "̃") return;
    if (e.key == "̃")
    g[h][g[h].length - 1] += e.key
    else g[h].push(e.key)
    renderGr();
  }
})

function finish(aaa) {
  fnish = true;
  Object.values(document.querySelector('#kb').children).forEach((v, i) => {
    v.style.transition = `opacity .4s ${i / 10}s`
    v.style.opacity = 0;
  })
  setTimeout(() => {
    document.querySelector('#kb').innerHTML = '';
    document.querySelector('#kb').style.padding = '1em';

    const a = document.createElement('i');
    a.className = `fas fa-${aaa ? 'check-circle' : 'frown'}`;
    a.style.fontSize = '4em';

    const b = document.createElement('h1');
    b.innerText = aaa ? 'vāłthnge!' : 'aīo!'; //translate these

    const c = document.createElement('p');
    c.innerText = aaa ? 'vārthekandpudipe mudchtīnge!' : 'nīng ivāti thōthtīnge!';//the last line needs to be a reset button (but same word still)

    const d = document.createElement('button');
    d.innerText = 'nnōrvāti myārchikrīnglā?';
    d.addEventListener('click', () => {
      fnish = false;
      g = [
        [],
        [],
        [],
        [],
        [],
        []
      ];
      h = 0;
      word = wordlist[Math.floor(Math.random() * wordlist.length)];
      renderGr();
      a.style.opacity = b.style.opacity = c.style.opacity = d.style.opacity = 0;
      setTimeout(() => {
        document.querySelector('#kb').style.padding = 0;
        a.remove();
        b.remove();
        c.remove();
        d.remove();
        makeKeys();
      }, 400)
    })

    a.style.opacity = b.style.opacity = c.style.opacity = d.style.opacity = 0;
    a.style.transition = b.style.transition = c.style.transition = d.style.transition = 'opacity .4s';

    document.querySelector('#kb').appendChild(a);
    document.querySelector('#kb').appendChild(b);
    document.querySelector('#kb').appendChild(c);
    document.querySelector('#kb').appendChild(d);

    setTimeout(() => {
      a.style.opacity = b.style.opacity = c.style.opacity = d.style.opacity = 1;
    }, 400)
  }, 1000);
}

function bg(f) {
  g.forEach((_, s) => {
    if (!f || (f && s < h)) {
      check(s).forEach((v, i) => {
        if (s === h) document.querySelector('#gr').children[(s * a) + i].style.transition = `background-color .4s ${i / 10}s`
        document.querySelector('#gr').children[(s * a) + i].style.backgroundColor = v === 3 ? 'rgba(255, 255, 255, 0.5)' : v === 2 ? 'rgb(202, 138, 4)' : 'rgb(21, 128, 61)'
      })
    }
  })
}

function check(h) {
  const e = {}
  return g[h].map((v, i) => {
    e[v] = (e[v]||0)+1;
    if (splitWord()[i] === v) {
      e[v]--;
      return 1
    }

    if (e[v] <= find(v).length && !find(v).every(ve => g[h][ve] === v)) {
      return 2
    }
    return 3;
  })
}


function splitWord() {
  var arr = []
  word.split``.forEach(e => {
    if (e == "̃") {
      arr[arr.length - 1] += e
    } else {
      arr.push(e)
    }
  })
  return arr
}

function find(w) {
  let startIndex = 0;
  const i = [];
  while ((index = word.indexOf(w, startIndex)) > -1) {
    i.push(index);
    startIndex = index + w.length;
  }
  return i;
}

function err(t) {
  document.querySelector('#er').innerText = t;
  document.querySelector('#er').style.opacity = '1';
  setTimeout(() => document.querySelector('#er').style.opacity = '0', 2000);
}

makeKeys()
renderGr();
