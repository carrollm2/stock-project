const BACKEND_URL = "http://localhost:3000";
const STOCKS_URL = `${BACKEND_URL}/stocks`
const RATIOS_URL = `${BACKEND_URL}/ratios`

const main = document.querySelector("main")

document.addEventListener('DOMContentLoaded', () => {
  
  const app = new App()
  app.adapter.fetchStocks().then(app.loadStocks)

})



