import React from "react";
import {useState, useEffect} from 'react'
import '../App.css'

function PortfolioValue({nativeValue, tokens}){
    const [totalValue, setTotalValue] = useState(0);

    useEffect(() => {
        let su = 0;

        for (let token of tokens)
            su += Number(token.val);

        su += Number(nativeValue);
        setTotalValue(su.toFixed(2));

    }, [nativeValue, tokens]);

    return (
        <>
            <div className="totalValue">
                <h3>Portfolio Total Value</h3>
                <h2>
                    ${totalValue}
                </h2>
            </div>
        </>
    );
}

export default PortfolioValue