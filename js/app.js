'use strict';


// Features
  // DONE: constructor: name, times image was shown, file path, number of times a pic was clicked
  // DONE: image generator to show 3 images
  // DONE: count how many times an image has been displayed
  // event listener for the images that activates on click
  // once image is clicked, show 3 new images
  // create x amount of rounds that the images go through
  // once x amount of rounds has been achieved, remove image event listeners
  // once survey has been completed, display a view results button that when clicked displays all products and shows the votes it recieved, and times it was viewed

//Global Variables
let allProducts = [];
let randomProductArray = [];
let displayedProducts = [];
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
  console.log(`first image: ${firstImage.alt}`);
  allProducts[product1].views++;

  secondImage.src = allProducts[product2].src;
  secondImage.alt = allProducts[product2].name;
  console.log(`second image: ${secondImage.alt}`);
  allProducts[product2].views++;

  thirdImage.src = allProducts[product3].src;
  thirdImage.alt = allProducts[product3].name;
  console.log(`third image: ${thirdImage.alt}`);
  allProducts[product3].views++;
}

function handleProductClick (event){
  if (event.target === myContainer){
    alert('Please click on a picture please.');
  }

  let clickedProduct = event.target.alt;
  for (let i = 0; i < allProducts.length; i++){
    if (clickedProduct === allProducts[i].name){
      allProducts[i].clicks++;
      console.log(allProducts[i].clicks);
    }
  }
  clicks++;
  renderRandomProduct();

  if (clicks === maxClicks){
    myContainer.removeEventListener('click', handleProductClick);
  }
}

function handlResultsClick (event){
  let ul = document.getElementById('totalResults');
  for (let i = 0; i < allProducts.length; i++){
    let li = document.createElement(li);
    li.textContent = ``
  }
}

renderRandomProduct();

myContainer.addEventListener('click', handleProductClick);
resultsButton.addEventListener('click', handlResultsClick);
