require 'rails_helper'

describe WebsitesController, type: :controller do
  before(:all) do
    
  end

  it 'should be able to create a website' do
    post :new, params: {website: {website_address:"test address", username: "test user"}}
    expect(response.status).to eq(200)
  end 

  it 'should be able to show a website' do 
    @website = 'test website'
    controller.show
  end 

  it 'should be able to index website' do 
    @website = 'test website'
    controller.index
  end 
end 
