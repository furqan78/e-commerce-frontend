import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ITEMS_PER_PAGES, appLevelConstant, productCategorie } from '../../../app/constant';
import './product.scss';
import VisitingCard from '../../pamplet/ProductPamplet';
import cardImage from '../../../assets/images/visiting-card-template-2.png';
import Pagination from '../../../app/common-components/Pagination';
import { createCancelToken } from '../../../app/constants/common-function';
import { getAllProducts } from '../productAPI';
import SkeletonLoader from '../../../app/common-components/SkeletonLoader';

export default function ProductList() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const params = useParams();

  useEffect(() => {
    let isMounted = true;
    const cancelTokenSource = createCancelToken();

    if (isMounted) {
      const getProducts = async () => {
        try {
          const pagination = { page: page };
          const data = await getAllProducts(pagination);
          setTotalItems(data.totalCount);
          setProducts(data);
          setLoading(false);
        } catch (err) {
          if (err.message !== 'Request canceled' && isMounted) {
            setError(err.message);
            setLoading(false);
          }
        }
      }

      getProducts();
    }
    return () => {
      isMounted = false;
      cancelTokenSource.cancel("Requests Canceled.")
    }

  }, [dispatch, page]);

  useEffect(() => {
    setPage(1);
  }, [totalItems]);

  const handlePagination = (page) => {
    setLoading(true);
    setPage(page);
  }

  return (
    <div>
      {/* Business Cards Pamplet */}
      {params.categorie === productCategorie.BUSINESS_CARDS ? <VisitingCard title={appLevelConstant.BUSINESS_CARDS_LABLE}
        description={appLevelConstant.BUSINESS_CARDS_DESCRIPION} imageSrc={cardImage} ></VisitingCard> : null}

      {/* New Arrivals Pamplet */}
      {params.categorie === productCategorie.NEW_ARRIVALS ? <VisitingCard title={appLevelConstant.NEW_ARRIVALS_LABLE}
        description={appLevelConstant.NEW_ARRIVALS_DESCRIPTION} imageSrc={cardImage} ></VisitingCard> : null}

      {/* T-shirts Pamplet */}
      {params.categorie === productCategorie.T_SHIRTS ? <VisitingCard title={appLevelConstant.T_SHIRTS_LABLE}
        description={appLevelConstant.BUSINESS_CARDS_DESCRIPION} imageSrc={cardImage} ></VisitingCard> : null}

      {/* Coffee Mug Pamplet */}
      {params.categorie === productCategorie.COFFEE_MUG ? <VisitingCard title={appLevelConstant.COFFEE_MUG_LABLE}
        description={appLevelConstant.BUSINESS_CARDS_DESCRIPION} imageSrc={cardImage} ></VisitingCard> : null}

      {/* Custom Cap Pamplet */}
      {params.categorie === productCategorie.CUSTOM_CAP ? <VisitingCard title={appLevelConstant.CUSTOM_CAP_LABLE}
        description={appLevelConstant.BUSINESS_CARDS_DESCRIPION} imageSrc={cardImage} ></VisitingCard> : null}

      {/* Pillow Pamplet */}
      {params.categorie === productCategorie.PILLOW ? <VisitingCard title={appLevelConstant.PILLOW_COVER_LABLE}
        description={appLevelConstant.BUSINESS_CARDS_DESCRIPION} imageSrc={cardImage} ></VisitingCard> : null}

      {/* Key Chain Pamplet */}
      {params.categorie === productCategorie.KEY_CHAIN ? <VisitingCard title={appLevelConstant.KEY_CHAIN_LABLE}
        description={appLevelConstant.BUSINESS_CARDS_DESCRIPION} imageSrc={cardImage} ></VisitingCard> : null}

      <div className="bg-white">
        <div>
          {/* <MobileFilter mobileFiltersOpen={mobileFiltersOpen} setMobileFiltersOpen={setMobileFiltersOpen} filtersArray={filtersArray} handleFilter={handleFilter} /> */}
          {
            loading ?
              (
                <div className="m-16 py-0 sm:px-6 sm:py-0 lg:px-8">
                <SkeletonLoader count={ITEMS_PER_PAGES.productPage} />
                </div>
              ) : (
                <main className="mx-auto px-7 sm:px-6 lg:px-8">
                  <section aria-labelledby="products-heading" className="pb-24 pt-6">
                    <div className="">
                      {/* Product grid */}
                      <ProductGrid products={products} />
                    </div>
                  </section>
                  {/* section of prodcuts and filters ends */}
                  <Pagination page={page} handlePagination={handlePagination} totalItems={totalItems} itemsPerPage={ITEMS_PER_PAGES.productPage} />
                </main>)
          }
        </div>
      </div>
    </div>
  )
}

function ProductGrid({ products }) {
  return (
    <div className="lg:col-span-3">
      <div className="bg-white">
        <div className="mx-auto py-0 sm:px-6 sm:py-0 lg:px-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 mt-6">
            {products && products.data ? products.data.map((product) => (
              <Link to={`/product-detail/${product.id}`}>
                <div key={product.id} className="group relative product-card border border-gray-200">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 group-hover:opacity-75 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      src={product.thumbnail}
                      className="h-full w-full object-cover object-center group-hover:opacity-75" alt=""
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-lg text-black font-semibold">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.title}
                      </h3>
                      <p className="mt-1 text-lg text-gray-500 flex items-center space-x-1">
                        {/* <StarIcon className='w-6 h-6 inline'></StarIcon> */}
                        <span>1 Starting from {product.price}</span></p>
                    </div>
                  </div>
                </div>
              </Link>
            )) : ''}
          </div>
        </div>
      </div>
    </div>
  );
}