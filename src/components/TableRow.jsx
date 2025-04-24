import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { imageUrl } from "../constants/index"


function TableRow({ coin, scrolled, slno }) {
    const [updatedCoin, setUpdatedCoin] = useState(coin);

    function formatCurrency(value) {
        if (value >= 1_000_000_000) {
            return `$${(value / 1_000_000_000).toFixed(2)}B`;
        } else if (value >= 1_000_000) {
            return `$${(value / 1_000_000).toFixed(2)}M`;
        } else {
            return `$${value.toLocaleString()}`;
        }
    }

    const changeValue = (value) => {
        const randomSign = Math.random() < 0.5 ? -1 : 1;
        const randomPercentage = Math.random() * 5;
        return value + randomSign * randomPercentage;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setUpdatedCoin((prevCoin) => ({
                ...prevCoin,
                current_price: prevCoin.current_price + (Math.random() > 0.5 ? 1 : -1) * Math.random() * 200,
                price_change_percentage_1h_in_currency: changeValue(prevCoin.price_change_percentage_1h_in_currency),
                price_change_percentage_24h_in_currency: changeValue(prevCoin.price_change_percentage_24h_in_currency),
                price_change_percentage_7d_in_currency: changeValue(prevCoin.price_change_percentage_7d_in_currency),
                market_cap: prevCoin.market_cap + (Math.random() > 0.5 ? 1 : -1) * Math.random() * 1_000_000_000,
                total_volume: prevCoin.total_volume + (Math.random() > 0.5 ? 1 : -1) * Math.random() * 1_000_000,
                circulating_supply: prevCoin.circulating_supply + (Math.random() > 0.5 ? 1 : -1) * Math.random() * 50000,
            }));
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const getPercentageClass = (percentage) => {
        if (percentage > 0) return 'text-green-500';
        if (percentage < 0) return 'text-red-500';
        return 'text-gray-500';
    };

    return (
        <tr>
            <td className=" sticky  left-0 bg-white z-10">
                <Star className="w-3.5" />  
            </td>
            <td className=" sticky  bg-white left-[34px] lg:left-[50px] z-10">{slno}</td>
            <td className={` sticky left-[62px] lg:left-[100px] text-left bg-white z-10`}>
                <div className="flex items-center   gap-2">
                    <figure>
                        <img
                            src={updatedCoin.image}
                            alt="BTC"
                            className="w-6 h-6"
                        />
                    </figure>
                    <div className='flex lg:flex-row lg:items-center flex-col items-start gap-2'>
                        <span className='font-semibold text-[12px] lg:text-[14px]'>
                            {updatedCoin?.name}
                        </span>
                        <span className='font-semibold text-gray-500 text-[12px] lg:text-[14px]'>
                            {coin?.symbol.toUpperCase()}
                        </span>
                    </div>
                </div>
                <div className={`absolute top-0 right-0 h-full w-4  ${scrolled ? 'bg-gradient-to-r ' : ''} from-black/10 to-transparent pointer-events-none z-10`} />
            </td>
            <td className="td">${updatedCoin.current_price.toFixed(2)}</td>
            <td className={`td ${getPercentageClass(updatedCoin.price_change_percentage_1h_in_currency)}`}>
                {updatedCoin.price_change_percentage_1h_in_currency.toFixed(2)}%
            </td>
            <td className={`td ${getPercentageClass(updatedCoin.price_change_percentage_24h_in_currency)}`}>
                {updatedCoin.price_change_percentage_24h_in_currency.toFixed(2)}%
            </td>
            <td className={`td ${getPercentageClass(updatedCoin.price_change_percentage_7d_in_currency)}`}>
                {updatedCoin.price_change_percentage_7d_in_currency.toFixed(2)}%
            </td>
            <td className="td">${updatedCoin.market_cap.toLocaleString()}</td>
            <td className="td">${updatedCoin.total_volume.toLocaleString()}</td>
            <td className="td">{formatCurrency(updatedCoin.circulating_supply)}<span className='font-semibold text-gray-500'>
                &nbsp; {coin?.symbol.toUpperCase()}
            </span></td>
            <td className="td text-end flex justify-end"><figure><img src={imageUrl[slno - 1]} /></figure></td>
        </tr>
    );
}

export default TableRow;
