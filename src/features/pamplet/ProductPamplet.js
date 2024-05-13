import './pamplet.scss';

const ProductPamplet = ({title, description, imageSrc}) => {
    return(
        <div className="visiting-card-pamplet-container">
        <div className='pamplet-left-section'>
            <h1 className='visiting-card-pamplet-title'>{title}</h1>
            <p className='pamplet-desc text-white'>{description}</p>
        </div>
        <div className='pamplet-left-section'>
            <img src={imageSrc} alt='' className='' />
        </div>
    </div>
    )
}

export default ProductPamplet;