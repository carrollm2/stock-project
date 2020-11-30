class CreateRatios < ActiveRecord::Migration[6.0]
  def change
    create_table :ratios do |t|
      t.string :name
      t.float :value

      t.references :stock, null: false, foreign_key: true

      t.timestamps
    end
  end
end
