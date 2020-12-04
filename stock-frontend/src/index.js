const BACKEND_URL = "http://localhost:3000";
const STOCKS_URL = `${BACKEND_URL}/stocks`
const RATIOS_URL = `${BACKEND_URL}/ratios`

const main = document.querySelector("main")

document.addEventListener('DOMContentLoaded', () => loadStocks())


function loadStocks(){

  console.log('@@LoadStocks')
  fetch(STOCKS_URL)

      .then(function(response) {
          return response.json();
      })        
      .then(json => {
          json.forEach(stock => renderStock(stock))     
      })     
}


const renderStock =  (stockHash) => {   
  const div = document.createElement("div")
  const p = document.createElement("p")
  const dropdownButton = document.createElement("button")
  const ul = document.createElement("ul")

  div.setAttribute("class", "card")
  div.setAttribute("data-id", stockHash.id)
  p.innerText = stockHash.ticker

  //<div class="dropdown">
  const dropDiv = document.createElement("div")
  dropDiv.setAttribute("class", "dropdown")

  //<button onclick="myFunction()" class="dropbtn">Dropdown</button>
  dropdownButton.setAttribute("class", "dropbtn")
  dropdownButton.dataset.dropId = stockHash.id
  dropdownButton.addEventListener('click', myScript)

  dropDiv.appendChild(dropdownButton)

  //<div id="myDropdown" class="dropdown-content">
  const dropContentDiv = document.createElement("div")
  dropContentDiv.setAttribute("drop-id", stockHash.id)
  dropContentDiv.setAttribute("class", "dropdown-content")
  dropDiv.appendChild(dropContentDiv)


  const dropdownOptions = ["current ratio", 
    "gross margin", 
    "net profit margin", 
    "return on equity", 
    "return on assets", 
    "free cashflow per share"]


  dropdownOptions.forEach(option => {
    const dropdownOption = document.createElement("li")
    dropdownOption.innerText = option
    dropContentDiv.appendChild(dropdownOption)

    dropdownOption.setAttribute("data-stock-id", stockHash.id)
    dropdownOption.addEventListener("click", createRatio)

  })


  dropdownButton.innerText = "Add Ratio"


  div.appendChild(p)
  div.appendChild(ul)
  div.appendChild(dropDiv)
  main.appendChild(div)
  
  stockHash.ratios.forEach(ratio => renderRatio(ratio))
}



const myScript = (e) => {

  e.preventDefault()

  selectedDropdown = document.querySelector(`div[drop-id="${e.target.dataset.dropId}"]`)
  selectedDropdown.classList.toggle("show")

}


function renderRatio(ratio){

  const divCard = document.querySelector(`div[data-id="${ratio.stock_id}"]`)
  const li = document.createElement("li")
  const button = document.createElement("button")

  li.innerText = `${ratio.name}:  ${ratio.value}`
  button.setAttribute("class", "release")
  button.setAttribute("data-ratio-id", ratio.id)
  button.innerText = "Remove"
  button.addEventListener('click', deleteRatio)

  li.appendChild(button)
  const ul = divCard.querySelector('ul')
  ul.appendChild(li)
}


const createRatio = (e) => {

  e.preventDefault()

  const configObj = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify({stock_id: e.target.dataset.stockId, ratio_name: e.target.innerText})
  }

  fetch(RATIOS_URL, configObj)
      .then(res => res.json())
      .then(json => {
          if(json.message){  
              alert(json.message)
          } else {
              renderRatio(json)
          }
      })

}


const deleteRatio = (e) => {

  e.preventDefault()

  const configObj = {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      }
  }

  const selectedRatio = e.target.dataset.ratioId
  const ratioPATH =  RATIOS_URL + '/' + selectedRatio
  fetch(ratioPATH, configObj)
  e.target.parentElement.remove()


}


window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}