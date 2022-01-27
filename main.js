if(!localStorage.getItem('t')) localStorage.setItem('t', 5)

var data = {
  basics1: [
    [
      'far fa-hand-point-down noun',
      'dhœ',
      'this (noun)'
    ],
    [
      'far fa-hand-point-right noun',
      'adhœ',
      'that (noun)'
    ],
    [
      'far fa-hand-point-down adj',
      'ndhe',
      'this (adj.)'
    ],
    [
      'far fa-hand-point-right adj',
      'andhe',
      'that (adj.)'
    ],
    [
      'far fa-thumbs-up',
      'seri',
      'okay'
    ]
  ],
  basics2: [
    [
      'fas fa-binoculars',
      'pār',
      'see'
    ],
    [
      'fas fa-utensils',
      'sapd',
      'eat'
    ],
    [
      'fas fa-comment-alt',
      'sol',
      'say'
    ],
    [
      'fas fa-comment',
      'pēs',
      'speak'
    ],
    [
      'fas fa-wine-glass',
      'kudi',
      'drink'
    ]
  ],
  basics3: [
    [
      'fas fa-user',
      'nī',
      'you (sing.)'
    ],
    [
      'fas fa-user-circle',
      'nā',
      'me'
    ],
    [
      'fas fa-check',
      'ã',
      'yes'
    ],
    [
      'fas fa-times',
      'lle',
      'no'
    ],
    [
      'fas fa-expand-arrows-alt',
      'perye',
      'big'
    ],
    [
      'fas fa-compress-arrows-alt',
      'chinne',
      'small'
    ]
  ],
  data: {
    basics1: ['Basics 1', 'far fa-sun'],
    basics2: ['Basics 2', 'fas fa-walking'],
    basics3: ['Basics 3', 'fas fa-users']
  }
}

var f = {};

function renderC() {
  document.querySelector('.chl').innerHTML = '';
  Object.keys(data.data).forEach(v => {
    const s = document.createElement('span');
    s.className = 'les';
    s.addEventListener('click', () => course(data[v]))
    const t = document.createElement('div')
    t.innerText = data.data[v][0];
    s.appendChild(t)
    const x = document.createElement('div');
    //feel free to change the maths, I'm not good at it hehehhe
    x.innerText = `should take ~${Math.round(data[v].length*Number(localStorage.getItem('t'))/60)} minutes, based on my awful calculations`;
    x.style.maxWidth = '80%';
    s.appendChild(x);
    const u = document.createElement('div');
    s.appendChild(u)
    const w = document.createElement('i');
    w.className = data.data[v][1];
    u.appendChild(w)
    document.querySelector('.chl').appendChild(s);
  })
}

function course(obj) {
  f = {
    a: 0,
    b: []
  };
  le = true;
  document.querySelector('#par').style.display = 'block';
  setTimeout(() => {
    document.querySelector('#mainwin').style.left = 0;
  }, 50);
  var things = {};
  obj.forEach(v => {
    things[v[1]] = {
      meaning: v[2],
      icon: v[0],
      score: 0
    }
  });
  doThing(things);
}

