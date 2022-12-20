require 'rails_helper'

describe HomeController, type: :controller do
  it 'should be able to index' do
    current_user = User.create!({
        :email => "test1@test.com",
        :password => "123456",
        :password_confirmation => "123456"})
    # TODO: test index
    controller.index
    #expect(flash[:notice]).to eq('')
  end 
end 