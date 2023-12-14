export interface PaymentRequestService {

    requestPayment(amount: number, msisdn: string, account_no: number, api_key: string): Promise<boolean>;
}