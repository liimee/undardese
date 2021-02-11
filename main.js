if (localStorage.getItem('les') === null) localStorage.setItem('les', '[]');

function les(lesi) {
  le = true;
  let accu = 0;
  var nu = 20; // 14.2857143
  switch (lesi) {
    case 1:
      document.querySelector('#mainwin').style.top = 0;
      setTimeout(() => {
        document.querySelector('#content').innerHTML = '<div id="stuff" style="animation: zi .5s"><div style="animation: ud .8s infinite;"><i class="bx bxs-hand-down"></i></div><div><b>dhœ</b></div><div class="meaning">this (noun)</div></div>';
        addOkBtn().then(() => {
          document.querySelector('#content').innerHTML = '<div id="stuff" style="animation: zi .5s"><b>dhœ</b></div>';
          askQuestion([{ correct: true, val: '<i class="bx bxs-hand-down"></i>' }, { correct: false, val: '<i class="bx bx-happy"></i>' }])
            .then((q1) => {
              if (q1) accu += nu;
              document.querySelector('#content').innerHTML = '<div id="stuff" style="animation: zi .5s"><div style="animation: lr .8s infinite;"><i class="bx bxs-hand-right"></i></div><div><b>adhœ</b></div><div class="meaning">that (noun)</div></div>';
              addOkBtn().then(() => {
                var ar = ['dhœ', 'adhœ'];
                var re = ['this (noun)', 'that (noun)'];
                var ra = Math.floor(Math.random() * (ar.length - 1));
                document.querySelector('#content').innerHTML = '<div id="stuff" style="animation: zi .5s"><b>' + ar[ra] + '</b></div>';
                askQuestion([{
                    correct: (ra == 0) ? 1 : 0,
                    val: '<i class="bx bxs-hand-down"></i>'
                },
                  {
                    correct: (ra == 1) ? 1 : 0,
                    val: '<i class="bx bxs-hand-right"></i>'
                }]).then(q2 => {
                  if (q2) accu += nu;
                  ar.push('porœl');
                  re.push('object');
                  document.querySelector('#content').innerHTML = '<div id="stuff" style="animation: zi .5s"><div><i class="bx bxs-shapes"></i></div><div><b>porœl</b></div><div class="meaning">Object</div></div>';
                  addOkBtn().then(() => {
                    document.querySelector('#content').innerHTML = '<div id="stuff" style="animation: zi .5s"><div style="animation: ud .8s infinite;"><i class="bx bxs-hand-down"></i></div><div><b>ndhe</b></div><div class="meaning">this (adj.)</div></div>';
                    let q = {};
                    addOkBtn().then(() => {
                      ar.push('ndhe');
                      re.push('this (adj.)');
                      ra = Math.floor(Math.random() * ar.length);
                      document.querySelector('#content').innerHTML = '<div id="stuff" style="animation: zi .5s"><b>' + ar[ra] + '</b></div>';
                      q.a = [{ correct: true, val: re[ra] }];
                      q.b = re[ra];
                      re.splice(ra, 1);
                      q.a.push({ val: re[Math.floor(Math.random() * (ar.length - 1))], correct: false });
                      re.splice(ra, 0, q.b);
                      delete q.b;
                      askQuestion(q.a).then(q3 => {
                        delete q.a;
                        if (q3) accu += nu;
                      }).then(() => {
                        ra = Math.floor(Math.random() * ar.length);
                        document.querySelector('#content').innerHTML = '<div id="stuff" style="animation: zi .5s"><b>' + ar[ra] + '</b></div>';
                        q = {};
                        q.a = [{ correct: true, val: re[ra] }];
                        q.b = re[ra];
                        re.splice(ra, 1);
                        q.a.push({ val: re[Math.floor(Math.random() * (ar.length - 1))], correct: false });
                        re.splice(ra, 0, q.b);
                        delete q.b;
                        askQuestion(q.a).then(q4 => {
                          if (q4) accu += nu;
                          delete q.a;
                        }).then(() => {
                          ra = Math.floor(Math.random() * re.length);
                          document.querySelector('#content').innerHTML = '<div id="stuff" style="animation: zi .5s"><b>' + ar[ra] + '</b></div>';
                          q = {};
                          q.a = [{ correct: true, val: re[ra] }];
                          q.b = re[ra];
                          re.splice(ra, 1);
                          q.a.push({ val: re[Math.floor(Math.random() * (ar.length - 1))], correct: false });
                          re.splice(ra, 0, q.b);
                          delete q.b;
                          askQuestion(q.a).then(q5 => {
                            if (q5) accu += nu;
                            delete q.a;
                          }).then(() => {
                            /*let h = document.createElement('div');
                            h.style.width = '190px';
                            h.style.height = 'auto';
                            document.querySelector('#content').innerHTML = '';
                            document.querySelector('#content').appendChild(h)
                            new Donutty(h, {
                              min: 0,
                              max: 100,
                              value: Math.round(accu),
                              text: Math.round(accu),
                              title: 'Accuracy'
                            });
                            le = false;*/
                          }).then(() => {
                            askQuestion2('ndhe', '<i class="bx bxs-shapes"></i>', false).then(q6 => {
                              if (q6) accu += nu;
                            }).then(() => {
                              for (let g = 0; g < 10; g++) {
                                var u = {
                                  a: Math.floor(Math.random() * 1),
                                  b: Math.floor(Math.random() * ar.length),
                                  c: Math.floor(Math.random() * re.length)
                                };
                                if (u == 0) {
                                  document.querySelector('#content').innerHTML = '<div id="stuff" style="animation: zi .5s"><b>' + ar[u.b] + '</b></div>';
                                  q = {};
                                  q.a = [{ correct: true, val: re[ra] }];
                                  q.b = re[u.b];
                                  re.splice(u.b, 1);
                                  q.a.push({ val: re[Math.floor(Math.random() * (ar.length - 1))], correct: false });
                                  re.splice(u.b, 0, q.b);
                                  delete q.b;
                                  askQuestion(q.a).then(an => {if(an)accu+nu});
                                } else {
                                  let j;
                                  if(u.b == u.c){j=true}else{j=false};
                                  askQuestion2(re[u.b], ar[u.c], j).then(an => {
                                    if(an) accu+=nu;
                                  })
                                }
                              }
                            })
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
        }, 1000);
      })
  }
}

function exit() {
  le = false;
  document.querySelector('#mainwin').style.top = '-105%';
}

function addOkBtn() {
  return new Promise((a, b) => {
    let g = document.createElement('button');
    g.className = 'okbtn';
    g.innerText = 'Oh!';
    g.onclick = () => {
      document.querySelector('#stuff').style.transform = 'scale(0)';
      document.querySelector('#stuff').style.animation = 'zo .5s';
      g.style.animation = 'zo .5s';
      setTimeout(() => {
        g.remove();
        a();
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
        document.querySelector('#stuff').style.transform = 'scale(0)';
        document.querySelector('#stuff').style.animation = 'zo .5s';
        f.style.animation = 'zo .5s';
        setTimeout(() => {
          document.querySelector('#stuff').innerHTML = v.correct ? '<i style="font-size: 1.9em" class="bx bxs-check-circle"></i>' : '<i style="font-size: 1.9em" class="bx bxs-x-circle"></i>';
          document.querySelector('#stuff').style.transform = 'scale(1)';
          document.querySelector('#stuff').style.animation = 'zi .5s';
          setTimeout(() => {
            document.querySelector('#stuff').style.transform = 'scale(0)';
            document.querySelector('#stuff').style.animation = 'zo .5s';
            setTimeout(() => {
              document.querySelector('#stuff').innerHTML = '';
              document.querySelector('#stuff').style.transform = 'scale(1)';
              b((v.correct) ? true : false);
            }, 501);
          }, 1400);
          f.remove();
        }, 501);
      }
      f.appendChild(g);
    });
  });
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
    ed.b.innerHTML = `<div><div style="font-size: 1.8em">${c}</div><div style="font-size: .4em">${a}</div></div>`;
    ed.a.appendChild(ed.b);
    let bt = {
      a: document.createElement('button'),
      b: document.createElement('button')
    };
    bt.a.className = bt.b.className = 'btns';
    bt.a.innerHTML = '<i class="bx bx-x"></i>';
    bt.a.style.backgroundColor = '#ff4242';
    bt.a.style.color = bt.b.style.color = '#fff';
    bt.b.innerHTML = '<i class="bx bx-check"></i>';
    bt.b.style.backgroundColor = '#23bc60';
    bt.a.style.width = bt.b.style.width = '100%';
    bt.a.style.margin = bt.b.style.margin = '10px';
    bt.a.onclick = () => {
      document.querySelector('#stuff').style.transform = 'scale(0)';
      document.querySelector('#stuff').style.animation = 'zo .5s';
      ed.c.style.transform = 'scale(0)';
      ed.c.style.animation = 'zo .5s';
      setTimeout(() => {
        document.querySelector('#stuff').innerHTML = (d) ? '<i class="bx bxs-x-circle"></i>' : '<i class="bx bxs-check-circle"></i>';
        document.querySelector('#stuff').style.transform = 'scale(1)';
        document.querySelector('#stuff').style.animation = 'zi .5s';
        ed.c.remove();
        setTimeout(() => {
          document.querySelector('#stuff').style.transform = 'scale(0)';
          document.querySelector('#stuff').style.animation = 'zo .5s';
          setTimeout(() => {
            document.querySelector('#content').innerHTML='';
            b(d ? false : true);
          }, 501);
        }, 1300);
      }, 600);
    }
    bt.b.onclick = () => {
      document.querySelector('#stuff').style.transform = 'scale(0)';
      document.querySelector('#stuff').style.animation = 'zo .5s';
      ed.c.style.transform = 'scale(0)';
      ed.c.style.animation = 'zo .5s';
      setTimeout(() => {
        document.querySelector('#stuff').innerHTML = (!d) ? '<i class="bx bxs-x-circle"></i>' : '<i class="bx bxs-check-circle"></i>';
        document.querySelector('#stuff').style.transform = 'scale(1)';
        document.querySelector('#stuff').style.animation = 'zi .5s';
        ed.c.remove();
        setTimeout(() => {
          document.querySelector('#stuff').style.transform = 'scale(0)';
          document.querySelector('#stuff').style.animation = 'zo .5s';
          setTimeout(() => {
            document.querySelector('#content').innerHTML = '';
            b(d ? true : false);
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
    document.querySelector('#stuff').innerHTML = '';
    document.querySelector('#stuff').appendChild(ed.a);
    document.querySelector('#content').appendChild(ed.c);
    document.querySelector('#stuff').style.animation = 'zi .5s';
  })
}