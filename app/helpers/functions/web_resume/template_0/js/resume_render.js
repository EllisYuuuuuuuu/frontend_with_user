
/**
 * Template-specific render
 * @param {*} resume 
 */

function htmlEncode(value){
    return $('<div/>').text(value).html().replace(/\n/g, "<br />");
}
  
function htmlDecode(value){
    return $('<div/>').html(value).text();
}

function override_adapr(adapr) {
    override_info = user_override();
    radpt_each(override_info, function(key, value) {
        adapr[key] = value;
    });
    return adapr;
}

function translate_adapr(adapr) {
    var result = adapr;
    result["html-personal-intro"] = htmlEncode(adapr["personal-intro"]);

    result["html-skills"] = "";

    var skills = adapr["skills"];

    for (var i = 0; i < skills.length; i++) {
      var val = skills[i];
      result["html-skills"] += 
        String.raw `<span>` + val + String.raw `, </span>`;
    }

    result["html-projects"] = "";

    radpt_each(adapr["projects"], function(key, value) {
        str = String.raw `
        <div class="col-md-4">
          <div class="work-box">
            <a href="https://www.google.com">
              <!-- {{This is where you put your link to your project}} -->
              <div class="work-img">
                <img src="https://images.squarespace-cdn.com/content/v1/5a5906400abd0406785519dd/1547305849352-CYT6FWXR75U7ZUBL5NAK/ke17ZwdGBToddI8pDm48kKAwwdAfKsTlKsCcElEApLR7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UegTYNQkRo-Jk4EWsyBNhwKrKLo5CceA1-Tdpfgyxoog5ck0MD3_q0rY3jFJjjoLbQ/IB+alex.jpg?format=2500w" alt="" class="img-fluid">
                <!-- {{This is where you put your project image}} -->
    
              </div>
              <div class="work-content">
                <div class="row">
                  <div class="col-sm-8">
                    <h2 class="w-title">@#@#{TITLE}#@#@</h2>
                    <!-- {{This is your projects title}} -->
                    <div class="w-more">
                      <span class="w-date">@#@#{DESCRIPTION}#@#@</span>
                      <!-- {{This is your description of you projects}} -->
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="w-like">
                      <span class="ion-ios-plus-outline"></span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>`.replaceAll("@#@#{DESCRIPTION}#@#@", htmlEncode(value["description"])).replaceAll("@#@#{TITLE}#@#@", htmlEncode(value["title"]));
        if (str === undefined) {
            console.log("undefined in for_each_position");
        } else {
            result["html-projects"] += str;
        }
    });
    console.log(result);
    return result;
}

function render(metadata) {
    jQuery.each(metadata, function(key, val) {
        if (key == "website-title") {
            document.title = val;
        } else if (key.substring(0, 5) == 'html-') {
            $('#resume-' + key).html(val);
        } else {
            $('#resume-' + key).text(val);
        }
    })
}

$(window).load(function() {
    resume = user_resume();
    adapr = resume_adapter(resume);
    adapr = override_adapr(adapr);
    data = translate_adapr(adapr);
    render(data);
    
    // This is about the animation in the original template
    loadSlide();
});

