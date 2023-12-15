import {PaymentRequestService} from "./PaymentRequestService";
import {StkPushRequest} from "../proxy/StkPushRequest";
import {TransactionStatusRequest} from "../proxy/TransactionStatusRequest";
import {StkPushResponse} from "../model/StkPushResponse";

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


        alert("enter");
        /*send stk push*/
        const stkPushRequest = new StkPushRequest(amount, msisdn, account_no, api_key);
        const transactionStatusRequest = new TransactionStatusRequest(account_no, api_key);

        // setting pushStk with timeout of 5 minutes
        alert("here we go!")
        const stkPushResponse: StkPushResponse = await stkPushRequest.pushStk().then((response: Response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert("oops!");
            }
        }).then((response: StkPushResponse) => response);

        if (stkPushResponse.success) {

            alert("success exit!")
            return await transactionStatusRequest.isComplete();
        }
        alert("failed exit!")
        return false;
    }
}