class App {
    constructor(){
        this.adapter = new Adapter()
        this.loadStocks = this.loadStocks.bind(this);
    }


    loadStocks(stocks){
        stocks.forEach(stock => {
            let newStock = new Stock(stock)
            newStock.renderStock(stock) 
        })
    }

}