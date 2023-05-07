import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
// StarRating component that displays 5 stars and allows the user to select a rating
const StarRating = ({ rating, onRatingChange }) => {
  const [hover, setHover] = useState(null); //useState hook to keep track of star hover state

// Display 5 stars and set the color based on whether the star is being hovered over or not
  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <input
              type="radio"
              value={ratingValue}
              onClick={() => onRatingChange(ratingValue)}
              required
            />
            <FaStar
              className="star"
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#DCDCDC"}
              size={25}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
      <p>The rating is {rating}.</p>
    </div>
  );
};
// ReviewForm component that displays a form for submitting reviews
const ReviewForm = () => {
    const [reviews, setReviews] = useState([]);// useState hook to keep track of submitted reviews
    const [name, setName] = useState(""); // useState hook to keep track of the name input field
    const [review, setReview] = useState(""); // useState hook to keep track of the review input field
    const [rating, setRating] = useState(null);// useState hook to keep track of the rating input field
    const [editingIndex, setEditingIndex] = useState(null);
  // Handler function that adds a new review to the reviews array and resets the input fields
    const handleSubmit = (e) => {
      e.preventDefault();
      const newReview = { name, review, rating };
      if (editingIndex !== null) {
        reviews[editingIndex] = newReview;
        setReviews([...reviews]);
        setEditingIndex(null);
      } else {
        setReviews([...reviews, newReview]);
      }
      setName("");
      setReview("");
      setRating(null);
    };
  //handler function that allows user to edit reviews 
    const handleEdit = (index) => {
      const review = reviews[index];
      setName(review.name);
      setReview(review.review);
      setRating(review.rating);
      setEditingIndex(index);
    };
  //handler function that allows user to delete review
    const handleDelete = (index) => {
      const newReviews = [...reviews];
      newReviews.splice(index, 1);
      setReviews(newReviews);
    };
  // Render the form and the list of reviews using the ReviewList component
    return (
      <div>
        <form className="form" onSubmit={handleSubmit}>
          <label className="">
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <br />
          <label className="">
            Review:
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            />
          </label>
          <br />
          <label className="">
            Rating:
            <StarRating rating={rating} onRatingChange={setRating} />
          </label>
          <br />
          <button className="button" type="submit">
            {editingIndex !== null ? "Save Review" : "Submit Review"}
          </button>
        </form>
        <ReviewList
          reviews={reviews}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    );
  };
  

// ReviewList component that displays a list of submitted reviews
const ReviewList = ({ reviews, onDelete, onEdit }) => {
    return (
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>
            <div>
              <strong>{review.name}</strong>: {review.review}
            </div>
            <div>
              {[...Array(review.rating)].map((_, i) => (
                <FaStar key={i} color="#ffc107" size={20} />
              ))}
            </div>
            <div>
              <button className="button" onClick={() => onEdit(index)}>Edit</button>
              <button className="button" onClick={() => onDelete(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    );
  };
  
export default ReviewForm;
