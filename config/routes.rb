Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'users/sessions' }

  root 'pages#index'
  
  # Need more understanding on advanced routes
  namespace :api do
    namespace :v1 do
      resources :tasks, only: [:index, :show, :create, :update, :destroy]
        get 'tasks/:id/complete', to: 'tasks#complete' # Adding custom routes
      resources :categories, only: [:index, :create, :destroy]
      resources :users, only: [:index]
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
