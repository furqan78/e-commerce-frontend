import "./order-skeleton.scss";

export default function OrderSkeletonLoader({count}) {
    return <>
    { Array(count).fill().map((_, index) => 
    <li className="flex py-6 user-order-card" key={index}>
        <div className="h-20 w-20 flex-shrink-0 overflow-hidden">
            <div className="skeleton skeleton-img"></div>
        </div>
        <div className="ml-4 flex flex-1 flex-col">
            <div>
                <div className="flex justify-between text-base gap-8">
                        <div className='skeleton skeleton-text'></div>
                        <div className='skeleton skeleton-text'></div>
                        <div className='skeleton skeleton-text'></div>
                </div>
                <div className="flex justify-between text-base gap-8">
                        <div className='skeleton skeleton-text'></div>
                        <div className='skeleton skeleton-text'></div>
                        <div className='skeleton skeleton-text'></div>
                </div>
            </div>
        </div>
    </li>)}
    </>
}