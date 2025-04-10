import React, { useState, useEffect } from "react";

function RandomDogImage() {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDogImage() {
      // Mark the loading state to true
      setLoading(true);
      try {
        // Fetch from the api
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        // If the response is not correct
        if (!response.ok) {
          // throw an error
          throw new Error("Failed to fetch image");
        }
        // else, convert the response to json and update the imageUrl state
        const data = await response.json();
        setImageUrl(data.message);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        // Set loading to false to hide the loading indicator
        setLoading(false);
      }
    }

    fetchDogImage();
  }, []);

  return (
    <div>
      {loading && <p>Loading image...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {imageUrl && (
        <img
          src={imageUrl}
          alt="A random dog"
          style={{ width: "150px", height: "150px" }}
        />
      )}
    </div>
  );
}

export default RandomDogImage;
