class HomeController < ApplicationController
  def index
    @sign_up_test = ab_test(:sign_up)
  end

  def signup
    ab_finished(:sign_up)
  end
end
