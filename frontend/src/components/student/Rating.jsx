import React, { useEffect, useState } from 'react'

const Rating = ({initialRating , onRate}) => {

    const [rating,setrating] = useState( initialRating ||0);

    const handleRating = (value) => {
        setrating(value);
        if(onRate) onRate(value)
    }

    useEffect(()=>{
        if(initialRating){
            setrating(initialRating)
        }
    },[initialRating])

    return (
        <div>
            {Array.from({length:5}, (_, index)=>{
                const startValue = index + 1;
                return (
                    <span key={index} className={`text-xl sm:text-2xl cursor-pointer transition-colors ${startValue <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    onClick={() => handleRating(startValue)}>
                        &#9733;
                    </span>
                )
            })}
        </div>
    )
}


export default Rating