
import {StkPushResponse} from "../model/StkPushResponse";

/**
 * a class for requesting stk push.
 * @author kamar baraka
 */

export class StkPushRequest {

    private readonly amount: number;
    private readonly msisdn: string;
    private readonly account_no: number;
    private readonly api_key: string;

    /**
     * Constructor for creating a new instance of the class.
     *
     * @param {number} amount - The amount associated with the transaction.
     * @param {string} msisdn - The mobile phone number associated with the transaction.
     * @param {number} account_no - The account number associated with the transaction.
     * @param {string} api_key - The API key used for authentication.
     */
    constructor(amount: number, msisdn: string, account_no: number, api_key: string) {
        this.amount = amount;
        this.msisdn = msisdn;
        this.account_no = account_no;
        this.api_key = api_key;
    }


    /**
     * Sends a POST request to the specified URL to initialize a stk push transaction.
     *
     * @async
     * @returns {boolean} - Returns true if the transaction was successfully initialized, false otherwise.
     */
    async pushStk() {

        /*the url*/
        const url = "https://tinypesa.com/api/v1/express/initialize";

        /*compose the body*/
        const data = {
            amount: this.amount,
            msisdn: this.msisdn,
            account_no: this.account_no,
        };

        /*compose the header*/
        const headers = new Headers();
        headers.append("Apikey", `${this.api_key}`);
        headers.append("Content-Type", "application/json");

        try {
            const response: Response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data),
            });

            if (response.ok ) {

                /*map the response to a boolean*/
                const stkPushResponse:StkPushResponse = await response.json();
                return stkPushResponse.success;

            }
        } catch (error: any) {
            console.log('There was a problem with the fetch operation: ' + error.message);
            return false;
        }
    }
}