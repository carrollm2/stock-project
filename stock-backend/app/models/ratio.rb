require 'yaml'

class Ratio < ApplicationRecord
  belongs_to :stock
  
  validates_uniqueness_of :name, :scope => [:stock_id], :message=>"Stock already displaying requested ratio", on: :create

end


module StockData

    file_path = File.expand_path("data/stock_data.yml")
    STOCKS = YAML.load(File.read(file_path))

end
  