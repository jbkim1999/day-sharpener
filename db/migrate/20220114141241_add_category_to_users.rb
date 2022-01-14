class AddCategoryToUsers < ActiveRecord::Migration[6.1]
  def change
    add_reference :categories, :user, foreign_key: { to_table: :users }
  end
end
