console.log('@@ratios')

class Ratio {
    constructor(data) {
 
      this.stock_id = data.stock_id
      this.name = data.name;
      this.value = data.value;
      Ratio.all.push(this);
    }

    renderRatio(data){

        const divCard = document.querySelector(`div[data-id="${data.stock_id}"]`)
        const li = document.createElement("li")
        const button = document.createElement("button")
      
        li.innerText = `${data.name}:  ${data.value}`
        button.setAttribute("class", "release")
        button.setAttribute("data-ratio-id", data.id)
        button.innerText = "Remove"
        button.addEventListener('click', this.deleteRatio)
      
        li.appendChild(button)
        const ul = divCard.querySelector('ul')
        ul.appendChild(li)        
    }

    
    deleteRatio = (e) => {

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



}

Ratio.all = [];