import * as bitcoin from 'bitcoinjs-lib'
// @ts-ignore
import bs58check from "bs58check";
import {BTC} from "../BTC";
import {bitcoin as bitcoinNetwork, litecoin} from "../BTC_FORK/networks";

export class LTC extends BTC {
    constructor() {
        super();
        this.network = litecoin;
    }

    public isAddressValid(address: string): boolean {
     try {
         bs58check.decode(address);
         return true
     }catch (e) {
         return false;
     }
    }

    public convertAddress(address: string): string {
        const {version, hash} = bitcoin.address.fromBase58Check(address);
        switch (version) {
            case bitcoinNetwork.scriptHash:
                return bitcoin.address.toBase58Check(hash,litecoin.scriptHash);
            case bitcoinNetwork.pubKeyHash:
                return bitcoin.address.toBase58Check(hash,litecoin.pubKeyHash);
            case litecoin.scriptHash:
                return bitcoin.address.toBase58Check(hash,bitcoinNetwork.scriptHash);
            case litecoin.pubKeyHash:
                return bitcoin.address.toBase58Check(hash,bitcoinNetwork.pubKeyHash);
            default:
                return address;
        }
    }
}