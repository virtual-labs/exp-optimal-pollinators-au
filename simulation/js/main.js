let last=null;
function g(id){return +document.getElementById(id).value;}
const chart=()=>document.getElementById('chart');
function netCalorie(){const noc=g('noc'),yi=g('yi'),pof=Math.round(g('pof'));const d=[];for(let x=0;x<=pof;x++)d.push([x,+(noc-yi*x).toFixed(2)]);return d;}
function energyRate(){const noc=g('noc'),yi=g('yi'),pos=Math.round(g('pos')),nd=g('nd'),eb=g('eb'),tb=g('tb'),ew=g('ew'),tw=g('tw'),ef=g('ef'),tf=g('tf'),ee=g('ee'),te=g('te');const d=[];let sum=0;
  for(let b=1;b<=pos;b++){sum+=(-yi*b+noc);const net1=nd*sum-eb-nd*ew*(b-1)-nd*b*ef-ee*(1-nd);const net2=tb+nd*tw*(b-1)+nd*b*tf+te*(1-nd);d.push([b,+(net1/net2).toFixed(3)]);}return d;}
function run(){
  const m=document.getElementById('plotMode').value,t=document.getElementById('plotTitle');
  if(m==='netcal'){const d=netCalorie();last={mode:'netcal',d};Chart.draw(chart(),[{color:'#b50246',data:d}],{xlabel:'Flower position on inflorescence',ylabel:'Net calories',ratio:0.55});setLegend([{color:'#b50246',name:'Net calories per flower'}]);t.textContent='Net calorie per flower position';document.getElementById('counts').innerHTML='Reward declines with flower position — the bee should leave the plant before visiting unrewarding flowers.';}
  else{const d=energyRate();last={mode:'energy',d};let best=d[0];d.forEach(p=>{if(p[1]>best[1])best=p;});Chart.draw(chart(),[{color:'#0e7c86',data:d}],{xlabel:'Number of flowers visited per plant',ylabel:'Net energy rate (cal/s)',ratio:0.55});setLegend([{color:'#0e7c86',name:'Net energy per unit time'}]);t.textContent='Net energy rate per patch size';document.getElementById('counts').innerHTML=`Energy rate peaks at about <b>${best[0]}</b> flowers per plant — the optimal number to visit before moving on.`;}
}
function sync(){document.querySelectorAll('#simbox .val').forEach(function(v){var el=document.getElementById(v.id.slice(2));if(el)v.textContent=el.value;});}
const D={noc:20,yi:1.7,pof:10,pos:10,nd:0.4,eb:0.1,tb:5,ew:0.03,tw:0.29,ef:0.02,tf:15,ee:0.01,te:9};
function resetSim(){for(const k in D)document.getElementById(k).value=D[k];document.getElementById('plotMode').value='netcal';sync();run();toast('Reset');}
function downloadCSV(){if(!last){toast('Plot first');return;}let csv=(last.mode==='netcal'?'position,net_calories\n':'flowers_visited,net_energy_rate\n')+last.d.map(r=>r[0]+','+r[1]).join('\n');dl(csv,'pollinators.csv','text/csv');toast('CSV downloaded');}
var _lr;document.querySelectorAll('#simbox input[type=range]').forEach(function(el){el.addEventListener('input',function(){clearTimeout(_lr);_lr=setTimeout(run,110);});});
sync();window.addEventListener('resize',function(){if(last)run();});
