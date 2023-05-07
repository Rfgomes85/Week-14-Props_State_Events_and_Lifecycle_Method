import React from "react";

const ReviewList = () => {
  const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>{review}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;
