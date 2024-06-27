import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ITEMS_PER_PAGES } from '../../app/constant';
import '../../features/products/components/product.scss';
import Pagination from '../../app/common-components/Pagination';
import { createCancelToken } from '../../app/constants/common-function';
import { getAllProducts } from '../../features/products/productAPI';
import SkeletonLoader from '../../app/common-components/SkeletonLoader';

export default function AdminProductList() {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
  }, [page]);

  useEffect(() => {
    setPage(1);
  }, [totalItems]);

  const handlePagination = (page) => {
    setLoading(true);
    setPage(page);
  }

  return (
    <div>

      <div className="bg-white">
        <div>
          {loading ?
            (
              <div className="m-16 py-0 sm:px-6 sm:py-0 lg:px-8">
                <SkeletonLoader count={ITEMS_PER_PAGES.productPage} />
              </div>
            ) : (
              <main className="mx-auto p-10 sm:px-6 lg:px-8">
                <section aria-labelledby="products-heading" className="pb-10 pt-6">
                  <div className="">
                    {/* Product grid */}
                    <ProductGrid products={products} />
                  </div>
                </section>
                {/* section of prodcuts and filters ends */}
                <Pagination page={page} handlePagination={handlePagination} totalItems={totalItems} itemsPerPage={ITEMS_PER_PAGES.productPage} />
              </main>
            )
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
              <Link to={`/admin/product-details/${product.id}`}>
                <div key={product.id} className="group relative product-card border border-gray-200">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 group-hover:opacity-75 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      src={product?.colors ? product?.colors[0].images[0] : ""}
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