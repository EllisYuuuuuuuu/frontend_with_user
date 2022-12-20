require "rails_helper"

describe ApplicationHelper, type: :helper do
  before :each do
    user = User.new(:email=>'test@example.com')
    helper.stub(:current_user).and_return(user)
  end
  describe "#generate" do
    it "should return nothing if path is nil" do 
      expect(helper.generate(nil, 'test@test.com')).to be_nil
    end 

    it "should return error if bucket name already exists " do 
      # expect {helper.generate('./test-resume.pdf', 'test@test.com')}.to raise_error 
    end 

    it "returns website link" do
      expect(helper.generate('./test-resume.pdf', 'test1003@test.com')).to include "http://webzero"
    end
  end
end
