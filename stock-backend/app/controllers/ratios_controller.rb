class RatiosController < ApplicationController

    def create
        binding.pry
        stock = Stock.find(params[:stock_id])
        ratio = stock.ratios.build(name: "debt to equity ratio", value: 0.06)

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
