import React from "react";
import axios from "axios";
import {useState, useEffect} from 'react';
import { Input } from '@web3uikit/core'
import { Reload } from '@web3uikit/icons'

function Nfts({chain, wallet, nfts, setNfts, filteredNfts, setFilteredNfts}){

    const [nameFilter, setNameFilter] = useState('');
    const [idFilter, setIdFilter] = useState('');

    useEffect(() => {
        
        if (idFilter.length === 0 && nameFilter.length === 0)
            return setFilteredNfts(nfts);
        
        let filtered = [];

        for (let nft of nfts){

            if (nft.name.includes(nameFilter) && !idFilter.length)
                filtered.push(nft);

            else if (nameFilter.length === 0 && nft.token_id.includes(idFilter))
                filtered.push(nft);

            else
                filtered.push(nft);
            
        }

        setFilteredNfts(filtered); 

    }, [nameFilter, idFilter]);

    async function getUserNfts(){
        const response = await axios.get('http://localhost:8080/nftBalance', {
            params: {
                address: wallet,
                chain: chain
            }
        });

        if (response.data.result)
            nftProcessing(response.data.result)
    }

    function nftProcessing(nfts){
        for (let i = 0; i < nfts.length; i++){
            let metadata = JSON.parse(nfts[i].metadata);

            if (metadata && metadata.image){
                if (metadata.image.includes('.'))
                    nfts[i].image = metadata.image
                else
                    nfts[i].image = 'https://ipfs.moralis.io:2053/ipfs/' + metadata.image;
            }
        }

        setNfts(nfts);
        setFilteredNfts(nfts);
    }

    return (
        <>
            <div className='tabHeading'>NFT Portfolio <Reload onClick={getUserNfts} /></div>

            <div className="filters">
                <Input 
                    id = "NameF"
                    label = "Name Filter"
                    labelBgColor = "rgb(33, 33, 38)"
                    value = {nameFilter}
                    style = {{}}
                    onChange = {(e) => setNameFilter(e.target.value)}
                />

                <Input 
                    id = "IdF"
                    label = "Id Filter"
                    labelBgColor = "rgb(33, 33, 38)"
                    value = {idFilter}
                    style = {{}}
                    onChange = {(e) => setIdFilter(e.target.value)}
                />
            </div>
            <div className="nftList">
                    {filteredNfts.length > 0 &&

                        filteredNfts.map((e) => {
                            return (
                                <>
                                <div className="nftInfo">
                                {e.image && <img src={e.image} width={200} alt="" />}
                                
                                <div>Name: {e.name}, </div>
                                <div>(ID: {e.token_id.slice(0,5)})</div>
                                </div>
                                </>
                            );
                        })
                    }
            </div>
        </>
    );
}

export default Nfts