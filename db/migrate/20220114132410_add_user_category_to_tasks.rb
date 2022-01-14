class AddUserCategoryToTasks < ActiveRecord::Migration[6.1]
  def change
    add_reference :tasks, :user, foreign_key: { to_table: :users }
    add_reference :tasks, :category, foreign_key: { to_table: :categories }
  end
end
