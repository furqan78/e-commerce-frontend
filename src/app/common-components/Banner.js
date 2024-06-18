import React, { useEffect, useState } from 'react'
import { createCancelToken } from '../constants/common-function';
import { getBanners } from '../../features/products/productAPI';
import { Link } from 'react-router-dom';

function Banner({position}) {

    const [banner, setBanner] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const cancelTokenSource = createCancelToken();

        if (isMounted) {
            const getProducts = async () => {
                try {
                    const data = await getBanners(position);
                    setBanner(data);
                } catch (err) {
                    if (err.message !== 'Request canceled' && isMounted) {
                    }
                }
            }

            getProducts();
        }
        return () => {
            isMounted = false;
            cancelTokenSource.cancel("Requests Canceled.")
        }

    }, []); 

  return (
    <Link to={banner[0]?.link}>
        <img className='w-full h-full' src={banner[0]?.imageUrl} alt={banner[0]?.alt} />
        </Link>
  )
}

export default Banner