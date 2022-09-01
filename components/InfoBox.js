function InfoBox( { Name, Value } ) {
    return (
        <div className=" bg-black flex flex-col justify-center items-center rounded-md w-24 h-20">
        <h3 className=' text-sm text-white font-bold sm:text-[10px] text-center'>
          {Name}
        </h3>
        <h3 className=' text-sm text-white font-bold sm:text-[10px] text-center'>
         {Value}
        </h3>
        </div>
    );
}

export default InfoBox;