'use client';
import useFetchingData from '@/app/lib/useFetchingData';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function News() {
  const { fetchData: settingsData } = useFetchingData(
    '/api/front/setting/logo-identity'
  );
  const [fetchData, setFetchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    handleNewsData();
  }, [currentPage, itemsPerPage]);

  const handleNewsData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/front/news/articles?page=${currentPage}&per_page=${itemsPerPage}`
      );
      setFetchData(response?.data?.data);
      setTotalPages(response?.data?.last_page);
    } catch (error) {
      // console.error('Error fetching news data:', error);
    }
    setLoading(false);
  };
  return (
    <div className='container mx-auto mt-20'>
      <div className='mb-10'>
        {settingsData?.settings ? (
          <h2 className='text-center text-[#443f35] text-3xl font-bold'>
            <span className='gradient-text'>
              {settingsData?.settings?.siteName}
            </span>{' '}
            News
          </h2>
        ) : (
          <div className='h-8 bg-gray-200 rounded mb-4 animate-pulse w-1/3 mx-auto' />
        )}
        {settingsData?.settings ? (
          <p className='text-xl mt-4 text-center font-semibold'>
            Find out more news and more services
          </p>
        ) : (
          <div className='h-6 bg-gray-200 rounded mt-4 animate-pulse w-2/3 mx-auto' />
        )}
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8  px-[5vw] md:px-0 justify-center   mt-20'>
        {loading
          ? Array.from({ length: itemsPerPage }).map((_, index) => (
            <div
              className='w-full scale-110 lg:scale-100 md:scale-100 mb-6 border border-gray-200 rounded-lg animate-pulse'
              key={index}
            >
              <div className='h-full bg-white rounded-md'>
                <div className='w-full h-56 mb-8 bg-gray-200 rounded-t-lg'></div>
                <div className='px-4 pb-5'>
                  <div className='h-6 bg-gray-200 rounded mb-2'></div>
                  <div className='h-4 bg-gray-200 rounded mb-1'></div>
                  <div className='h-4 bg-gray-200 rounded mb-1'></div>
                  <div className='h-4 bg-gray-200 rounded'></div>
                </div>
              </div>
            </div>
          ))
          : Array.isArray(fetchData) && fetchData?.map((news) => (
            <Link
              href={`/news/${news?.id}`}
              className='w-full scale-110 lg:scale-100 md:scale-100 mb-6 border rounded-lg border-gray-200'
              key={news?.id}
              prefetch={false}
            >
              <div className='h-full bg-white rounded-md'>
                <Image
                  alt='testimonial'
                  className='w-full h-56 mb-8 object-fil inline-block rounded-t-lg'
                  src={news?.featured_image ? news?.featured_image : ''}
                  width={400}
                  height={300}
                  loading="lazy"
                />
                <div className='px-4 pb-5 space-y-2'>
                  <h2 className='font-semibold text-xl'>{news?.title}</h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: String(news?.content?.slice(0, 150) || "")
                    }}
                  ></div>
                </div>
              </div>
            </Link>
          ))}
      </div>
      <div className='flex justify-center mt-8'>
        {fetchData && fetchData?.length > 0 ? (
          Array.from({ length: totalPages || 0 }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-3 py-1 rounded-md ${currentPage === index + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
                }`}
            >
              {index + 1}
            </button>
          ))
        ) : (
          <div className='h-8 bg-gray-200 rounded mt-4 animate-pulse w-24'></div>
        )}
      </div>
    </div>
  );
}

export default News;
