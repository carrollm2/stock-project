class RatiosController < ApplicationController

    STOCK_DATA = {
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


    def create

        stock = Stock.find(params[:stock_id])
        ratio = stock.ratios.build(name: params[:ratio_name], value: STOCK_DATA[stock.ticker][params[:ratio_name]])

        if ratio.save
            render json: ratio
        else
            render json: {message: ratio.errors.messages}
        end
    end

    def index
        ratios = Ratio.all
        render json: ratios
    end

    def show
        ratio = Ratio.find_by(id: params[:id])
        render json: ratio, except: [:created_at, :updated_at]
    end

    def destroy
        ratio = Ratio.find_by(id: params[:id])
        ratio.destroy
    end

end
