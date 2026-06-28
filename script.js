// ======================================
// Elahouel Market
// Version 1.0
// ======================================

const tbody = document.getElementById("tableBody");

const totalAchat = document.getElementById("totalAchat");
const totalCoffre = document.getElementById("totalCoffre");
const totalCaisse = document.getElementById("totalCaisse");
const totalReserve = document.getElementById("totalReserve");

document.getElementById("date").valueAsDate = new Date();

document.getElementById("addRow").addEventListener("click", addRow);
document.getElementById("printPage").addEventListener("click", () => window.print());

function addRow(){

    let tr=document.createElement("tr");

    tr.innerHTML=`

<td>
<input type="text" class="client">
</td>

<td>
<input type="number" class="achat" value="0">
</td>

<td>
<input type="number" class="coffre" value="0">
</td>

<td>
<input type="number" class="caisse" value="0">
</td>

<td>
<input type="number" class="reserve" value="0">
</td>

<td class="etat">
❌
</td>

<td>
<button class="deleteBtn">
🗑️
</button>
</td>

`;

tbody.appendChild(tr);

const inputs=tr.querySelectorAll("input");

inputs.forEach(i=>{

i.addEventListener("input",()=>{

verifyRow(tr);

calculateTotals();

});

});

tr.querySelector(".deleteBtn").onclick=function(){

tr.remove();

calculateTotals();

};

verifyRow(tr);

calculateTotals();

}// ======================================
// Elahouel Market
// Version 1.0
// ======================================

const tbody = document.getElementById("tableBody");

const totalAchat = document.getElementById("totalAchat");
const totalCoffre = document.getElementById("totalCoffre");
const totalCaisse = document.getElementById("totalCaisse");
const totalReserve = document.getElementById("totalReserve");

document.getElementById("date").valueAsDate = new Date();

document.getElementById("addRow").addEventListener("click", addRow);
document.getElementById("printPage").addEventListener("click", () => window.print());

function addRow(){

    let tr=document.createElement("tr");

    tr.innerHTML=`

<td>
<input type="text" class="client">
</td>

<td>
<input type="number" class="achat" value="0">
</td>

<td>
<input type="number" class="coffre" value="0">
</td>

<td>
<input type="number" class="caisse" value="0">
</td>

<td>
<input type="number" class="reserve" value="0">
</td>

<td class="etat">
❌
</td>

<td>
<button class="deleteBtn">
🗑️
</button>
</td>

`;

tbody.appendChild(tr);

const inputs=tr.querySelectorAll("input");

inputs.forEach(i=>{

i.addEventListener("input",()=>{

verifyRow(tr);

calculateTotals();

});

});

tr.querySelector(".deleteBtn").onclick=function(){

tr.remove();

calculateTotals();

};

verifyRow(tr);

calculateTotals();

}//==========================================
// حساب المجاميع
//==========================================

function calculateTotals(){

let achat=0;
let coffre=0;
let caisse=0;
let reserve=0;

document.querySelectorAll("#tableBody tr").forEach(row=>{

achat+=parseFloat(row.querySelector(".achat").value)||0;

coffre+=parseFloat(row.querySelector(".coffre").value)||0;

caisse+=parseFloat(row.querySelector(".caisse").value)||0;

reserve+=parseFloat(row.querySelector(".reserve").value)||0;

});

totalAchat.textContent=achat.toLocaleString("fr-FR");

totalCoffre.textContent=coffre.toLocaleString("fr-FR");

totalCaisse.textContent=caisse.toLocaleString("fr-FR");

totalReserve.textContent=reserve.toLocaleString("fr-FR");

}//==========================================
// حفظ بصيغة JSON
//==========================================

document.getElementById("saveFile").onclick=function(){

let rows=[];

document.querySelectorAll("#tableBody tr").forEach(r=>{

rows.push({

client:r.querySelector(".client").value,

achat:r.querySelector(".achat").value,

coffre:r.querySelector(".coffre").value,

caisse:r.querySelector(".caisse").value,

reserve:r.querySelector(".reserve").value

});

});

let data={

date:document.getElementById("date").value,

rows:rows

};

let json=JSON.stringify(data,null,4);

let blob=new Blob([json],{type:"application/json"});

let url=URL.createObjectURL(blob);

let a=document.createElement("a");

a.href=url;

a.download="Elahouel_Market.json";

a.click();

URL.revokeObjectURL(url);

};//==========================================
// فتح ملف JSON
//==========================================

document.getElementById("openFile").onclick=function(){

document.getElementById("fileInput").click();

};

document.getElementById("fileInput").addEventListener("change",function(e){

const file=e.target.files[0];

if(!file) return;

const reader=new FileReader();

reader.onload=function(ev){

const data=JSON.parse(ev.target.result);

tbody.innerHTML="";

document.getElementById("date").value=data.date;

data.rows.forEach(item=>{

addRow();

let row=tbody.lastElementChild;

row.querySelector(".client").value=item.client;

row.querySelector(".achat").value=item.achat;

row.querySelector(".coffre").value=item.coffre;

row.querySelector(".caisse").value=item.caisse;

row.querySelector(".reserve").value=item.reserve;

verifyRow(row);

});

calculateTotals();

};

reader.readAsText(file);

});//==========================================
// إنشاء أول صف تلقائياً
//==========================================

addRow();

calculateTotals();
