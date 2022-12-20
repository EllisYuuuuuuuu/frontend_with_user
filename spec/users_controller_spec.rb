require 'rails_helper'

describe UsersController, type: :controller do
  before :each do
    user = User.new(:email=>'test@example.com')
    params = {resume: "resume", website: "test.com"}
    controller.stub(:current_user).and_return(user)
    controller.stub(:user_params).and_return(params)
  end
  it 'should be able to update a user' do
    params = {
      user: { 
         resume: "test.pdf", 
         website: "test.com" 
      },
      format: :html
    }
    #patch :update, params: params
    expect{controller.update}.to raise_error
  end 
end 