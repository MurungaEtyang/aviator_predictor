export let tinyApi = (phoneNumber: string, amount: string) =>{
    const url = "https://tinypesa.com/api/v1/express/initialize";
    let accno = 200;
    let apiKey = "cdcbi5kqWqq"

    return  fetch(url, {
        body: "amount=" + amount + "&msisdn=" + phoneNumber + "&account_no="+ accno,
        headers: {
            Apikey: apiKey,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "POST",
    }).then(
        response => {
            if (response.ok) {
                return response.json();
            }
        }
    ).then(responseBody => {
        if (responseBody.success === true) {

            return fetch('https://tinypesa.com/api/v1/express/get_status/' + accno,
                {
                    method: "GET",
                    headers: {
                        Accept: 'application/json',
                        Apikey: apiKey
                    }
                }
            );
        }else return null
    }).then(responseTransStat => {

        if (responseTransStat !== null) {
            if (responseTransStat.ok) {
                return responseTransStat.json();
            }
        }
    }).then(transStatData => {

        if (transStatData.is_complete === 1) {
            alert('success!');
            return
        }
        alert('failed');
    });
}