async function doThing(obj) {
  for (let v in obj) {
    f.a = 0;
    const y = setInterval(() => f.a++, 1000);
    if (obj[v].score == 0) {
      await info({
        name: v,
        thing: obj
      });
      clearInterval(y);
      f.b.push(f.a);
      break;
    } else if (obj[v].score != 5) {
      if (Math.random() < 0.5) {
        var ar = [
          {
            correct: true,
            val: v
          }
        ]
        var keys = Object.keys(obj);
        keys.splice(keys.indexOf(v), 1);
        document.querySelector('#content').innerHTML = '<div id="stuff" style="animation: zi .5s"><b>' + obj[v].meaning + '</b></div>';
        var g = keys[Math.floor(Math.random() * (keys.length))];
        ar.push({
          correct: false,
          val: g
        })
        var e = await askQuestion(ar);
        obj[v].score += e;
        clearInterval(y);
        f.b.push(f.a);
        doThing(obj);
      } else {
        var keys = Object.values(obj);
        var a = keys.map(v => { if (v.score > 0) return v.icon });
        a = a.filter(n => n);
        a = a[Math.floor(Math.random() * a.length)];
        var b = Object.keys(obj);
        b = b[Math.floor(Math.random() * (b.length))];
        var c = obj[b].icon == a;
        var d = await askQuestion2(a, b, c);
        obj[v].score += d;
        clearInterval(y);
        f.b.push(f.a);
        doThing(obj);
      }
      break;
    } else if (Object.keys(obj)[Object.keys(obj).length - 1] == v) {
      clearInterval(y);
      document.querySelector('#content').innerText = 'We\'re done!';
      document.querySelector('#content').style.animation = 'zi .5s';
      console.log(f.b)
      localStorage.setItem('t', f.b.reduce((a, b) => a + b, 0) / f.b.length)
      renderC();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }
}

function exit() {
  le = false;
  document.querySelector('#mainwin').style.left = '-105%';
  setTimeout(() => {
    document.querySelector('#par').style.display = 'none';
  }, 400);
}

async function info(object) {
  var v = object.thing[object.name];
  document.querySelector('#content').innerHTML = `<div id="stuff" style="animation: zi .5s"><i class="${v.icon}"></i><div><b>${object.name}</b></div><div class="meaning">${v.meaning}</div></div>`;
  await addOkBtn();
  object.thing[object.name].score++;
  doThing(object.thing);
}

function addOkBtn() {
  return new Promise((a, b) => {
    let g = document.createElement('button');
    g.className = 'okbtn';
    g.innerText = 'Oh!';
    g.onclick = () => {
      block();
      document.querySelector('#stuff').style.transform = 'scale(0)';
      document.querySelector('#stuff').style.animation = 'zo .5s';
      g.style.animation = 'zo .5s';
      setTimeout(() => {
        g.remove();
        a();
        unblock();
      }, 501);
    }
    document.querySelector('#content').appendChild(g);
  });
}

function askQuestion(a) {
  return new Promise((b, c) => {
    for (let i = a.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = a[i];
      a[i] = a[j];
      a[j] = temp;
    }
    let f = document.createElement('div');
    f.style.position = 'absolute';
    f.style.bottom = 0;
    f.style.width = '100%';
    f.style.display = 'flex';
    f.style.justifyContent = 'space-evenly';
    document.querySelector('#content').appendChild(f);
    a.forEach(v => {
      var g = document.createElement('button');
      g.className = 'btns';
      g.style.width = '100%';
      g.style.margin = '10px';
      g.innerHTML = v.val;
      g.onclick = () => {
        block();
        document.querySelector('#stuff').style.transform = 'scale(0)';
        document.querySelector('#stuff').style.animation = 'zo .5s';
        f.style.animation = 'zo .5s';
        setTimeout(() => {
          document.querySelector('#stuff').innerHTML = v.correct ? '<i style="font-size: 1.9em" class="fas fa-check-circle"></i>' : '<i style="font-size: 1.9em" class="fas fa-times-circle"></i>';
          document.querySelector('#stuff').style.transform = 'scale(1)';
          document.querySelector('#stuff').style.animation = 'zi .5s';
          setTimeout(() => {
            document.querySelector('#stuff').style.transform = 'scale(0)';
            document.querySelector('#stuff').style.animation = 'zo .5s';
            setTimeout(() => {
              document.querySelector('#stuff').innerHTML = '';
              document.querySelector('#stuff').style.transform = 'scale(1)';
              unblock();
              b((v.correct) ? 1 : -1);
            }, 501);
          }, 1400);
          f.remove();
        }, 501);
      }
      f.appendChild(g);
    });
  });
}

function block() {
  document.body.style.pointerEvents = 'none';
}

function unblock() {
  document.body.style.pointerEvents = 'initial';
}

window.onbeforeunload = function() {
  if (le) return 'Are you sure you want to leave?';
};

function askQuestion2(a, c, d) {
  return new Promise(b => {
    let ed = {
      a: document.createElement('div'),
      b: document.createElement('div'),
      c: document.createElement('div')
    };
    ed.a.className = 'corf';
    ed.b.id = 'stuff';
    ed.b.innerHTML = `<div><div style="font-size: 1.1em">${c}</div><div style="font-size: 0.6em"><i class="${a}"></i></div></div>`;
    ed.a.appendChild(ed.b);
    let bt = {
      a: document.createElement('button'),
      b: document.createElement('button')
    };
    bt.a.className = bt.b.className = 'btns';
    bt.a.innerHTML = '<i class="fas fa-times"></i>';
    bt.a.style.backgroundColor = '#ff4242';
    bt.a.style.color = bt.b.style.color = '#fff';
    bt.b.innerHTML = '<i class="fas fa-check"></i>';
    bt.b.style.backgroundColor = '#23bc60';
    bt.a.style.width = bt.b.style.width = '100%';
    bt.a.style.margin = bt.b.style.margin = '10px';
    bt.a.onclick = () => {
      block();
      document.querySelector('#stuff').style.transform = 'scale(0)';
      document.querySelector('#stuff').style.animation = 'zo .5s';
      ed.c.style.transform = 'scale(0)';
      ed.c.style.animation = 'zo .5s';
      setTimeout(() => {
        document.querySelector('#stuff').innerHTML = (d) ? '<i class="fas fa-times-circle"></i>' : '<i class="fas fa-check-circle"></i>';
        document.querySelector('#stuff').style.transform = 'scale(1)';
        document.querySelector('#stuff').style.animation = 'zi .5s';
        ed.c.remove();
        setTimeout(() => {
          document.querySelector('#stuff').style.transform = 'scale(0)';
          document.querySelector('#stuff').style.animation = 'zo .5s';
          setTimeout(() => {
            document.querySelector('#content').innerHTML = '';
            unblock();
            b(d ? -1 : 1);
          }, 501);
        }, 1300);
      }, 600);
    }
    bt.b.onclick = () => {
      block();
      document.querySelector('#stuff').style.transform = 'scale(0)';
      document.querySelector('#stuff').style.animation = 'zo .5s';
      ed.c.style.transform = 'scale(0)';
      ed.c.style.animation = 'zo .5s';
      setTimeout(() => {
        document.querySelector('#stuff').innerHTML = (!d) ? '<i class="fas fa-times-circle"></i>' : '<i class="fas fa-check-circle"></i>';
        document.querySelector('#stuff').style.transform = 'scale(1)';
        document.querySelector('#stuff').style.animation = 'zi .5s';
        ed.c.remove();
        setTimeout(() => {
          document.querySelector('#stuff').style.transform = 'scale(0)';
          document.querySelector('#stuff').style.animation = 'zo .5s';
          setTimeout(() => {
            document.querySelector('#content').innerHTML = '';
            unblock();
            b(d ? 1 : -1);
          }, 501);
        }, 1300);
      }, 600);
    }
    ed.c.appendChild(bt.a);
    ed.c.appendChild(bt.b);
    ed.c.style.position = 'absolute';
    ed.c.style.bottom = 0;
    ed.c.style.width = '100%';
    ed.c.style.display = 'flex';
    ed.c.style.justifyContent = 'space-evenly';
    document.querySelector('#content').innerHTML = '';
    document.querySelector('#content').appendChild(ed.a);
    document.querySelector('#content').appendChild(ed.c);
    document.querySelector('#stuff').style.animation = 'zi .5s';
  })
}

renderC();
