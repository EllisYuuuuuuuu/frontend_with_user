function date_tf(date) {
    if (date) {
        return date["year"] + "/" + date["month"];
    } else {
        return "";
    }
}

function radpt_each(obj, func) {
    for (var key in obj) {
        var value = obj[key];
        var ret = func(key, value);
        if (ret == undefined || ret == true) {

        } else {
            break;
        }
    }
}

var radpt = {
    name: function(resume) {
        if (resume["names"].length == 0) return "Not found in resume";
        return resume["names"][0];
    },
    email: function(resume) {
        if (resume["emails"].length == 0) return "Not found in resume";
        return resume["emails"][0]["value"];
    },
    phone: function(resume) {
        if (resume["phones"].length == 0) return "Not found in resume";
        return resume["phones"][0]["value"];
    },
    for_each_school: function(resume, func) {
        radpt_each(resume["schools"], function(key, val) {
            return func(val["isCurrent"], 
                date_tf(val["start"]),
                date_tf(val["end"]),
                val["org"] || "",
                val["degree"] || "",
                val["gpa"] || "",
                val["summary"] || "");
        });
    },
    for_each_position: function(resume, func) {
        radpt_each(resume["positions"], function(key, val) {
            return func(val["isCurrent"], 
                date_tf(val["start"]),
                date_tf(val["end"]),
                val["org"] || "",
                val["title"] || "",
                val["summary"] || "");
        });
    },
    current: function(resume) {
        result = "";
        radpt_each(resume["schools"], function(key, val) {
            if (val["isCurrent"] === true) {
                result = val["degree"];
                return false;
            }
            return true;
        });
        if (result != "") {
            return result;
        }
        
        radpt_each(resume["positions"], function(key, val) {
            if (val["isCurrent"] === true) {
                result = val["title"] + " in " + val["org"];
                return false;
            }
            return true;
        });

        return result;
    },
    skills: function(resume) {
        return resume["summary"]["skills"].split(",");
    }
};
