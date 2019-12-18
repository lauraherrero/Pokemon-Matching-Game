'use strict';

const elementContainer = document.querySelector('#card-container');
const elementList = document.querySelector('#card-list');
const elementButton = document.querySelector('#button');
elementButton.classList.add('button');
const inputFour = document.querySelector('#optionFour');
const inputSix = document.querySelector('#optionSix');
const inputEight = document.querySelector('#optionEight');
const elementInputs = document.querySelectorAll('.option');
const elementSubmitForm = document.querySelector('#form');
let optionSelected ='';




const loadHandler = () => {
  const myLocalStorage = localStorage.getItem("number");
  if(myLocalStorage !== '') {
    for(let i=0; i < elementInputs.length; i++){
      if(elementInputs[i].value === myLocalStorage){
        elementInputs[i].checked = true;
      };
    };
  };
}

const connectToApi = () => {
  getNumberCards();
  fetch(`https://beta.adalab.es/ejercicios-extra/api/pokemon-cards/${optionSelected}.json`)
    .then (response => response.json())
    .then (dataFromResponse => displayCards (dataFromResponse))
};

const displayCards = (data) =>{
  elementList.innerHTML = '';
  for (let card of data ){
    const elementImg = document.createElement('img');
    const elementCard = document.createElement('li');
    const elementSpan = document.createElement('span');
    elementSpan.innerHTML = 'ADALAB';
    elementSpan.classList.add('text-card')
    elementImg.src = card.image;
    elementImg.classList.add('img-card')
    elementImg.classList.add('hidden')
    elementCard.classList.add('card');
    elementList.classList.add('card-list');
    elementCard.appendChild(elementImg);
    elementCard.appendChild(elementSpan);
    elementList.appendChild(elementCard);
    elementCard.addEventListener('click', frontCards);
  };
}

const frontCards = (event) => {
  const selectCard = event.currentTarget;
  selectCard.classList.add('front-card');
  selectCard.firstChild.classList.remove('hidden');
  selectCard.lastChild.classList.add('hidden');
}

const getInputsSelect = () =>  {
  const myLocalStorage = localStorage.getItem("number");
  if(myLocalStorage === '4'){
    inputFour.setAttribute('checked', true);
    localStorage.setItem("number", 4);
  } else if (myLocalStorage === '6'){
    inputSix.setAttribute('checked', true);
    localStorage.setItem("number", 6);
  } else if (myLocalStorage === '8'){
    inputEight.setAttribute('checked', true);
    localStorage.setItem("number", 8);
  }
}


const getNumberCards = () => {
  for (let i = 0; i< elementInputs.length; i++ ) {
    if (elementInputs[i].checked){
      optionSelected = elementInputs[i].value;
      localStorage.setItem('number', optionSelected)
    }
  }
  loadHandler();
}

const submitHandler = (event) => {
  if(event.key === 'Enter') {
    connectToApi();
  };
};

elementSubmitForm.addEventListener('keyup', submitHandler);
elementButton.addEventListener('click', connectToApi);
window.addEventListener('load', getInputsSelect);
//# sourceMappingURL=main.js.map
