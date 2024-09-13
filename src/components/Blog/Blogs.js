import React, { useEffect } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const blogPosts = [
  {
    title: 'Understanding Industry Trends',
    summary: 'A deep dive into the latest trends in the legal industry and how they impact your business.',
    link: '/blog/industry-trends',
    image: 'https://th.bing.com/th/id/OIP.9MeGuTkhsQ-yDzOyacOEXAHaEo?rs=1&pid=ImgDetMain'
  },
  {
    title: 'Product Update: New Features',
    summary: 'Explore the latest features and improvements we’ve made to enhance your user experience.',
    link: '/blog/product-update',
    image: 'https://thumbs.dreamstime.com/b/judge-books-wooden-table-195252511.jpg'
  },
  {
    title: 'How to Stay Compliant',
    summary: 'Essential tips for ensuring compliance with industry regulations and avoiding common pitfalls.',
    link: '/blog/stay-compliant',
    image: 'https://thumbs.dreamstime.com/b/justice-concept-court-library-law-attorney-lawyer-gavel-judge-legal-conception-79613380.jpg'
  }
];

const BlogPost = ({ title, summary, link, image }) => (
  <div
    className="relative p-6 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden group transition-transform transform hover:scale-105"
    data-aos="fade-up"
    data-aos-duration="1000"
  >
    <img
      src={image}
      alt={title}
      className="w-full h-48 object-cover rounded-md group-hover:opacity-75 transition-opacity duration-300"
    />
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-base text-gray-600">{summary}</p>
      <a
        href={link}
        className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
      >
        Read More
      </a>
    </div>
  </div>
);

const BlogSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="py-12 bg-gray-100 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Latest News & Updates
          </h2>
          <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-8">
            Stay up-to-date with our latest news and industry insights.
          </p>
        </div>

        <div className="mt-10 grid gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <BlogPost
              key={index}
              title={post.title}
              summary={post.summary}
              link={post.link}
              image={post.image}
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center space-x-6">
          <a
            href="https://facebook.com"
            className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
          >
            <FaFacebookF className="w-6 h-6" />
          </a>
          <a
            href="https://twitter.com"
            className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
          >
            <FaTwitter className="w-6 h-6" />
          </a>
          <a
            href="https://linkedin.com"
            className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
          >
            <FaLinkedinIn className="w-6 h-6" />
          </a>
          <a
            href="https://instagram.com"
            className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
          >
            <FaInstagram className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
