import { useRef, useState } from 'react';
import '../../../style.scss';
import './product.scss';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const ProductListSlider = ({children }) => {

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

    return (
        <div>
                <div className="bg-white">
                    <div className="scroll-list-container">
                        { !arrowDisable ? <button className="left-scroll-indicator-btn shadow-md rounded-tr-sm rounded-br-sm"
                            onClick={() => {
                                handleHorizantalScroll(elementRef.current, 2, 1000, -10);
                            }}
                            disabled={arrowDisable}
                        >
                            <ChevronLeftIcon className="w-4 h-4 text-gray-500" />
                        </button> : null}
                        <button className="right-scroll-indicator-btn shadow-md rounded-tl-sm rounded-bl-sm"
                            onClick={() => {
                                handleHorizantalScroll(elementRef.current, 2, 1000, 10);
                            }}
                        >
                            <ChevronRightIcon className="w-4 h-4 text-gray-500" />
                        </button>
                        <div className="product-list-container p-5" ref={elementRef}>
                            {children}
                        </div>
                    </div>
                </div>
        </div>

    );
}

export default ProductListSlider;