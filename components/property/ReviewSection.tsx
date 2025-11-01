import axios from "axios";
import { useState, useEffect } from "react";

interface Review {
  id: string;
  comment: string;
  name?: string; // Assuming reviews might have a name
  rating?: number; // Assuming reviews might have a rating
  avatar?: string; // Assuming reviews might have an avatar
}

interface ReviewSectionProps {
  propertyId: string;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ propertyId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!propertyId) return;
      try {
        const response = await axios.get(`/api/properties/${propertyId}/reviews`);
        setReviews(response.data);
      } catch (err) {
        setError("Failed to fetch reviews.");
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [propertyId]);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (reviews.length === 0) {
    return <p>No reviews yet.</p>;
  }

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold">Reviews</h3>
      {reviews.map((review) => (
        <div key={review.id} className="border-b pb-4 mb-4">
          {review.name && review.avatar && (
            <div className="flex items-center">
              <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full mr-4" />
              <div>
                <p className="font-bold">{review.name}</p>
                {review.rating && <p className="text-yellow-500">{review.rating} stars</p>}
              </div>
            </div>
          )}
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewSection;
