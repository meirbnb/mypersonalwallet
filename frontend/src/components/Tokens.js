import axios from "axios";
import React from "react";
import { Table } from '@web3uikit/core'
import { Reload } from '@web3uikit/icons'


function Tokens({wallet, chain, tokens, setTokens}){

    async function getTokenBalances(){
        const response = await axios.get('http://localhost:8080/tokenBalances', {
            params: {
                address: wallet,
                chain: chain
            }
        });

        if (response.data){
            let infos = response.data;

            for (let i=0; i<infos.length; i++){
                infos[i].bal = (Number(infos[i].balance) / Number(`1E${infos[i].decimals}`)).toFixed(3);
                infos[i].val = ((Number(infos[i].balance) / Number(`1E${infos[i].decimals}`)) * Number(infos[i].usd)).toFixed(2);
            }

            setTokens(infos);
        }
    }

    return (
        <>
            <div className='tabHeading'>ERC Tokens <Reload onClick={getTokenBalances} /></div>
            {tokens.length > 0 &&
            <Table 
                pageSize = {1}
                noPagination = {true}
                style = {{width: '900px'}}
                columnsConfig = "300px 300px 250px"
                data = {tokens.map((e) => [e.symbol, e.bal, `$${e.val}`])}
                header = {[
                    <span>Currency</span>,
                    <span>Balance</span>,
                    <span>Value</span>
                ]}
            />
            } 
        </>
    )
}

export default Tokens