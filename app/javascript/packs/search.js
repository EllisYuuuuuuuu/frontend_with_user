let allHardwares = null
const hardwareNames = ["CPU", "GPU", "RAM", "SSD", "HDD", "USB"]

window.submitChat = async function submitChat(e) {
    const host = "https://i9umv18cjj.execute-api.us-east-1.amazonaws.com/v3/recommend/?"
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

    if (email !== "") {
        url = url + "&email=" + email
        params['email'] = email
        console.log(url)
    }

    const response = await fetch(url, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        const result = response.json()
        console.log(result)
        console.log(result.then((res)=>{
            allHardwares = res.body
            console.log(allHardwares)
            //const hardwareNames = ["CPU", "GPU", "RAM", "SSD", "HDD", "USB"]
            // document.getElementById('hardware_info').innerText = "Here is our recommendations: (More results are send to your email) \n";
            for (let j = 0; j < hardwareNames.length; j++){
                let hardwareName = hardwareNames[j]
                const hardwareList = allHardwares[hardwareName]
                const hardwareArea = document.getElementById(hardwareName)
                // hardwareArea.innerText = hardwareName + ":\n "
                hardwareArea.innerText = hardwareList[0]
            }
        }))
    })

    // var apigClient = apigClientFactory.newClient();
    // apigClient.recommendGet(params, body)
    //     .then(function(result){
    //         console.log(result['data'])
    //         const allHardwares = result['data']['body']
    //         console.log(allHardwares)
    //         const hardwareNames = ["CPU", "GPU", "RAM", "SSD", "HDD", "USB"]
    //         document.getElementById('hardware_info').innerText = "Here is our recommendations: (More results are send to your email) \n";
    //         for (let j = 0; j < hardwareNames.length; j++){
    //             var hardwareName = hardwareNames[j]
    //             const hardwareList = allHardwares[hardwareName]
    //             const hardwareArea = document.getElementById(hardwareName)
    //             hardwareArea.innerText = hardwareName + ":\n "
    //             hardwareArea.innerText+=hardwareList[0]
    //         }
    //     }).catch( function(result){
    //     console.log(JSON.stringify(result))
    // });
}

window.likeResult = async function likeResult() {
    // if user click like button, call the api to modify the database
    document.getElementById('like').disabled = true
    const likeUrl = "https://i9umv18cjj.execute-api.us-east-1.amazonaws.com/v3/configs"
    const response = await fetch(likeUrl, {
        method: 'post',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(allHardwares)
    })
    console.log("like result button clicked and send post request!")
}

window.saveResult = async function saveResult() {
    // if user click save button, call the api to modify the database
    document.getElementById('save').disabled = true
    const user_email = document.getElementById('user_email').innerText;
    console.log("user_email: " + user_email)
    // get the first hardware in each category
    var user_configs = {}
    for (let j = 0; j < hardwareNames.length; j++){
        let hardwareName = hardwareNames[j]
        const hardwareList = allHardwares[hardwareName]
        user_configs[hardwareName] = hardwareList[0]
    }
    user_configs['email'] = user_email
    console.log(user_configs)
    const saveUrl = "https://i9umv18cjj.execute-api.us-east-1.amazonaws.com/v3/save"
    const response = await fetch(saveUrl, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user_configs)
    })
    console.log("save button clicked and send post request!")
}
