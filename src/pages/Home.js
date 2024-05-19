import Navbar from "../features/navbar/Navbar";
import Pamplet from "../features/pamplet/Pamplet";
import '../../src/style.scss';
import ProductsListSlider from "../features/products/components/ProductListSlider";
import { appLevelConstant, productsClassification } from "../app/constant";

export default function Home() {
  return (
    <div className="bg-white">
      <Navbar>
        <Pamplet></Pamplet>
        <div className="mt-14">
          <h1 className="product-categorie-heading mx-14">{appLevelConstant.DESIGNS_FOR_YOU_LABLE}</h1>
          {/* <hr className="heading-under-line"></hr> */}
          <ProductsListSlider categorie={appLevelConstant.DESIGNS_FOR_YOU_LABLE}></ProductsListSlider>
        </div>
        {productsClassification.map((ele, index) => (
          <div key={index} className="mt-14">
            <h1 className="product-categorie-heading mx-14">{ele.lable}</h1>
            <ProductsListSlider categorie={ele.value}></ProductsListSlider>
          </div>
        ))}
      </Navbar>
    </div>
  )
}
