# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


require_relative '../app/models/ratio.rb'


Stock.delete_all
Ratio.delete_all

stocks_ticker = StockData::STOCKS["stock"].keys()

stock_collection = []

stocks_ticker.each do |ticker|
  stock_collection << Stock.create(ticker: ticker, price: StockData::STOCKS["stock"][ticker]["price"])

  StockData::STOCKS["stock"][ticker]["ratios"].each do |ratio_name, ratio_value|
    Stock.find_by(ticker: ticker).ratios.build(name: ratio_name, value: ratio_value).save
  end
end


