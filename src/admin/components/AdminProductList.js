import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllProducts, fetchAllProductsAsync, selectTotalItems } from '../../features/products/productSlice';
import { ITEMS_PER_PAGES } from '../../app/constant';
import '../../features/products/components/product.scss';
import Pagination from '../../app/common-components/Pagination';

export default function AdminProductList() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const totalItems = useSelector(selectTotalItems);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const pagination = { page: page};
    dispatch(fetchAllProductsAsync(pagination));
  }, [dispatch, page]);

  useEffect(() => {
    setPage(1);
  }, [totalItems]);

  const handlePagination = (page) => {
    setPage(page);
  }

  return (
    <div>

      <div className="bg-white">
        <div>
          <main className="mx-auto p-10 sm:px-6 lg:px-8">
            <section aria-labelledby="products-heading" className="pb-10 pt-6">
              <div className="">
                {/* Product grid */}
                <ProductGrid products={products} />
              </div>
            </section>
            {/* section of prodcuts and filters ends */}
            <Pagination  page={page} handlePagination={handlePagination} totalItems={totalItems} itemsPerPage={ITEMS_PER_PAGES.productPage} />
          </main>
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
                <div key={product.id} className="group relative product-card">
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