import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css'; // Ensure your styles are properly imported

function GiphyImage() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const apiKey = 'F981o2gElB7QcQB540hUdYXfUPqCuhiV';
    const query = 'cats'; // Define the search query for cats
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(query)}&limit=12&offset=0&rating=g&lang=en`; // Updated to search for cat gifs
  
    try {
      const response = await axios.get(url);
      const imageUrls = response.data.data.map(img => img.images.original.url);
      setImages(imageUrls);
    } catch (error) {
      console.error('Error fetching images from Giphy: ', error);
      setImages([]);
    }
  };

  return (
    <div className="App">
      <h1>Gallery of Giphy Images</h1>
      <div className="image-container">
        {images.map((image, index) => (
          <div key={index} className="card">
            <img src={image} alt="Random Giphy" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GiphyImage;
