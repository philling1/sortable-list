//Grabbing our DOM elements
const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

//Creating an array of richest people to be sorted
const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page'
];

//Creating an empty array to store  the sorted array of richest people
const sortedRichestPeople = [];

//Creating a variable to keep track of the index of each list item
let dragStartIndex;

//Calling the function to generate the scrimbed list
createList();

// Creating  a list of scrimbed richest on the UI
function createList() {
  [...richestPeople]
   .map(a => ({value: a, sort: Math.random() }))
   .sort((a, b) => a.sort - b.sort)
   .map(a => a.value)
   .forEach((person, index) => {

    const listItem = document.createElement('li');

    listItem.setAttribute('data-index', index);

    listItem.innerHTML = `
      <span class="number">${index + 1}</span>
      <div class= "draggable" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fas fa-grip-lines"></i>
      </div>
    `;

    sortedRichestPeople.push(listItem);

    draggable_list.appendChild(listItem)
   });

   //Calling the event listener function
   addEventListeners();
}

function dragStart() {
  //Adding the plus to make the value a number
  dragStartIndex = +this.closest('li').getAttribute('data-index');

}

function dragEnter() {
  //Change the beckground of the name selected 
  this.classList.add('over');
}

function dragLeave() {
  this.classList.remove('over');
}

function dragOver(e) {
  // this is to prevent the default function
  e.preventDefault();
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute('data-index')

  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove('over')
}

//creating the swapItem function
function swapItems(fromIndex, toIndex) {
  const itemOne = sortedRichestPeople[fromIndex].querySelector('.draggable');
  const itemTwo = sortedRichestPeople[toIndex].querySelector('.draggable');

  sortedRichestPeople[fromIndex].appendChild(itemTwo)
  sortedRichestPeople[toIndex].appendChild(itemOne)
}

//Check the order of list items 
function checkOrder() {
  sortedRichestPeople.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim();

    if(personName !== richestPeople[index]){
      listItem.classList.add('wrong')
    }else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right')
    }
  });

}

// Creating the event listener function
function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable')
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
  })

  dragListItems.forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  })

}

check.addEventListener('click', checkOrder);