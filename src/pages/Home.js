import Navbar from "../features/navbar/Navbar";
import Pamplet from "../features/pamplet/Pamplet";
import '../../src/style.scss';
import ProductsList from "../features/products/components/ProductListSlider";
import { appLevelConstant, productsClassification } from "../app/constant";

export default function Home() {
  return (
    <div className="bg-white">
      <Navbar>
        <Pamplet></Pamplet>
        <div>
          <h1 className="product-categorie-heading">{appLevelConstant.DESIGNS_FOR_YOU_LABLE}</h1>
          <hr className="heading-under-line"></hr>
          <ProductsList categorie={appLevelConstant.DESIGNS_FOR_YOU_LABLE}></ProductsList>
        </div>
        {productsClassification.map((ele, index) => (
          <div key={index}>
            <h1 className="product-categorie-heading">{ele.lable}</h1>
            <hr className="heading-under-line"></hr>
            <ProductsList categorie={ele.value}></ProductsList>
          </div>
        ))}
      </Navbar>
    </div>
  )
}
