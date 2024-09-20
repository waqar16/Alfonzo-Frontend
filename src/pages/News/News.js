import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

// NewsList Component
const NewsList = ({ news }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {news.map((item) => (
      <div
        key={item.url}
        className="cursor-pointer bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
        onClick={() => window.open(item.url, '_blank')}
      >
        <img src={item.urlToImage || 'https://via.placeholder.com/600x400'} alt={item.title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-xl font-bold text-black mb-2">{item.title}</h3>
          <p className="text-sm text-gray-700 mb-4">{item.description}</p>
          <p className="text-sm text-gray-500">{item.publishedAt}</p>
        </div>
      </div>
    ))}
  </div>
);

const NewsUpdatesPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Track the current page
  const [hasMore, setHasMore] = useState(true); // Whether there is more news to load

  // Function to fetch news about legal laws
  const fetchNews = async (category = 'legal laws', pageNum = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything`, {
        params: {
          apiKey: '3fa38a7ec3164c6dbd8c9f116484cd44', // Replace with your News API key
          q: category, // Search query for legal news
          language: 'es', // News language
          pageSize: 6,
          page: pageNum, // Use page number to fetch more news
        },
      });
      const newArticles = response.data.articles;

      // If no new articles, mark hasMore as false
      if (newArticles.length === 0) {
        setHasMore(false);
      }

      // Append the new articles to the existing list
      setNews((prevNews) => [...prevNews, ...newArticles]);
    } catch (error) {
      setError('Failed to fetch news. Please try again later.');
    }
    setLoading(false);
  };

  // Fetch news on initial render and when the page changes
  useEffect(() => {
    fetchNews('legal laws', page);
  }, [page]);

  // Load more news
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-5xl font-bold mb-8">News & Updates</h1>

      {loading && !news.length && (
        <div className="flex justify-center">
          <p>Loading news...</p>
        </div>
      )}

      {error && <p className="text-red-600">{error}</p>}

      <h3 className="text-2xl font-bold mb-6">Latest Legal News</h3>
      <NewsList news={news} />

      {/* Load More Button with Spinner */}
      {hasMore && (
        <div className="flex justify-center mb-10">
          <button
            className="mt-6 px-6 py-2 mx-auto bg-gray-600 text-white font-bold rounded-md hover:bg-gray-700 flex items-center"
            onClick={handleLoadMore}
            disabled={loading} // Disable button when loading
          >
            {loading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </button>
        </div>
      )}

      {loading && news.length > 0 && (
        <div className="flex justify-center">
          <p>Loading more news...</p>
        </div>
      )}
    </div>
  );
};

export default NewsUpdatesPage;
