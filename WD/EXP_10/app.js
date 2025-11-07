const f=document.getElementById('f');
const t=document.getElementById('t');
const list=document.getElementById('list');
const fil=document.getElementById('fil');
const q=document.getElementById('q');
const clr=document.getElementById('clr');
const empty=document.getElementById('empty');

let a=load();

function id(){return Math.random().toString(36).slice(2,9)}
function load(){try{return JSON.parse(localStorage.getItem('td.v1'))||[]}catch{return[]}}
function save(){localStorage.setItem('td.v1',JSON.stringify(a))}

function draw(){
  list.innerHTML='';
  const s=fil.value, qq=q.value.trim().toLowerCase();
  const x=a.filter(v=>{
    if(s==='act'&&v.d) return false;
    if(s==='done'&&!v.d) return false;
    if(qq && !v.t.toLowerCase().includes(qq)) return false;
    return true;
  });
  empty.style.display=x.length?'none':'block';
  x.forEach(v=>{
    const li=document.createElement('li'); li.className='li'+(v.d?' done':''); li.dataset.id=v.i;
    const cb=document.createElement('input'); cb.type='checkbox'; cb.checked=v.d;
    const tt=document.createElement('span'); tt.className='tt'; tt.textContent=v.t;
    const g=document.createElement('div');
    const e=document.createElement('button'); e.className='btn'; e.textContent='edit';
    const d=document.createElement('button'); d.className='btn del'; d.textContent='del';
    g.append(e,d); li.append(cb,tt,g); list.append(li);
  });
}

f.addEventListener('submit',e=>{
  e.preventDefault();
  const v=t.value.trim();
  if(!v) return;
  a.unshift({i:id(),t:v,d:false});
  save(); t.value=''; draw();
});

list.addEventListener('click',e=>{
  const li=e.target.closest('.li'); if(!li) return;
  const it=a.find(z=>z.i===li.dataset.id); if(!it) return;
  if(e.target.type==='checkbox'){it.d=e.target.checked; save(); draw(); return;}
  if(e.target.textContent==='edit'){const n=prompt('edit',it.t); if(n&&n.trim()){it.t=n.trim(); save(); draw();} return;}
  if(e.target.textContent==='del'){a=a.filter(z=>z.i!==it.i); save(); draw();}
});

[fil,q].forEach(el=>el.addEventListener('input',draw));

clr.addEventListener('click',()=>{
  const b=a.length;
  a=a.filter(v=>!v.d);
  if(a.length!==b){save();draw()}
});

draw();
