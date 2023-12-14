export interface TransactionStatusResponse{

    id: string;
    amount: number;
    msisdn: string;
    sync_count: number;
    is_complete: boolean;
    sync_status: string;
    link_id: string;
    created_at: string;
    supporter_id: string;
    external_reference: string;
    mpesa_receipt: string;
}