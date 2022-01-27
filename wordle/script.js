const a = b = 6;
function renderGr() {
  document.querySelector('#gr').innerHTML = '';
  for(let c = 0; c<a; c++) {
    for(let d = 0; d<b; d++) {
      const f = document.createElement('span');
      f.className = 'g';
      const i = document.createElement('span');
      i.innerText = g[c][d]||'';
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

let h = 0;
const wordlist = [
  'someth',
  'abcdef',
  'ghijkl',
  'mnopqr',
  'stuvwx'
]
const word = wordlist[Math.floor(Math.random() * wordlist.length)];

function makeKeys(layout = "low") {
  let keys = {};
  kb.innerText = "";
  keys.low = ["õwertyuiop", "asdfghjkl", "æœcvbnm", "⇪̃⌫"].map((e) => e.split``);
  keys.up = ["qwērtyūīōp", "āsdfghjkł", "zxcvb̃m", "↥⌫"].map((e) => e.split``);

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
          if(g[h].length === b) return;
          g[h].push(e.target.innerText)
          renderGr();
        };
      }
    });
    if(i === 3) {
      const f = document.createElement('span')
      f.innerText = 'Enter'
      f.className = 'key';
      f.addEventListener('click', () => {
        if(g[h].length !== b) return;
        bg(false)
        if(Array(6).fill(1).every((value, index) => value === check(h)[index])) {
          finish(true);
          return;
        } else if(g[5].length > 0 && g[5].every((value) => value !== 1)) {
          finish(false);
          return;
        }
        h++;
      })
      el.appendChild(f)
    }
  });
}

function finish(aaa) {
  Object.values(document.querySelector('#kb').children).forEach((v, i) => {
    v.style.transition = `opacity .4s ${i/10}s`
    v.style.opacity = 0;
  })
  setTimeout(() => {
    document.querySelector('#kb').innerHTML = '';
    document.querySelector('#kb').style.padding = '1em';

    const a = document.createElement('i');
    a.style.transition = 'opacity .4s';
    a.className = `fas fa-${aaa?'check-circle':'frown'}`;
    a.style.fontSize = '4em';

    const b = document.createElement('h1');
    b.innerText = aaa?'Congratulations!':'Uh-oh'; //translate these

    const c = document.createElement('p');
    c.innerText = aaa?'You have successfully solved the wordle!':'some text here idk';

    a.style.opacity = b.style.opacity = c.style.opacity = 0;
    a.style.transition = b.style.transition = c.style.transition = 'opacity .4s';

    document.querySelector('#kb').appendChild(a);
    document.querySelector('#kb').appendChild(b);
    document.querySelector('#kb').appendChild(c);

    setTimeout(() => {
      a.style.opacity = b.style.opacity = c.style.opacity = 1;
    }, 400)
  }, 1000);
}

function bg(f) {
  g.forEach((_, s) => {
    if(!f||(f&&s<h)){
      check(s).forEach((v, i) => {
        if(s===h) document.querySelector('#gr').children[(s*6)+i].style.transition = `background-color .4s ${i/10}s`
        document.querySelector('#gr').children[(s*6)+i].style.backgroundColor = v===3?'rgba(255, 255, 255, 0.5)':v===2?'rgb(202, 138, 4)':'rgb(21, 128, 61)'
      })
    }
  })
}

function check(h) {
  return g[h].map((v, i) => {
    if(word.charAt(i) === v) return 1;
    if(word.includes(v)) return 2;
    return 3;
  })
}

makeKeys()
renderGr();
