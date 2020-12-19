class Stock < ApplicationRecord
    has_many :ratios
    accepts_nested_attributes_for :ratios

    validates_numericality_of :price, :only_float => true, :greater_than_or_equal_to => 0.0
end
