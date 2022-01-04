const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionaireBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

getRandonUser();
getRandonUser();
getRandonUser();

let data = [];

//fetch random user and add money=buscar um usuário aleatório e adc dinheiro

async function getRandonUser() {
  const res = await fetch('https://randomuser.me/api/');
  const data = await res.json();

  const user = data.results[0];
  
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);  
}
//add double money=clicando no botão double o dinheiro de cada usuário fica em dobro

function doubleMoney(){
    data = data.map((user) =>{
    return{...user, money: user.money *2}
  });

  updateDOM();
}

//filter only millionaries

function showMillionaires(){
  data = data.filter((user) =>user.money > 1000000);
    
  
  updateDOM();
}

//sort by the richest=O mais rico

function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  
  updateDOM();
}

// add new object to the data array

function addData(obj){
  data.push(obj);

  updateDOM();
}

//calculate the entire wealth= calcular td a fortuna

function calculateWealth(){
  const wealth = data.reduce ((acc, user) => (acc +=user.money), 0);
  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
  main.appendChild(wealthEl);
}


//update DOM

function updateDOM(providaData = data){
  //clear main div
 main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';
 
 providaData.forEach((item) => {
   const element = document.createElement('div');
   element.classList.add('person');
   element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
   main.appendChild(element);

 });

}

 //format number as money= estavam aparecendo numeros mas nao em dinheiro, c pontos flutuantes etc

 function formatMoney(number){
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67
 
}

//event listener =adc usuários aleatórios clicando no botão add users e evento o resto do botões

addUserBtn.addEventListener('click', getRandonUser);
doubleBtn.addEventListener('click', doubleMoney);
showMillionaireBtn.addEventListener('click', showMillionaires);
sortBtn.addEventListener('click', sortByRichest);
calculateWealthBtn.addEventListener('click', calculateWealth);