class Ratio < ApplicationRecord
  belongs_to :stock

  validates_uniqueness_of :name, :scope => [:stock_id], :message=>"Stock already displaying requested ratio", on: :create

end


module StockData
    RATIOS = {
        "FB" => {
            "current ratio" => 5.509,
            "gross margin" => 80.4658,
            "net profit margin" => 36.544,
            "return on equity" => 6.6643,
            "return on assets" => 5.3579,
            "free cashflow per share" => 2.1122
        },
        "AAPL" => {
            "current ratio" => 1.3636,
            "gross margin" => 38.1604,
            "net profit margin" => 19.5879,
            "return on equity" => 19.3958,
            "return on assets" => 3.9128,
            "free cashflow per share" => 1.0526
        },
        "NFLX" => {
            "current ratio" => 1.2376,
            "gross margin" => 39.901,
            "net profit margin" => 12.275,
            "return on equity" => 7.6449,
            "return on assets" => 2.0454,
            "free cashflow per share" => 2.5298
        },    

        "GOOGL" => {
            "current ratio" => 3.4101,
            "gross margin" => 54.2655,
            "net profit margin" => 24.3584,
            "return on equity" => 5.2823,
            "return on assets" => 3.7585,
            "free cashflow per share" => 38.8358
        }
    }

end
  