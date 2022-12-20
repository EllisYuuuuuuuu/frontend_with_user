
/**
 * Template-specific adapter
 * @param {*} resume 
 */

function resume_adapter(resume) {
    var result = {};
    result["website-title"] = radpt.name(resume);
    result["header-title"] = radpt.name(resume);
    result["name"] = radpt.name(resume);
    result["title"] = "Hi, my name is " + radpt.name(resume);
    result["subtitle"] = radpt.skills(resume);
    result["email"] = radpt.email(resume);

    result["occupation"] = radpt.current(resume);

    result["personal-intro"] = "";

    radpt.for_each_school(resume, 
        function(isCurrent, start, end, org, degree, gpa, summary) {
            // assume only one school
            if (!isCurrent) {
                result["personal-intro"] = "I graduate from " + org + 
                " with a GPA of " + gpa + "\n" + 
                degree + "    " + start + " - " + end;
            } else {
                result["personal-intro"] = "I am a student in " + org + 
                " with a current GPA of " + gpa + "\n" + 
                degree + "    " + start + " - " + end;
            }
        });
    result["occupation"] = radpt.current(resume);

    result["phone"] = radpt.phone(resume);
    result["skills"] = radpt.skills(resume);

    result["project-subtitle"] = "Here are my projects";
    result["projects"] = [];

    radpt.for_each_position(resume, function(isCurrent, start, end, org, title, summary) {
        result["projects"].push({
          "title": title,
          "description": summary
        });
    });
    
    return result;
}

function get_fields_from_resume_js() {
    return resume_adapter(user_resume());
}
