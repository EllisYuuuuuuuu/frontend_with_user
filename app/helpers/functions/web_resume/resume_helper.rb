require 'rest_client'

module Functions::WebResume::ResumeHelper

    def self.parse_resume(file_path)
        leverURL = 'https://jobs.lever.co/parseResume'

        response = RestClient::Request.execute(
            method: :post,
            url: leverURL,
            timeout: 600,
            payload: {
                multipart: true,
                resume: File.new(file_path, 'rb')
            },
            cookies: {'lever-referer' => 'https://jobs.lever.co/'},
            headers: {'referer' => 'https://jobs.lever.co/', 'origin' => 'https://jobs.lever.co/'}
        )

        return response
    end

    def self.get_resume_js_from_parsed(parsed_resume)
        str = "/**
        * This file should be generated by the Resume Parser.
        * @returns user's resume in the form of js. Typically, this function is called by resume adapters to render the web pages.
        */
    
        function user_resume() {
            return #{parsed_resume};
        }"
        return str
    end

    def self.get_resume_js(resume_file_path)
        res = parse_resume(resume_file_path)
        return get_resume_js_from_parsed(res)
    end

end
