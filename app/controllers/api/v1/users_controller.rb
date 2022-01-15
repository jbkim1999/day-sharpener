module Api
  module V1
    class UsersController < ApplicationController
      before_action :authenticate_user!
      protect_from_forgery with: :null_session

      def index
        @user = current_user
        respond_to do |format|
          format.json { render :json => @user}
        end
      end
    end
  end
end