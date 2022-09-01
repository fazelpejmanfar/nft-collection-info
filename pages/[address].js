import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import InfoBox from '../components/InfoBox';
function Contract() {
    const router = useRouter();
    const { address } = router.query;
    const [Stats, setStats] = useState();
    const [INFO, setINFO] = useState();
    const [SLUG, setSLUG] = useState();

  const GetData = () => {
    const OPT = {
        headers: {
            accept: 'application/json',
       }
    };
    fetch(`https://api.opensea.io/api/v1/asset_contract/${address}`)
    .then(response => response.json())
    .then(data => {
        console.log("Contract", data);
        setINFO(data);
        setSLUG(data.collection.slug);
        setTimeout(() => {
            fetch(`https://api.opensea.io/api/v1/collection/${data.collection.slug}/stats`, OPT)
            .then(response => response.json())
            .then(data => {
                console.log("Stats", data.stats);
                setStats(data.stats);
            });
        }, 2500);
    });
  };

  useEffect(() => {
        GetData();
  }, [address]);




  const Styles = {
    Container: ' p-5 w-3/4 flex flex-col justify-start items-center bg-[#31087B] drop-shadow-xl min-h-[600px] rounded-lg lg:w-[95%] lg:mt-5 sm:pl-[5px] sm:pr-[5px]',
    IconWrapper: 'flex w-full p-3 justify-around items-center  border-b-2',
    Icons: 'hover:text-red-400 hover:-translate-y-2 hover:transition-all',
    InfoWrapper: ' sm:flex-col sm:gap-3 flex flex-row justify-evenly items-center w-full min-h-[300px] p-3',
    IMGWrapper: ' flex flex-col justify-between items-center h-full w-fit',
    DescWrapper: ' flex flex-col justify-center gap-4 items-start h-full w-full pl-5 pr-3 sm:items-center sm:p-0',
    BoxWrapper: 'sm:gap-3 flex flex-row justify-evenly items-center w-full pt-10',
    BoxGrid: 'lg:grid-cols-3 lg:grid lg:justify-items-center flex flex-row justify-center gap-4 items-center h-full w-full pl-3 pr-3'
  };

    return (
        <div className={Styles.Container}>

        {Stats !== undefined ? (
         <div className={Styles.IconWrapper}>
        <a className={Styles.Icons} href={`https://etherscan.io/address/${address}`} target={'_blank'} rel='noreferrer'>
        <div className='w-[35px] h-[35px]'>
        <Image className=' rounded-xl' src={'/eth.png'} alt='etherscan' width={35} height={35} layout={'responsive'}/>
        </div>
        </a>

        <a className={Styles.Icons} href={`https://opensea.io/collection/${INFO?.collection.slug}`} target={'_blank'} rel='noreferrer'>
        <div className='w-[35px] h-[35px]'>
        <Image className=' rounded-xl' src={'/os.png'} alt='opensea' width={35} height={35} layout={'responsive'}/>
        </div>
        </a>

        <a className={Styles.Icons} href={INFO?.external_link} target={'_blank'} rel='noreferrer'>
        <div className='w-[35px] h-[35px]'>
        <Image className=' rounded-xl' src={'/website.png'} alt='website' width={35} height={35} layout={'responsive'}/>
        </div>
        </a>

        <a className={Styles.Icons} href={`https://twitter.com/${INFO?.collection.twitter_username}`} target={'_blank'} rel='noreferrer'>
        <div className='w-[35px] h-[35px]'>
        <Image className=' rounded-xl' src={'/twitter.png'} alt='twitter' width={35} height={35} layout={'responsive'}/>
        </div>
        </a>

        <a className={Styles.Icons} href={INFO?.collection.discord_url} target={'_blank'} rel='noreferrer'>
        <div className='w-[35px] h-[35px]'>
        <Image className=' rounded-xl' src={'/discord.png'} alt='discord' width={35} height={35} layout={'responsive'}/>
        </div>
        </a>


        </div>
        ) : (
            <></>
        )}

        {Stats !== undefined ? (
            <>
            <div className={Styles.InfoWrapper}>
        <div className={Styles.IMGWrapper}>
        <div className='w-[250px] h-[250px]'>
        <Image className=' rounded-xl' src={INFO?.image_url} alt='PFP' width={250} height={250} layout={'responsive'}/>
        </div>


        <h3 className=' pt-2 text-xl text-white font-bold text-center sm:text-md'>
            {INFO?.name} ({INFO?.symbol})
        </h3>
        </div>

        <div className={Styles.DescWrapper}>
        <h3 className=' text-md text-white font-bold sm:text-[12px] text-left sm:text-center'>
            {INFO?.collection.description}
        </h3>
        <h3 className=' text-sm text-[#7fffd4] font-bold sm:text-[10px] text-center'>
          Royalties:  {INFO?.collection.dev_seller_fee_basis_points / 100}%
        </h3>
        <h3 className=' text-sm text-[#7fffd4] font-bold sm:text-[10px] text-center'>
          Royalty Address: 
          <a className=' text-white hover:text-yellow-300' target={'_blank'} rel='noreferrer' href={`https://etherscan.io/address/${INFO?.collection.payout_address}`}> {INFO?.collection.payout_address} </a>
        </h3>
        </div>
        </div>

        <div className={Styles.BoxWrapper}>
        <div className={Styles.BoxGrid}>
        <InfoBox Name={'Total NFTs'} Value={Stats?.count}/>
        <InfoBox Name={'Total Owners'} Value={Stats?.num_owners}/>
        <InfoBox Name={'Total Sales'} Value={Stats?.total_sales}/>
        <InfoBox Name={'Total Volume'} Value={String(Stats?.total_volume).substring(0,5)}/>
        <InfoBox Name={'Floor Price'} Value={Stats?.floor_price}/>
        <InfoBox Name={'Average Price'} Value={String(Stats?.average_price).substring(0,5)}/>
        <InfoBox Name={'1D Volume'} Value={String(Stats?.one_day_volume).substring(0,5)}/>
        <InfoBox Name={'7D Volume'} Value={String(Stats?.seven_day_volume).substring(0,5)}/>
        <InfoBox Name={'30D Volume'} Value={String(Stats?.thirty_day_volume).substring(0,5)}/>
        </div>
        </div>
           </>
        ) : (
            <>
            <h3 className=' text-lg text-[#7fffd4] font-bold sm:text-[10px] text-center'>
            Loading...
        </h3>
            </>
        )}




        </div>
    );
}

export default Contract;