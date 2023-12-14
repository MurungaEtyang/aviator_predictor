import {PaymentRequestService} from "./PaymentRequestService";
import {StkPushRequest} from "../proxy/StkPushRequest";
import {TransactionStatusRequest} from "../proxy/TransactionStatusRequest";

/**
 * the payment request service.
 * @author kamar baraka*/

export class PaymentRequestServiceImpl implements PaymentRequestService{

    /**
     * Requests a payment using the given parameters.
     *
     * @param {number} amount - The amount of the payment.
     * @param {string} msisdn - The mobile phone number associated with the payment.
     * @param {number} account_no - The account number for the payment.
     * @param {string} api_key - The API key for authentication.
     *
     * @returns {Promise<boolean>} - A Promise that resolves to true if the payment is successful, otherwise false.
     */
    async requestPayment(amount: number, msisdn: string, account_no: number, api_key: string): Promise<boolean> {

        /*send stk push*/
        const stkPushReq = new StkPushRequest(amount, msisdn, account_no, api_key);

        // setting pushStk with timeout of 5 minutes
        setTimeout(async () => {
                await stkPushReq.pushStk()
            }
        , 300000);

       /*confirm the payment*/
        const txnStatusReq = new TransactionStatusRequest(account_no, api_key);
        return await txnStatusReq.isComplete();
    }
}