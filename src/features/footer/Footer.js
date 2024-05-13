import './footer.scss';

const Footer = () => {
return(
    <div className='footer-container'>
        <div className='footer-subcontainer'>
        <div>
            <h2 className='text-sm text-white font-bold mb-3'>COMPANY INFO</h2>
            <p className='mb-2 list-lable'>About Ali Studio</p>
        </div>
        <div>
            <h2 className='text-sm text-white font-bold mb-3'>HELP & SUPPORT</h2>
            <p className='mb-2 list-lable'>Shipping Info</p>
            <p className='mb-2 list-lable'>Returns</p>
            <p className='mb-2 list-lable'>How to Order</p>
            <p className='mb-2 list-lable'>How to Track</p>
        </div>
        <div>
            <h2 className='text-sm text-white font-bold mb-3'>CUSTOMER CARE</h2>
            <p className='mb-2 list-lable'>Contact Us</p>
            <p className='mb-2 list-lable'>Payment</p>
        </div>
        <div>
            <h2 className='text-sm text-white font-bold mb-3'>SOCIALS</h2>
            <p className='mb-2 list-lable'>Instagram</p>
        </div>
        </div>

    </div>
)
}

export default Footer;