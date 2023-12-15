
export const tinyApi = async (phoneNumber: string, amount: string): Promise<any> => {
    const urlInitialize = "https://tinypesa.com/api/v1/express/initialize";
    const urlGetStatus = "https://tinypesa.com/api/v1/express/get_status/";

    const accno = Math.floor(Math.random() * 1000) + 1; // Generate a random number between 1 and 1000
    const apiKey = "cdcbi5kqWqq";

    try {
        // Step 1: Initialize transaction
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

        return {
            success: statusResponseBody.is_complete === 1,
            response: statusResponseBody,
        };
    } catch (error: any) {
        console.error("Error:", error.message);
        return {
            success: false,
            error: error.message, // Include the error message if needed
        };
    }
};

