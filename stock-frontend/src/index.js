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
  const button = document.createElement("button")
  const ul = document.createElement("ul")

  div.setAttribute("class", "card")
  div.setAttribute("data-id", stockHash.id)
  p.innerText = stockHash.ticker
  button.setAttribute("data-stock-id", stockHash.id)
  button.innerText = "Add Ratio"
  button.addEventListener('click', createRatio)

  div.appendChild(p)
  div.appendChild(button)
  div.appendChild(ul)
  main.appendChild(div)

  stockHash.ratios.forEach(stock => renderRatio(stock))
}

function renderRatio(ratio){

  const divCard = document.querySelector(`div[data-id="${ratio.stock_id}"]`)
  const li = document.createElement("li")
  const button = document.createElement("button")

  li.innerText = `${ratio.name} (${ratio.value})`
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
      body: JSON.stringify({stock_id: e.target.dataset.stockId})
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