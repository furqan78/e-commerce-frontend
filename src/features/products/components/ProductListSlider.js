import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllProductsAsync, selectAllProducts } from "../productSlice";
import '../../../style.scss';
import './product.scss';
import { useEffect, useRef, useState } from "react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const ProductListSlider = ({ categorie }) => {
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);
    const [page, setPage] = useState(1);
    const [arrowDisable, setArrowDisable] = useState(true);
    const elementRef = useRef(null);

    const handleHorizantalScroll = (element, speed, distance, step) => {
        let scrollAmount = 0;
        const slideTimer = setInterval(() => {
            element.scrollLeft += step;
            scrollAmount += Math.abs(step);
            if (scrollAmount >= distance) {
                clearInterval(slideTimer);
            }
            if (element.scrollLeft === 0) {
                setArrowDisable(true);
            } else {
                setArrowDisable(false);
            }
        }, speed);
    };

    useEffect(() => {
        const pagination = { page: page };
        dispatch(fetchAllProductsAsync(pagination));
    }, []);

    return (
        <div className="bg-white mx-14">
            <div className="scroll-list-container">
                <button className="left-scroll-indicator-btn" style={{backgroundColor: arrowDisable ? "transparent" : "white" }} 
                    onClick={() => {
                        handleHorizantalScroll(elementRef.current, 2, 1000, -10);
                    }}
                    disabled={arrowDisable}
                >
                    <ChevronLeftIcon className="w-5 h-5 text-gray-900" />
                </button>
                <button className="right-scroll-indicator-btn"
                    onClick={() => {
                        handleHorizantalScroll(elementRef.current, 2, 1000, 10);
                    }}
                >
                    <ChevronRightIcon className="w-5 h-5 text-gray-900" />
                </button>
                <div className="mt-6 product-list-container" ref={elementRef}>
                    {products && products.data ? products.data.map((product) => (
                        <Link reloadDocument key={product.id} to={`/product-detail/${product.id}`}>
                            <div className="group relative product-card">
                                <div className="aspect-h-1 aspect-w-1 w-full bg-gray-200 group-hover:opacity-75 xl:aspect-h-8 xl:aspect-w-7">
                                    <img
                                        src={product.thumbnail}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full" alt=""
                                    />
                                </div>
                                <div className="mt-4 flex gap-3">
                                    <div>
                                        <h3 className="text-l text-black font-semibold">
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {product.title}
                                        </h3>

                                    </div>
                                    <div>
                                        <ArrowLongRightIcon className='w-6 h-6'></ArrowLongRightIcon>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )) : ''}
                </div>
            </div>
        </div>
    );
}

export default ProductListSlider;