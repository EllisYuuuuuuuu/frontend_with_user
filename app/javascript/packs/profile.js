$(document).ready(function() {
    console.log('ready');
    // // load the user's last search result
    const user_email = document.getElementById('user_email').innerText;
    $.ajax({
        url: "https://i9umv18cjj.execute-api.us-east-1.amazonaws.com/v3/save?email=" + user_email,
        type: "GET",
        crossDomain: true,
        // contentType: 'application/json',
        dataType: "json",
        error: function(res) {
            console.log("Error: \n" + JSON.stringify(res));
        },
        success: function(res) {
            console.log("Success: \n" + JSON.stringify(res));
            let lastResult = res
            var cpu = lastResult['CPU'];
            document.getElementById('CPU').innerText = cpu;
            var gpu = lastResult['GPU'];
            document.getElementById('GPU').innerText = gpu;
            var ram = lastResult['RAM'];
            document.getElementById('RAM').innerText = ram;
            var ssd = lastResult['SSD'];
            document.getElementById('SSD').innerText = ssd;
            var hdd = lastResult['HDD'];
            document.getElementById('HDD').innerText = hdd;
            var usb = lastResult['USB'];
            document.getElementById('USB').innerText = usb;
        }
    })
});
