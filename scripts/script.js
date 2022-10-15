const gifsContainer = document.querySelector('.main__gifs');
const searchButton = document.querySelector('.main__button');
const valueFromInput = document.querySelector('.main__input');

async function makeRequest(inputValue="tom") {
  const URL = 'https://api.giphy.com/v1/gifs/search?';
  const apiKey = '&api_key=qQyoHTaInyYm1fjtEmQosbCqhTLCdxCA';

  let searchInput;
  let searchFor = "tom and jerry";
  
  inputValue === 'tom' ? searchFor = 'tom' : searchFor = inputValue;
  searchInput = searchFor.split(" ").join("-").toLowerCase();
  
  const query = `&q=${searchInput}`;
  
  const data = await fetch(URL + apiKey + query);
  const result = await data.json();
  
  let amountOfGifs = 9;
  displayGifs(result.data, amountOfGifs);
  
  window.onscroll = function() {
    if ((window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight) {
      displayGifs(result.data, amountOfGifs+=9);
    }
  }
}

function displayGifs(gifs, gifsNumber) {
  let previousIndex = gifsNumber - 9;
  gifs.map( (gif, index) => {
    const url = gif.images.original.url;
    if (index <= gifsNumber && index > previousIndex) {
      gifsContainer.insertAdjacentHTML('beforeend',
      `<div class="main__gif">
        <img src=${url} alt="gif">
      </div>`
      )
    }
  })
}

searchButton.addEventListener('click', () => {
  gifsContainer.innerHTML = "";
  makeRequest(valueFromInput.value)
})

// makeRequest();
