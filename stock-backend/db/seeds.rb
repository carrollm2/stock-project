# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Stock.delete_all
Ratio.delete_all

stocks_ticker = [
  'FB',
  'AAPL',
  'NFLX',
  'GOOGL'
]

stock_collection = []

stocks_ticker.each do |ticker|
  stock_collection << Stock.create(ticker: ticker)
end


Stock.find_by(ticker: "FB").ratios.build(name: "current ratio", value: 5.509).save
Stock.find_by(ticker: "FB").ratios.build(name: "gross margin", value: 80.4658).save
Stock.find_by(ticker: "FB").ratios.build(name: "net profit margin", value: 36.544).save
Stock.find_by(ticker: "FB").ratios.build(name: "return on equity", value: 6.6643).save
Stock.find_by(ticker: "FB").ratios.build(name: "return on assets", value: 5.3579).save
Stock.find_by(ticker: "FB").ratios.build(name: "free cashflow per share", value: 2.1122).save

Stock.find_by(ticker: "AAPL").ratios.build(name: "current ratio", value: 1.3636).save
Stock.find_by(ticker: "AAPL").ratios.build(name: "gross margin", value: 38.1604).save
Stock.find_by(ticker: "AAPL").ratios.build(name: "net profit margin", value: 19.5879).save
Stock.find_by(ticker: "AAPL").ratios.build(name: "return on equity", value: 19.3958).save
Stock.find_by(ticker: "AAPL").ratios.build(name: "return on assets", value: 3.9128).save
Stock.find_by(ticker: "AAPL").ratios.build(name: "free cashflow per share", value: 1.0526).save


Stock.find_by(ticker: "NFLX").ratios.build(name: "current ratio", value: 1.2376).save
Stock.find_by(ticker: "NFLX").ratios.build(name: "gross margin", value: 39.901).save
Stock.find_by(ticker: "NFLX").ratios.build(name: "net profit margin", value: 12.275).save
Stock.find_by(ticker: "NFLX").ratios.build(name: "return on equity", value: 7.6449).save
Stock.find_by(ticker: "NFLX").ratios.build(name: "return on assets", value: 2.0454).save
Stock.find_by(ticker: "NFLX").ratios.build(name: "free cashflow per share", value: 2.5298).save


Stock.find_by(ticker: "GOOGL").ratios.build(name: "current ratio", value: 3.4101).save
Stock.find_by(ticker: "GOOGL").ratios.build(name: "gross margin", value: 54.2655).save
Stock.find_by(ticker: "GOOGL").ratios.build(name: "net profit margin", value: 24.3584).save
Stock.find_by(ticker: "GOOGL").ratios.build(name: "return on equity", value: 5.2823).save
Stock.find_by(ticker: "GOOGL").ratios.build(name: "return on assets", value: 3.7585).save
Stock.find_by(ticker: "GOOGL").ratios.build(name: "free cashflow per share", value: 38.8358).save
