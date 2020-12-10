console.log('@@stock.js')


class Stock {
    constructor(data) {
 
      this.ticker = data.ticker;
      this.ratios = data.ratios;
      Stock.all.push(this);
    }
  
    renderStock(data){

        const div = document.createElement("div")
        const p = document.createElement("p")
        const dropdownButton = document.createElement("button")
        const ul = document.createElement("ul")
      
        div.setAttribute("class", "card")
        div.setAttribute("data-id", data.id)
        p.innerText = data.ticker
      
        //<div class="dropdown">
        const dropDiv = document.createElement("div")
        dropDiv.setAttribute("class", "dropdown")
      
        //<button onclick="myFunction()" class="dropbtn">Dropdown</button>
        dropdownButton.setAttribute("class", "dropbtn")
        dropdownButton.dataset.dropId = data.id
        dropdownButton.addEventListener('click', buttonMenuScript)
      
        dropDiv.appendChild(dropdownButton)
      
        //<div id="myDropdown" class="dropdown-content">
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

        dropdownButton.innerText = "Add Ratio"


        div.appendChild(p)
        div.appendChild(ul)
        div.appendChild(dropDiv)
        main.appendChild(div)
        
        data.ratios.forEach(ratio => {
            let newRatio = new Ratio(ratio)
            newRatio.renderRatio(ratio)
            // renderRatio(ratio)
        })
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
      
    }

  }
  
  Stock.all = [];
  

  const buttonMenuScript = (e) => {

    e.preventDefault()
  
    selectedDropdown = document.querySelector(`div[drop-id="${e.target.dataset.dropId}"]`)
    selectedDropdown.classList.toggle("show")
  
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