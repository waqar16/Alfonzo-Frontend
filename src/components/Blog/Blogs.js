import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const BlogPost = ({ title, summary, link, image }) => (
  <div
    className="relative p-6 dark:bg-slate-900 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden group transition-transform transform hover:scale-105"
    data-aos="fade-up"
    data-aos-duration="1000"
  >
    <img
      src={image || "https://via.placeholder.com/600x400"}
      alt={title}
      className="w-full h-48 object-cover rounded-md group-hover:opacity-75 transition-opacity duration-300"
    />
    <div className="mt-6">
      <h3 className="text-xl font-semibold dark:text-white text-gray-900">
        {title}
      </h3>
      <p className="dark:text-zinc-400 mt-2 text-base text-gray-600">
        {summary}
      </p>
      <Link
        to={link}
        className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
      >
        Read More
      </Link>
    </div>
  </div>
);

const BlogSection = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("https://gnews.io/api/v4/search", {
          params: {
            q: "legal law", // Your search query
            lang: "es", // Language of the articles
            max: 6, // Maximum number of articles to fetch
            token: "5de45e642e539d520472a1863750f66b", // Replace with your GNews API key
          },
        });
        setPosts(response.data.articles);
        console.log(response.data.articles);
      } catch (error) {
        setError("Failed to fetch news. Please try again later.");
      }
      setLoading(false);
    };

    fetchNews();
  }, []);

  return (
    <section className="py-12 dark:bg-black bg-gray-100 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="dark:text-white text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Latest News & Updates
          </h2>
          <p className="dark:text-zinc-400 mt-4 text-base leading-7 text-gray-600 sm:mt-8">
            Stay up-to-date with our latest news and industry insights.
          </p>
        </div>

        {loading && <p className="text-center mt-8">Loading news...</p>}
        {error && <p className="text-center mt-8 text-red-600">{error}</p>}

        <div className="mt-10 grid gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <BlogPost
              key={index}
              title={post.title}
              summary={post.description}
              link={post.url}
              image={post.image}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to={"/news"}
            className={`p-2 border border-[#00A8E8] hover:border-white hover:bg-[#00A8E8] hover:text-white  inline-block px-6 py-3 text-base font-medium text-[#00A8E8]   rounded-lg transition-colors duration-300`}
          >
            View More ...
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
