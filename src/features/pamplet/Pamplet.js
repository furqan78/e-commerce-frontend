import { Link } from 'react-router-dom';
import './pamplet.scss';
import '@coreui/coreui/dist/css/coreui.min.css'
import Tshirts from '../../assets/images/custom-tishirts.png';

const Pamplet = () => {
    return (
        <div className="pamplet-container">
            <div className='pamplet-left-section'>
                <h1 className='pamplet-title'>Your Signature Style Starts Here.</h1>
                <p className='pamplet-desc'>We provide the custom design clothing for any season.
                    You can choose trendy or classy design according to your preferences.</p>
                    <button
                    className="pamplet-btn rounded-md px-4 py-2 mt-5 text-sm font-semibold text-white shadow-sm">
                <Link>
                Shop Now
                </Link>
                </button>
            </div>
            <div className='pamplet-left-section'>
                <img src={Tshirts} alt='' className='' />
            </div>
        </div>
    );
}

export default Pamplet;