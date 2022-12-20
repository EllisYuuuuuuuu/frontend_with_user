$(document).ready(function() {
    console.log('ready');

    $.ajax({
        url: "https://i9umv18cjj.execute-api.us-east-1.amazonaws.com/v2/hot-config",
        type: "GET",
        crossDomain: true,
        // contentType: 'application/json',
        dataType: "json",
        error: function(res) {
            console.log("Error: \n" + JSON.stringify(res));
        },
        success: function(res) {
            console.log("Success: \n" + JSON.stringify(res));

            var cpu = res['body']['CPU'];
            document.getElementById('top_CPU').innerText = cpu;
            var gpu = res['body']['GPU'];
            document.getElementById('top_GPU').innerText = gpu;
            var ram = res['body']['RAM'];
            document.getElementById('top_RAM').innerText = ram;
            var ssd = res['body']['SSD'];
            document.getElementById('top_SSD').innerText = ssd;
            var hdd = res['body']['HDD'];
            document.getElementById('top_HDD').innerText = hdd;
            var usb = res['body']['USB'];
            document.getElementById('top_USB').innerText = usb;

        }
    })
    
});
