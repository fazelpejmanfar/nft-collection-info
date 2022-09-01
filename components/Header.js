import Link from 'next/link';
import { useState } from 'react'


function Header() {

    const [Address, setAddress] = useState();

const Styles = {
    Header: 'w-full h-20 bg-[#31087B] p-5 flex justify-between items-center sm:flex-col sm:h-28 sm:justify-center',
    Input: 'w-full p-3 rounded-sm text-black font-bold focus:outline-none',
    Wrapper: ' w-[500px] sm:w-10/12 flex',
    Button: ' bg-[#100720] w-24 rounded-sm hover:bg-slate-600 text-white flex justify-center items-center',
    H1: 'text-2xl text-white font-mono font-bold text-center sm:text-xl'
}


    return (
        <div className={Styles.Header}>
        <div>
        <h1 className={Styles.H1}>
            NFT-Info
        </h1>
        </div>

        <div className={Styles.Wrapper}>
            <input type='text' placeholder='Contact Address' className={Styles.Input} onChange={(e) => {
                e.preventDefault();
                setAddress(e.target.value);
            }}/>
            <Link href={`/${Address}`} passHref>
            <a className={Styles.Button}>
            Check
            </a>
            </Link>
        </div>

        </div>
    );
}

export default Header;