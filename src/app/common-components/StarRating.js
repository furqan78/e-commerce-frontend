import { StarIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';

const StarRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex justify-center items-center">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "text-yellow-400" : "text-gray-300"}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <StarIcon className='w-7 h-8' />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
