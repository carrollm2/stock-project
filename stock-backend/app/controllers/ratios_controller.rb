require_relative '../models/ratio.rb'

class RatiosController < ApplicationController
    before_action :set_ratio, only: [:show, :destroy]

    def create

        stock = Stock.find(params[:stock_id])
        ratio = stock.ratios.build(name: params[:ratio_name], value: StockData::RATIOS[stock.ticker][params[:ratio_name]])

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


    def destroy
        @ratio.destroy
    end


    private
    def set_ratio
        @ratio = Ratio.find_by_id(params[:id])
    end


end
