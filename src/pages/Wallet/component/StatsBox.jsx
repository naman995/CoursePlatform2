import React from 'react'

const StatsBox = ({ color, symbol, stats, subheading }) => {
    return (
        <div className={` ${color} mr-10 h-[90px] flex flex-col items-center justify-center mt-5 w-full lg:mt-0 lg:w-1/5 text-white rounded-[20px]` }>
            <h1 className='  text-2xl'>{symbol} {stats}</h1>
            <p className=' '>{subheading}</p>
        </div>
    )
}

export default StatsBox