module Api
  module V1
    class CategoriesController < ApplicationController
      before_action :authenticate_user!
      skip_before_action :verify_authenticity_token
      # protect_from_forgery with: :null_session

      def index
        @categories = current_user.categories
        respond_to do |format|
          format.json { render :json => @categories }
        end
      end

      def create 
        @category = current_user.categories.build(category_params)
        if @category.save
          respond_to do |format|
            format.json { render :json => @category }
          end
        else
          render json: { error: @category.errors.messages }, status: 422
        end
      end

      def destroy
        @category = Category.find(params[:id])
        @default = current_user.categories.find_by(name: "Default")
        @category.tasks.each do |task|
          @default.tasks << task
        end
        if @category.destroy
          head :no_content
        else
          render json: { error: @category.errors.messages }, status: 422
        end
      end

      private
      def category_params
        params.require(:category).permit(:name)
      end
    end
  end
end


