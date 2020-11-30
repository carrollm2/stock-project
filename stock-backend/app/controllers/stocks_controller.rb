class StocksController < ApplicationController
    def index
        stocks = Stock.all
        render json: stocks, :include => {:ratios => {:except => [:created_at, :updated_at]}}, except: [:created_at, :updated_at]
    end 

    def show
        stock = Stock.find_by(id: params[:id])
        render json: stock, :include => {:ratios => {:except => [:created_at, :updated_at]}}, except: [:created_at, :updated_at]
    end
end
