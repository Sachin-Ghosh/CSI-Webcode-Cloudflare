
import React from 'react';

const Blogs = () => {
  const newsData = [
    {
      id: 1,
      title: "Startup X raises $10M in Series A funding",
      description: "Startup X has secured $10 million in Series A funding to expand its platform and reach new markets.",
      image: "/assets/startup1.png", 
    },
    {
      id: 2,
      title: "Tech company Y announces new AI-powered tool",
      description: "Tech company Y has launched a new AI-powered tool to help businesses automate their operations more efficiently.",
      image: "/assets/technews1.png",
    },
    {
      id: 3,
      title: "Innovative startup Z introduces eco-friendly packaging",
      description: "Startup Z has unveiled a new eco-friendly packaging solution that aims to reduce plastic waste.",
      image: "/assets/startup2.png",
    },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full">
    <h2 className="text-xl font-bold mb-4">Latest News</h2>
    {newsData.map((news) => (
      <div key={news.id} className="mb-4">
        <img src={news.image} alt={news.title} className="w-full h-64 object-cover rounded-md" />
        <h3 className="text-lg font-semibold mt-2">{news.title}</h3>
        <p className="text-sm text-gray-700">{news.description}</p>
      </div>
    ))}
  </div>
  );
};

export default Blogs;
