
require 'fileutils'

module Functions::WebResume::BundleHelper

    def self.bundle_to_local_with_override(template_path, resume_str, override_info, js_relative_path, dest_path)

        # Create the directory if it does not exist
        dest_dir = File.dirname(dest_path)
        unless File.directory?(dest_dir)
            FileUtils.mkdir_p(dest_dir)
        end

        FileUtils.cp_r template_path + '/.', dest_path

        File.open(dest_path + '/' + js_relative_path + '/resume.js', 'w') { |file| 
            file.write(resume_str)
            file.write("\n\n")
            file.write(override_info)
        }

        return dest_path
    end

    # The old bundle function... to maintain compatibility
    def self.bundle_to_local(template_path, resume_str, js_relative_path, dest_path)
        return self.bundle_to_local_with_override(template_path, resume_str, "function user_override() {return {}; }", js_relative_path, dest_path)
    end

end
