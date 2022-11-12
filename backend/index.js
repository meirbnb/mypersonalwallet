const express = require('express')
const app = express()
const cors = require('cors')
const Moralis = require('moralis').default;
const port = 8080
require('dotenv').config()

app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.get('/nativebalance', async (req, res) => {

    await Moralis.start({
        apiKey: process.env.MORALIS_API_KEY
    });

    try {
        const {
            address,
            chain
        } = req.query;
        const response = await Moralis.EvmApi.balance.getNativeBalance({
            address: address,
            chain: chain
        });
        const nativebalance = response.data;

        let nativeCurrency;

        if (chain === "0x1")
            nativeCurrency = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
        else if (chain === "0x89")
            nativeCurrency = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270";

        const nativePrice = await Moralis.EvmApi.token.getTokenPrice({
            address: nativeCurrency,
            chain: chain
        });

		nativebalance.usd = nativePrice.data.usdPrice;

        res.send(nativebalance);
    } catch (e) {
        res.send(e);
    }
})

app.get('/tokenBalances', async (req, res) => {

    await Moralis.start({
        apiKey: process.env.MORALIS_API_KEY
    });

    try {
        const {
            address,
            chain
        } = req.query;
        const response = await Moralis.EvmApi.token.getWalletTokenBalances({
            address: address,
            chain: chain
        });

        let tokens = response.data;

        let legitTokens = []

        for (let token of tokens){
            const current = await Moralis.EvmApi.token.getTokenPrice({
                address: token.address,
                chain: chain
            });
            if (current.data.usdPrice > .01){
                token.usd = current.data.usdPrice;
                legitTokens.push(token);
            } else {
                console.log('scam coin');
            }
        }

        res.send(legitTokens);

    } catch (e) {
        res.send(e);
    }
})

app.get('/tokenTransfers', async (req, res) => {

    await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

    try {
        const { address, chain } = req.query;

        const response = await Moralis.EvmApi.token.getWalletTokenTransfers({
            address: address,
            chain: chain
        });

        const userTransfers = response.data.result;
        const userTransferDetails = []

        for (let userTransfer of userTransfers){
            const currentResponse = await Moralis.EvmApi.token.getTokenMetadata({
                addresses: userTransfer.address,
                chain: chain
            }); 

            if (currentResponse.data){
                userTransfer.decimals = currentResponse.data[0].decimals;
                userTransfer.symbol = currentResponse.data[0].symbol;
                userTransferDetails.push(userTransfer);
            }
        }

        res.send(userTransferDetails);
    } catch (e) {
        res.send(e);
    }
})

app.get('/nftBalance', async (req, res) => {

    await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

    try {
        const { address, chain } = req.query;

        const response = await Moralis.EvmApi.nft.getWalletNFTs({
            address: address,
            chain: chain
        });

        res.send(response.data);
    } catch (e) {
        res.send(e);
    }
})