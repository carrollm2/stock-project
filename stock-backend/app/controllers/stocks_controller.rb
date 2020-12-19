class StocksController < ApplicationController
    before_action :set_stock, only: [:show, :update]

    def index
        stocks = Stock.all
        render json: stocks, :include => {:ratios => {:except => [:created_at, :updated_at]}}, except: [:created_at]
    end 


    def show
        render json: @stock, :include => {:ratios => {:except => [:created_at, :updated_at]}}, except: [:created_at]
    end


    def update
        if @stock.update(stock_params)
            render json: @stock, :include => {:ratios => {:except => [:created_at, :updated_at]}}, except: [:created_at]
        else
            render json: {message: @stock.errors.messages[:price][0]}
        end   
    end


    private
    def stock_params
        params.require(:stock).permit(:ticker, :price, ratios_attributes: [:id, :name, :value])
    end  

    def set_stock
        @stock = Stock.find_by_id(params[:id])
    end

end
