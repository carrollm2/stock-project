console.log('@@stock.js')


class Stock {
    constructor(data) {
 
      this.id = data.id
      this.ticker = data.ticker;
      this.price = data.price;
      this.ratios = data.ratios;
      this.updated_at = data.updated_at;
      Stock.all.push(this);
    }
  

    static findById(id) {
      return this.all.find(stock => stock.id === id);
    }


    renderStock(data){

        const div = document.createElement("div")

        const ticker = document.createElement("p")
        const price = document.createElement("p")
        const updated = document.createElement("p")
        const updatePriceButton = document.createElement("button")
        const sortRatiosButton = document.createElement("button")
        const ul = document.createElement("ul")
        const dropdownButton = document.createElement("button")

        div.setAttribute("class", "card")
        div.setAttribute("data-id", data.id)

        ticker.innerText = data.ticker

        price.setAttribute("class", "price")
        price.innerText = `Share Price ${data.price}`

        updated.innerText = `Price Updated at: ${data.updated_at.slice(0,10)}`

        updatePriceButton.setAttribute("data-stock-id", data.id)
        updatePriceButton.innerText = "Update Price"
        updatePriceButton.addEventListener('click', this.updatePrice)

        sortRatiosButton.innerText = "Sort Ratios"
        sortRatiosButton.setAttribute("data-stock-id", data.id)
        sortRatiosButton.addEventListener('click', this.sortRatios)

        const dropDiv = document.createElement("div")

        dropdownButton.innerText = "Add Ratio"
        dropdownButton.setAttribute("class", "dropbtn")
        dropdownButton.setAttribute("data-stock-id", data.id)
        dropdownButton.addEventListener('click', buttonMenuScript)
      
        dropDiv.appendChild(dropdownButton)
      
        const dropContentDiv = document.createElement("div")
        dropContentDiv.setAttribute("drop-id", data.id)
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
      
          dropdownOption.setAttribute("data-stock-id", data.id)
          dropdownOption.addEventListener("click", this.createRatio)
        })

        div.appendChild(ticker)
        div.appendChild(price)
        div.appendChild(updated)
        div.appendChild(updatePriceButton)
        div.appendChild(sortRatiosButton)
        div.appendChild(ul)
        div.appendChild(dropDiv)
        main.appendChild(div)
        
        data.ratios.forEach(ratio => {
            let newRatio = new Ratio(ratio)
            newRatio.renderRatio(ratio)
        })
    }



    sortRatios = (e) => {
      e.preventDefault()
      
      const list = document.querySelector(`div[data-id="${e.target.dataset.stockId}"] ul`)
      const all_list_elements = list.getElementsByTagName("li")

      for (let i = 0; i < all_list_elements.length - 1; i++){
        for(let j = i + 1; j < all_list_elements.length; j++){
          if (all_list_elements[i].innerHTML.split(':')[0].toLowerCase() > all_list_elements[j].innerHTML.split(':')[0].toLowerCase()){
            all_list_elements[i].parentNode.insertBefore(all_list_elements[j], all_list_elements[i])
          }
        }
      }

    }



    updatePrice = (e) => {
      e.preventDefault()
      
      console.log('@@updatePrice')

      this.renderUpdateForm(e)

      const updateSubmitButton = document.querySelector('form button[data-button="submit"]')  
      const updateCancelButton = document.querySelector('form button[data-button="cancel"]') 

      updateSubmitButton.addEventListener('click', function(s){
        s.preventDefault()
        const stock_id = parseInt(e.target.dataset.stockId);
        const stock = Stock.findById(stock_id);
        const price = parseFloat(document.querySelector('form input').value);
        const bodyJSON = {stock_id, price}        
        s.target.parentElement.remove()

        const configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(bodyJSON)
        }    

        fetch(`${BACKEND_URL}/stocks/${e.target.dataset.stockId}`, configObj)
            .then(res => res.json())
            .then(json => {
                if(json.message){  
                    alert(json.message)
                } else {
                  document.querySelector(`div[data-id="${e.target.dataset.stockId}"] .price`).innerText = `Share Price ${json.price}`
                  console.log('update Stock')
                }
            })
            .catch(error => alert(error.message));

      })

      updateCancelButton.addEventListener('click', function(s){
        s.preventDefault()
        s.target.parentElement.remove()
      })

    }


    renderUpdateForm(e) {

      const updateForm = document.createElement("form")
      updateForm.setAttribute("form-id", e.target.dataset.stockId)
      const priceInput = document.createElement("input")
      const submitButton = document.createElement("button")
      submitButton.setAttribute("data-button", "submit")
      const cancelButton = document.createElement("button")
      cancelButton.setAttribute("data-button", "cancel")
      priceInput.placeholder = "Enter Price Here."
      submitButton.innerText = "Update Price"
      cancelButton.innerText = "Cancel"

      updateForm.appendChild(priceInput)
      updateForm.appendChild(submitButton)
      updateForm.appendChild(cancelButton)

      const selectedUpdate = document.querySelector(`div[data-id="${e.target.dataset.stockId}"]`) 
      selectedUpdate.appendChild(updateForm)

    }


    createRatio = (e) => {

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
                    let newRatio = new Ratio(json)
                    newRatio.renderRatio(json)
                }
            })
            .catch(error => alert(error.message));
      
    }

  }
  
  Stock.all = [];
  

  const buttonMenuScript = (e) => {

    e.preventDefault()
  
    const selectedDropdown = document.querySelector(`div[drop-id="${e.target.dataset.stockId}"]`)
    selectedDropdown.classList.toggle("show")
  
  }
  
  
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      const dropdowns = document.getElementsByClassName("dropdown-content");

      for (let i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }