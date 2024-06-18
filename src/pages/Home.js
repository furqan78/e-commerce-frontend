import Navbar from "../features/navbar/Navbar";
import BannerSlider from "../features/pamplet/BannerSlider";
import '../../src/style.scss';
import ProductsListSlider from "../features/products/components/ProductListSlider";
import { appLevelConstant, productsClassification } from "../app/constant";
import ProductCategorie from "../app/common-components/ProductCategorie";
import ProductCarousel from "../features/products/components/ProductCarousel";
import ProductSmallGrid from "../features/products/components/ProductSmallGrid";
import Banner from "../app/common-components/Banner";

export default function Home() {
  return (
    <div>
      <Navbar>
        <div className="my-2">
        <ProductCategorie />
        </div>
        <div className="my-3">
        <BannerSlider />
        </div>
        <div className="my-3">
          <ProductCarousel 
          heading={appLevelConstant.BEST_PRODUCT_FOR_YOU_LABLE}
          requestObject={{
            page: 1,
            ratings: 3,
            sort: "rating:desc",
            categories: "t-shirts,caps"
           }}
          />
        </div>
        <div className="my-3">
          <ProductCarousel 
          heading={appLevelConstant.TSHIRTS_CAPS_MUG_AND_MORE_LABLE}
          requestObject={{
            page: 1,
            categories: "t-shirts,caps"
           }}
          />
        </div>

        <div className="my-3 flex gap-5">
          <div className="width-30-percent">
          <ProductSmallGrid heading={appLevelConstant.CUSTOMIZE_PILLOW_LABLE} 
           requestObject={{
            page: 1,
            categories: "key-chain,pillow"
           }}/>
           </div>
           <div className="width-69-percent">
           <Banner position="homepage-bottom" />
           </div>
        </div>
        <div className="my-3">
          <ProductCarousel 
          heading={appLevelConstant.BUSINES_CARDS_FOR_YOU_LABLE}
          requestObject={{
            page: 1,
            categories: "t-shirts"
           }}
          />
        </div>
        <div className="my-3">
          <ProductCarousel 
          heading={appLevelConstant.GRAB_YOUR_FAVOURITE_COFFE_MUG_LABLE}
          requestObject={{
            page: 1,
            categories: "t-shirts"
           }}
          />
        </div>
      </Navbar>
    </div>
  )
}
