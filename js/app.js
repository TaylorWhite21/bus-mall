'use strict';

//Global Variables
let allProducts = [];
let randomProductArray = [];
let clicks = 0;
let maxClicks = 25;

//Element grabbers
let myContainer = document.getElementById('products');
let resultsButton = document.getElementById('results');
let firstImage = document.getElementById('firstImage');
let secondImage = document.getElementById('secondImage');
let thirdImage = document.getElementById('thirdImage');

// Constructor for each product
function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.clicks = 0;
  this.views = 0;
  allProducts.push(this);
}

// list of products
new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');

// Selects random product number
function selectRandomProduct (){
  return Math.floor(Math.random() * allProducts.length);
}

// renders 3 images and reruns if selected image is already in the array, then increase veiw count for displayed image
function renderRandomProduct() {
  while (randomProductArray.length < 3){
    let randomProduct = selectRandomProduct();
    while (!randomProductArray.includes(randomProduct)){
      randomProductArray.push(randomProduct);
    }
  }

  let product1 = randomProductArray.shift();
  let product2 = randomProductArray.shift();
  let product3 = randomProductArray.shift();

  firstImage.src = allProducts[product1].src;
  firstImage.alt = allProducts[product1].name;
  allProducts[product1].views++;

  secondImage.src = allProducts[product2].src;
  secondImage.alt = allProducts[product2].name;
  allProducts[product2].views++;

  thirdImage.src = allProducts[product3].src;
  thirdImage.alt = allProducts[product3].name;
  allProducts[product3].views++;
}

// if product is clicked: increase its clicks by 1 and renders new images.
// once max clicks is achieved, it removes event listener.
function handleProductClick (event){
  if (event.target === myContainer){
    alert('Please click on a picture please.');
  }

  let clickedProduct = event.target.alt;
  for (let i = 0; i < allProducts.length; i++){
    if (clickedProduct === allProducts[i].name){
      allProducts[i].clicks++;
    }
  }
  clicks++;
  renderRandomProduct();

  if (clicks === maxClicks){
    myContainer.removeEventListener('click', handleProductClick);
  }
}

// Renders the statistics for each image
function renderResults (){
  let ul = document.getElementById('totalResults');
  for (let i = 0; i < allProducts.length; i++){
    let li = document.createElement('li');
    li.textContent = `The ${allProducts[i].name} product was viewed ${allProducts[i].views} times and clicked on ${allProducts[i].clicks} times(s)`;
    ul.appendChild(li);
    // console.log('li');
  }
}

// when clicks are at maximum, button is allowed to render results
function handleResultsClick (event){ //eslint-disable-line
  if (clicks === maxClicks){
    renderResults();
  }
}


renderRandomProduct();

//Event listeners
myContainer.addEventListener('click', handleProductClick);
resultsButton.addEventListener('click', handleResultsClick);
