class Adapter {
    constructor() {
      this.baseUrl = 'http://localhost:3000';
      this.headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };
    }
  
    fetchStocks() {
      return fetch(`${this.baseUrl}/stocks`).then(res => res.json());
    }

}