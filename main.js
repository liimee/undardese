if(!localStorage.getItem('t')) localStorage.setItem('t', 5)

const ys = new Howl({
  src: ['s/y.wav']
});

const ns = new Howl({
  src: ['s/n.wav']
});

const data = {
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
      'sāpd',
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
      'fas fa-user singular',
      'nī',
      'you (sing.)'
    ],
    [
      'fas fa-user-circle',
      'nã',
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
  sentences1:[
    [//todo split obnoxiously large tip into smaller sections
      'word','fas fa-add', '-õ', 'and, too, also', 'Use it after a word, like nī (you) -> nīõ (you too). This suffix makes nasal sounds (ã) become non-nasals followed by an ‘n’ (nã + õ = nānõ).'
    ],
    [
    	'sent','this and that', ["dhõ adhõ", "dhõ adhœ", "dhõ adh"], ["dh","adh","œ","õ"], "The 'õ' suffix removes any œ sound at the end of a word (dhœ + õ = dhõ)."
    ]
  ],
  data: {
    _sections: 2,
    basics1: ['Basics 1', 'far fa-sun', 1],
    basics2: ['Basics 2', 'fas fa-walking', 1],
    basics3: ['Basics 3', 'fas fa-users', 1],
    sentences1: ['Sentences 1', 'fas fa-icons',2,true]
  }
}

var f = {};

function renderC() {
  document.querySelector('#cp').innerHTML = '';
  for(let s = 0; s<data.data._sections; s++) {
    const g = document.createElement('h1');
    g.innerText="Section "+(s+1)
    const f = document.createElement('div');
    f.className = 'choose';
    const l = document.createElement('div');
    l.className = 'chl';
    f.appendChild(l);

    document.querySelector('#cp').appendChild(g);
    document.querySelector('#cp').appendChild(f);
  }
  Object.keys(data.data).forEach(v => {
    if(v.startsWith("_"))return
    const s = document.createElement('span');
    s.className = 'les';
    if(!data.data[v][3]){
    	s.addEventListener('click', () => course(data[v]))
    }else{
    	s.addEventListener('click', ()=>linearCourse(data[v]))
    }
    const t = document.createElement('div')
    t.innerText = data.data[v][0];
    s.appendChild(t)
    const x = document.createElement('div');
    x.innerText = `Definitely takes ~${Math.round(data[v].length*Number(localStorage.getItem('t'))/60)} minutes`;
    x.style.maxWidth = '80%';
    s.appendChild(x);
    const u = document.createElement('div');
    s.appendChild(u)
    const w = document.createElement('i');
    w.className = data.data[v][1];
    u.appendChild(w)
    document.querySelectorAll('.chl')[data.data[v][2]-1].appendChild(s);
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
      tip: v[3],
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

async function info(object, cont) {
  var v = object.thing[object.name];
  document.querySelector('#content').innerHTML = `<div id="stuff" style="animation: zi .5s"><i class="${v.icon}"></i><div><b>${object.name}</b></div><div class="meaning">${v.meaning}</div>${v.tip?`<br><span class="tip">Tip: ${v.tip}</span>`:''}</div>`;
  await addOkBtn();
  object.thing[object.name].score++;
  if(!cont)doThing(object.thing);
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
          if(v.correct) ys.play(); else ns.play();
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
        if(d) ns.play(); else ys.play();
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
        if(!d) ns.play(); else ys.play();
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

function linearCourse(qs){
	 document.querySelector('#par').style.display = 'block';
	 setTimeout(() => {
	 	document.querySelector('#mainwin').style.left = 0;
	 }, 50);
	let ind=0;
	(async function step(q=qs[ind]){
		if(q[0]=="word"){
			let obj={
				thing:{
					
				},
				name:q[2],
				icon:q[1]
			}
			obj.thing[q[2]]={meaning:q[3],tip:q[4]};
			await info(obj,1)
		}else if(q[0]=="sent"){
			await new Promise(res=>{
			let el=[
				document.createElement("div"),//Sentence label
				document.createElement("div"),//Current answer
				document.createElement("div")//Word choices
			]
			btn=document.createElement("button")
			el[0].innerText=q[1]
			btn.className="okbtn"
			btn.innerText="Check"
			el[1].className="ans"
			el[1].id="ans"
			q[3].forEach(e=>{
				let wrd=document.createElement("span")
				wrd.className="choice"
				wrd.innerText=e
				el[2].appendChild(wrd)
				wrd.onclick=(ev)=>{
					let eel=document.createElement("span")
					eel.className = "choice"
					eel.innerText = e
					eel.onclick=e=>e.target.remove()
					document.querySelector(".ans").appendChild(eel)
				}
			})
			
			btn.onclick=()=>{
				if(validate(document.querySelector(".ans"), q[2])){
					btn.style.animation="zo .5s"
					btn.style.transform="scale(0)"
					setTimeout(()=>{
						btn.innerText="Continue"
						btn.style.animation="zi .5s"
						btn.style.transform="scale(1)"
						var corr=document.createElement("i")
						corr.className="fas fa-check-circle"
						corr.style="font-size:1.5em; margin-top: 20px; animation: zi .5s"
						document.getElementById("stuff").appendChild(corr,btn)
						ys.play()
						btn.onclick=()=>{
							document.getElementById("content").style.animation="zo .5s"
							document.getElementById("content").style.transform="scale(0)"
							setTimeout(()=>{document.getElementById("content").style.transform="scale(1)";res()},600)
						}
					},600)
				}else{
					
				}
			}
			
			document.getElementById("stuff").innerHTML=''
			document.getElementById("stuff").style.animation='zi .5s'
			setInterval(()=>document.getElementById("stuff").style.transform="scale(1)",501)
			if (q[4]) {
				el.splice(1, 0, document.createElement("div"))
				el[1].className = "tip"
				el[1].innerText = "Tip: " + q[4]
			}
			el.forEach(e=>document.getElementById("stuff").appendChild(e))
			document.getElementById("content").appendChild(btn)
			})
		}
		if((ind+1)<qs.length){ind++;step()}else{
			document.querySelector('#content').innerText = 'We\'re done!';
			document.querySelector('#content').style.animation = 'zi .5s';
			renderC();
			confetti({
				particleCount: 100,
				spread: 70,
				origin: { y: 0.6 }
			});
		}
	})()
}

function validate(el, arr){
	return arr.map(e=>e.replace(/[ ]/g,"")).includes(Array.from(el.childNodes).map(e=>e.innerText).join``)
}

renderC();
