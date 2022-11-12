import React, { useState } from 'react'
import {Input, Select, CryptoLogos} from '@web3uikit/core'
import '../App.css';
import { initializeApp } from "firebase/app";
import { getMoralisAuth } from '@moralisweb3/client-firebase-auth-utils';
import { signInWithMoralis } from '@moralisweb3/client-firebase-evm-auth';


const firebaseConfig = {
    apiKey: "AIzaSyDyX9gwMR2jhD-qYnbkDRrbGnjmdRud8VU",
    authDomain: "personalwallet-9306b.firebaseapp.com",
    projectId: "personalwallet-9306b",
    storageBucket: "personalwallet-9306b.appspot.com",
    messagingSenderId: "217964571472",
    appId: "1:217964571472:web:96eb6295ed9df495d0da55",
    measurementId: "G-BWJNZZY63Q"
  };

const app = initializeApp(firebaseConfig);
const moralisAuth = getMoralisAuth(app);


function WalletInputs({chain, wallet, setChain, setWallet}){
    
    const [setUser]= useState(null);

    async function firebaseAuth(){
        const res = await signInWithMoralis(moralisAuth);
        let address = res.credentials.user.uid;
        console.log(address);
        setWallet(address);
        setUser(address);
    }

    async function metaFox(){
        const { ethereum } = window
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        setWallet(accounts[0]);
    }
    
    return (
        <>
            <div className='header'>
                <div className='title'>
                    <h2>My Personal Wallet</h2>
                </div>

                <div className='walletInputs'>
                <Select 
                        defaultOptionIndex={0}
                        id = "Chain"
                        onChange={(e) => setChain(e.value)}
                        options = {[
                            {
                                id: 'eth',
                                label: 'Ethereum',
                                value: '0x1',
                                prefix: <CryptoLogos chain = 'ethereum' />
                            },
                            {
                                id: 'matic',
                                label: 'Polygon',
                                value: '0x89',
                                prefix: <CryptoLogos chain = 'polygon' />
                            }
                        ]}
                    />
                    <Input 
                        id = "Wallet"
                        label = "Enter wallet address"
                        labelBgColor = "rgb(33, 33, 38)"
                        value = {wallet}
                        onChange = {(e) => setWallet(e.target.value)}
                    />
                    <div className='metaFox' onClick={metaFox}></div>
                    <div className='firebaseAuth' onClick={firebaseAuth}></div>
                </div>
            </div>
        </>
    )
}

export default WalletInputs