class AddColumnToStocks < ActiveRecord::Migration[6.0]
  def change
    add_column :stocks, :favorited, :boolean, default: false
  end
end
