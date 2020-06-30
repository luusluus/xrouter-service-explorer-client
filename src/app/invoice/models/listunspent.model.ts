export interface ListUnspent{
    txid:string;
    vout:number;
    address:string;
    amount:number;
    spendable:boolean;
    confirmations:number;
}