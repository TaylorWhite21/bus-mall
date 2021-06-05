'use strict';

//Global Variables
let allProducts = [];
let clicks = 0;
let maxClicks = 25;
let clicksRemaining = 26;
let renderQ = [];

//Element grabbers
let myContainer = document.getElementById('products');
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

//gets locally stored data
let getProducts = localStorage.getItem('products');

//parses data from local storage
if(getProducts){
  let parsedProducts = JSON.parse(getProducts);
  allProducts = parsedProducts;
}
else { // will only run if getProduct is empty
  // Instanstiates new products
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
}

// Selects random product number
function selectRandomProduct() {
  return Math.floor(Math.random() * allProducts.length);
}

// renders 3 images and reruns if selected image is already in the array, then increase veiw count for displayed image
function renderRandomProduct() {
  while (renderQ.length < 6) {
    let uniqueIndex = selectRandomProduct();
    if (!renderQ.includes(uniqueIndex)) {
      renderQ.unshift(uniqueIndex);
    }
  }

  let product1 = renderQ.pop();
  let product2 = renderQ.pop();
  let product3 = renderQ.pop();

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
function handleProductClick(event) {
  if (event.target === myContainer) {
    alert('Please click on a picture please.');
  }

  let clickedProduct = event.target.alt;
  for (let i = 0; i < allProducts.length; i++) {
    if (clickedProduct === allProducts[i].name) {
      allProducts[i].clicks++;
      clicks++;
      renderClicksRemaining();
    }
  }
  renderRandomProduct();

  if (clicks === maxClicks) {
    myContainer.removeEventListener('click', handleProductClick);
    document.getElementById('myChart').style.display = 'block';
    renderChart();
    let stringifiedProducts = JSON.stringify(allProducts);
    localStorage.setItem('products', stringifiedProducts);
  }
}

//Renders chart information once clicks have reached 25
function renderChart() {
  let clicks = [];
  let views = [];
  let names = [];

  for (let i = 0; i < allProducts.length; i++) {
    clicks.push(allProducts[i].clicks);
    views.push(allProducts[i].views);
    names.push(allProducts[i].name);
  }

  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, { // eslint-disable-line
    type: 'bar',
    data: {
      labels: names,
      datasets: [{
        label: '# of Views',
        data: views,
        backgroundColor: [
          'rgba(89, 199, 207, 1)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1
      },
      {
        label: '# of Clicks',
        data: clicks,
        backgroundColor: [
          'rgba(209, 87, 185, 1)'
        ],
        borderColor: [
          'rgba(89, 199, 207, 1)'
        ],
        borderWidth: 1
      }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

//Displays how many rounds are left
function renderClicksRemaining () {
  let counter = document.getElementById('counter');
  clicksRemaining--;
  counter.innerHTML = `Rounds Remaining: ${clicksRemaining}`;
}

renderRandomProduct();
renderClicksRemaining();

//Event listeners
myContainer.addEventListener('click', handleProductClick);
