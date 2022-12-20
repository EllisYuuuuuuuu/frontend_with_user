submitChat = function submitChat() {
        const host = "http://ec2-54-172-72-63.compute-1.amazonaws.com:5011/recommend?"
        var level = document.getElementById('level').value;
        var budget = document.getElementById('budget').value;
        var email = document.getElementById('email').value;

        if (level === "" || budget === "") {
            result_area = document.getElementById('hardware_info');
            result_area.innerText = "Need level and budget"
            return
        }
        
        var url = host + "level=" + level + "&budget=" + budget;
        var params = {
            "level": level,
            "budget": budget
        };

        var body = {
        }

        if (email !== "") {
            url = url + "&email=" + email
            params['email'] = email
            console.log(url)
        }

        var apigClient = apigClientFactory.newClient();
        apigClient.recommendGet(params, body)
            .then(function(result){
                console.log(result['data'])
                const allHardwares = result['data']['body']
                console.log(allHardwares)
                const hardwareNames = ["CPU", "GPU", "RAM", "SSD", "HDD", "USB"]
                document.getElementById('hardware_info').innerText = "Here is our recommendations: (More results are send to your email) \n";
                for (let j = 0; j < hardwareNames.length; j++){
                    var hardwareName = hardwareNames[j]
                    const hardwareList = allHardwares[hardwareName]
                    const hardwareArea = document.getElementById(hardwareName)
                    hardwareArea.innerText = hardwareName + ":\n "
                    hardwareArea.innerText+=hardwareList[0]
                }
            }).catch( function(result){
            console.log(JSON.stringify(result))
        });


        // const httpRequest = new XMLHttpRequest();
        // httpRequest.open('GET', url, true);
        // httpRequest.send();
        // httpRequest.onreadystatechange = function () {
        //     if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        //         const json = httpRequest.responseText;
        //         const allHardwares = JSON.parse(json)['body']
        //         const hardwareNames = ["CPU", "GPU", "RAM", "SSD", "HDD", "USB"]
        //         document.getElementById('hardware_info').innerText = "Here is our recommendations: (More results are send to your email) \n";
        //         for (let j = 0; j < hardwareNames.length; j++){
        //             var hardwareName = hardwareNames[j]
        //             const hardwareList = allHardwares[hardwareName]
        //             const hardwareArea = document.getElementById(hardwareName)
        //             hardwareArea.innerText = hardwareName + ":\n "
        //             hardwareArea.innerText+=hardwareList[0]
        //         }
        //     }
        // };
    }
