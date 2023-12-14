import {TransactionStatusResponse} from '../model/TransactionStatusResponse';


/**
 * a class to check the transaction status.
 * @author kamar baraka.*/

export class TransactionStatusRequest {

    private readonly account_no: number;
    private readonly api_key: string;


    /**
     * Create a new instance of the class.
     * @param {number} account_no - The account number for the API.
     * @param {string} api_key - The API key for authentication.
     * @constructor
     */
    constructor(account_no: number, api_key: string) {
        this.account_no = account_no;
        this.api_key = api_key;
    }

    /**
     * Gets the status of a transaction.
     *
     * @returns {Promise<TransactionStatusResponse | null>} A promise that resolves to a TransactionStatusResponse
     *          object if the request is successful, or null if an error occurs.
     */
    async getTransactionStatus(): Promise<TransactionStatusResponse | null> {
        const url: string = `https://tinypesa.com/api/v1/express/get_status/${this.account_no}`;
        const headers: Headers = new Headers();
        headers.append("Apikey", `${this.api_key}`);

        try {
            const response = await fetch(url, { headers });

            if (response.status === 200) {
                return await response.json();

            }
        } catch (error) {
            console.error(error);
            return null;
        }

        return null;
    }

    /**
     * Checks if the transaction is complete.
     *
     * @returns {Promise<boolean>} A promise that resolves to a boolean value indicating whether the transaction is complete.
     */
    async isComplete(): Promise<boolean> {

        const transactionStatus: TransactionStatusResponse| null = await this.getTransactionStatus();
        return transactionStatus !== null? transactionStatus.is_complete: false;
    }
}