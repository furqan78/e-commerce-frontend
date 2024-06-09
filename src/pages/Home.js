import Navbar from "../features/navbar/Navbar";
import BannerSlider from "../features/pamplet/BannerSlider";
import '../../src/style.scss';
import ProductsListSlider from "../features/products/components/ProductListSlider";
import { appLevelConstant, productsClassification } from "../app/constant";
import ProductCategorie from "../app/common-components/ProductCategorie";
import BestDesigns from "../features/products/components/BestDesigns";

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
          <BestDesigns heading={appLevelConstant.DESIGNS_FOR_YOU_LABLE}/>
        </div>
        {productsClassification.map((ele, index) => (
          <div className="my-3">
          <BestDesigns heading={ele.lable}/>
        </div>
        ))}
      </Navbar>
    </div>
  )
}
