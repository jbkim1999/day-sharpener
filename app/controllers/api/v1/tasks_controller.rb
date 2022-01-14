module Api
  module V1
    class TasksController < ApplicationController
      before_action :authenticate_user!

      def index
        @tasks = current_user.tasks
        respond_to do |format|
          format.json { render :json => @tasks }
        end
      end

      def create 
        @task = current_user.tasks.build(task_params)
        if @task.save
          respond_to do |format|
            format.json { render :json => @task }
          end
        else
          render json: { error: @task.errors.messages }, status: 422
        end
      end

      def update # May not need current_user?
        @task = Task.find_by(params[:id])
        if @task.update(task_params)
          respond_to do |format|
            format.json { render :json => @task }
          end
        else
          render json: { error: @task.errors.messages }, status: 422
        end
      end

      def destroy # May not need current_user as well?
        @task = Task.find_by(params[:id])
        if @task.destroy
          head :no_content
        else
          render json: { error: @task.errors.messages }, status: 422
        end
      end

      private
      def task_params
        params.require(:task).permit(:description, :due_date, :category_id)
      end
    end
  end
end
