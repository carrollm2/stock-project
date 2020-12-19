console.log('@@ratios')

class Ratio {
    constructor(data) {

      this.id = data.id  
      this.stock_id = data.stock_id
      this.name = data.name;
      this.value = data.value;
      Ratio.all.push(this);
    }

    static findById(id) {
        return this.all.find(ratio => ratio.id === id);
      }    

    renderRatio(data){

        const divCard = document.querySelector(`div[data-id="${data.stock_id}"]`)
        const li = document.createElement("li")
        const releaseButton = document.createElement("button")
        const editButton = document.createElement("button")
      
        li.setAttribute("data-ratio-id", data.id)
        const data_name = document.createElement("p")

        li.appendChild(data_name)
        data_name.innerText = `${data.name}:  ${data.value}`


        releaseButton.setAttribute("class", "release")
        releaseButton.setAttribute("data-ratio-id", data.id)
        releaseButton.innerText = "Remove"
        releaseButton.addEventListener('click', this.deleteRatio)

        editButton.setAttribute("class", "edit")
        editButton.setAttribute("data-ratio-id", data.id)
        editButton.innerText = "Edit"
        editButton.addEventListener('click', this.editRatio)
      
        data_name.appendChild(releaseButton)
        data_name.appendChild(editButton)
        const ul = divCard.querySelector('ul')
        ul.appendChild(li)        
    }


    renderEditRatioForm(e) {

        const editForm = document.createElement("form")
        const ratio = Ratio.findById(parseInt(e.target.dataset.ratioId))
        const stock_id = ratio.stock_id
        editForm.setAttribute("form-id", stock_id)
        const ratioInput = document.createElement("input")
        const submitButton = document.createElement("button")
        submitButton.setAttribute("data-button", "submit")
        const cancelButton = document.createElement("button")
        cancelButton.setAttribute("data-button", "cancel")
        ratioInput.placeholder = `${ratio.name} value`
        submitButton.innerText = "Update Ratio"
        cancelButton.innerText = "Cancel"
  
        editForm.appendChild(ratioInput)
        editForm.appendChild(submitButton)
        editForm.appendChild(cancelButton)

        const selectedUpdate = document.querySelector(`div[data-id="${stock_id}"]`) 
        selectedUpdate.appendChild(editForm)

    }

    
    editRatio = (e) => {

        console.log('@@edit')

        e.preventDefault()

        this.renderEditRatioForm(e)

        const editSubmitButton = document.querySelector('form button[data-button="submit"]')  
        const editCancelButton = document.querySelector('form button[data-button="cancel"]') 
  
        editSubmitButton.addEventListener('click', function(s){
          s.preventDefault()

          const ratio_id = parseInt(e.target.dataset.ratioId);
          const ratio = Ratio.findById(ratio_id);
          const value = parseFloat(document.querySelector('form input').value);
          const bodyJSON = {ratio_id, value}        
          s.target.parentElement.remove()
  
          const configObj = {
              method: "PATCH",
              headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
              },
              body: JSON.stringify(bodyJSON)
          }    
  

          fetch(`${BACKEND_URL}/ratios/${e.target.dataset.ratioId}`, configObj)
              .then(res => res.json())
              .then(json => {
                  if(json.message){  
                      alert(json.message)
                  } else {

                    const selectedRatio = document.querySelector(`li[data-ratio-id="${e.target.dataset.ratioId}"] p`)
                    selectedRatio.innerText = `${json.name}:  ${json.value}`

                    const ratio = Ratio.findById(parseInt(e.target.dataset.ratioId))
                    const stock_id = ratio.stock_id
                    const stock = Stock.findById(stock_id)


                    const releaseButton = document.createElement("button")
                    const editButton = document.createElement("button")
                  
                    selectedRatio.setAttribute("data-ratio-id", json.id)
                    selectedRatio.innerText = selectedRatio.innerText.replace(/(\d)+\.(\d+)/, json.value)

            
                    releaseButton.setAttribute("class", "release")
                    releaseButton.setAttribute("data-ratio-id", json.id)
                    releaseButton.innerText = "Remove"
                    releaseButton.addEventListener('click', ratio.deleteRatio)
            
                    editButton.setAttribute("class", "edit")
                    editButton.setAttribute("data-ratio-id", json.id)
                    editButton.innerText = "Edit"
                    editButton.addEventListener('click', ratio.editRatio)                    

                    selectedRatio.appendChild(releaseButton)
                    selectedRatio.appendChild(editButton)


                    console.log('update Ratio')
                  }
              })
              .catch(error => alert(error.message));
  
        })

        editCancelButton.addEventListener('click', function(s){
            s.preventDefault()
            s.target.parentElement.remove()
          })        
      
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
        e.target.parentElement.parentElement.remove()
      
      
    }

}

Ratio.all = [];