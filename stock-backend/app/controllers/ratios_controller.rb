require_relative '../models/ratio.rb'

class RatiosController < ApplicationController
    before_action :set_ratio, only: [:show, :update, :destroy]

    def create

        stock = Stock.find(params[:stock_id])
        ratio = stock.ratios.build(name: params[:ratio_name], value: StockData::STOCKS["stock"][stock.ticker]["ratios"][params[:ratio_name]])

        if ratio.save
            render json: ratio
        else
            render json: {message: ratio.errors.messages[:name][0]}
        end
    end


    def index
        ratios = Ratio.all
        render json: ratios
    end


    def show
        render json: @ratio, except: [:created_at, :updated_at]
    end

    
    def update

        if @ratio.update(ratio_params)
            render json: @ratio
        else
            render json: {message: @ratio.errors.messages[:value][0]}
        end   
    end


    def destroy
        @ratio.destroy
    end


    private
    def ratio_params
        params.require(:ratio).permit(:name, :value)
    end  

    def set_ratio
        @ratio = Ratio.find_by_id(params[:id])
    end


end
