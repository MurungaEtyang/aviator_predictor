
export const tinyApi = async (phoneNumber: string, amount: string): Promise<any> => {
    const urlInitialize = "https://tinypesa.com/api/v1/express/initialize";
    const urlGetStatus = "https://tinypesa.com/api/v1/express/get_status/";

    const accno = Math.floor(Math.random() * 1000) + 1;
    const apiKey = "cdcbi5kqWqq";


    const saveSaveResponse = (fileName:any, data:any) => {
        const jsonResponse = JSON.stringify(data);
        const blob = new Blob([jsonResponse], {type: 'application/json'});

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);

        link.download= fileName;

        URL.revokeObjectURL(link.href);
    }

    try {
        const initializeResponse = await fetch(urlInitialize, {
            method: "POST",
            headers: {
                Apikey: apiKey,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `amount=${amount}&msisdn=${phoneNumber}&account_no=${accno}`,
        });

        if (!initializeResponse.ok) {
            throw new Error("Initialization failed");
        }

        const initializeResponseBody = await initializeResponse.json();

        if (!initializeResponseBody.success) {
            throw new Error("Initialization unsuccessful");
        }

        await new Promise(resolve => setTimeout(resolve, 30000));
        // Step 2: Check transaction status
        const getStatusResponse = await fetch(`${urlGetStatus}${accno}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Apikey: apiKey,
            },
        });

        if (!getStatusResponse.ok) {
            throw new Error("Failed to retrieve transaction status");
        }

        const statusResponseBody = await getStatusResponse.json();

        const transactionData = {
            success: statusResponseBody.is_complete === 1,
            response: statusResponseBody
        }

        saveSaveResponse('response.json', transactionData);

        return transactionData;

    } catch (error: any) {
        console.error("Error:", error.message);
        const errorData =  {
            success: false,
            error: error.message,
        };

        saveSaveResponse('responseError.json', errorData);

        return errorData;
    }
};

