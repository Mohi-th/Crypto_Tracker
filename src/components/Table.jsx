import React, { useEffect, useRef, useState } from 'react';
import "./Table.css"
import { getData } from '../store/cryptoSlice';
import { useDispatch, useSelector } from 'react-redux';
import TableRow from './TableRow';


function Table() {

    const dispatch = useDispatch();
    const { data } = useSelector(state => state.crypto)

    const scrollRef = useRef(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (scrollRef.current) {
                setScrolled(scrollRef.current.scrollLeft > 0);
            }
        };

        const scrollEl = scrollRef.current;
        if (scrollEl) {
            scrollEl.addEventListener('scroll', handleScroll);
            handleScroll();
        }

        return () => {
            if (scrollEl) scrollEl.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        dispatch(getData())
    }, [])

    return (
        <div className="overflow-x-auto" ref={scrollRef}>
            <table className="w-full px-10 min-w-max table-auto text-sm text-left border-none rounded-lg">
                <colgroup>
                    <col className="lg:w-[50px] " />
                    <col className="lg:w-[50px] w-[28px] min-w-auto max-w-auto" />
                    <col className="lg:w-[250px] w-[200px] min-w-auto max-w-auto" />
                    <col className="w-auto" />
                    <col className="w-[84px] min-w-auto max-w-auto" />
                    <col className="w-[84px] min-w-auto max-w-auto" />
                    <col className="w-[84px] min-w-auto max-w-auto" />
                    <col className="w-[200px] min-w-auto max-w-auto" />
                    <col className="w-[200px] min-w-auto max-w-auto" />
                    <col className="w-[200px] min-w-auto max-w-auto" />
                    <col className="w-auto" />
                </colgroup>

                <thead className="text-gray-700 text-[12px] font-semibold">
                    <tr className='px-5'>
                        <th className="sticky left-0 bg-white z-20"></th>
                        <th className='px-[10px] py-[11px] sticky left-[34px] lg:left-[50px]  bg-white z-20'>#</th>
                        <th className={`px-[10px] py-[11px] text-start sticky left-[62px] lg:left-[100px] bg-white z-20`}>
                            Name
                            <div className={`absolute top-0 right-0 h-full w-4  ${scrolled ? 'bg-gradient-to-r ' : ''} from-black/10 to-transparent pointer-events-none z-10`} />
                        </th>
                        <th className="th">Price</th>
                        <th className="th">1h %</th>
                        <th className="th">24h %</th>
                        <th className="th">7d %</th>
                        <th className="th">Market Cap</th>
                        <th className="th">Volume(24h)</th>
                        <th className="th">Circulating Supply</th>
                        <th className="th">Last 7 Days</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {
                        data?.length > 0 ? data.map((item, index) => <TableRow key={index} coin={item} scrolled={scrolled} slno={index + 1} />) : null
                    }
                </tbody>

            </table>
        </div>
    );
}

export default Table;