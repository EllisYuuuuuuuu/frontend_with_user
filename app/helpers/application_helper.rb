require_relative "functions/web_resume/bundle_helper.rb"
require_relative "functions/web_resume/resume_helper.rb"
require_relative "functions/web_resume/deploy_helper.rb"


module ApplicationHelper
  def generate(path, unique_id)
    # path = "./OmkarResume.pdf"
    # if current_user
    #   puts "#{current_user.resume}"
    # end
    puts path
    puts unique_id
    unique_id = unique_id[0..unique_id.index('@')-1]
    puts unique_id
    if path == nil
      return
    end
    if current_user.website.nil?

      resume_str = Functions::WebResume::ResumeHelper::get_resume_js(path)
      template_path = 'app/helpers/functions/web_resume/template_0'
      resume_relative_path = 'js'
      dest_path = 'app/helpers/functions/web_resume/output_local_' + unique_id
      local_path = Functions::WebResume::BundleHelper::bundle_to_local(template_path, resume_str, resume_relative_path, dest_path)
      ret = Functions::WebResume::DeployHelper::upload_to_s3(local_path, '', unique_id)
      
      template_fields_hashmap = Functions::WebResume::OverrideHelper.get_template_fields(resume_str, template_path)
      override_info = Functions::WebResume::OverrideHelper.get_override_info_from_hashmap(template_fields_hashmap)
      
      current_user.website = ret 
      current_user.save
    end
    puts "============================================"
    puts current_user.website
    return current_user.website

    end
  end
# end
