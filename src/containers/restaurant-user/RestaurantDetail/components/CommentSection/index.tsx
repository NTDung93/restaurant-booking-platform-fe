import { LocationFeedbackResponse } from '@/common/models/feedback';
import { ResponseEntityPagination } from '@/common/models/pagination';
import React, { useState } from 'react';

const Rating: React.FC<{ rating: number }> = ({ rating }) => (
  <div>
    {[...Array(5)].map((_, index) =>
      index < rating ? (
        <span key={index} className="text-amber-500 text-2xl">
          ★
        </span>
      ) : (
        <span key={index} className="text-gray-300 text-2xl">
          ☆
        </span>
      ),
    )}
  </div>
);

interface FeedbackSectionProps {
  feedbackData: ResponseEntityPagination<LocationFeedbackResponse>;
}

const FeedbackSection: React.FC<FeedbackSectionProps> = ({ feedbackData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = feedbackData.size;
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);

  const imageAva = 'https://via.placeholder.com/50';
  const filteredFeedbacks = ratingFilter
    ? feedbackData.content.filter(
        (feedback) => feedback.rating === ratingFilter,
      )
    : feedbackData.content;

  const totalPages = feedbackData.totalPages;
  const indexOfLastFeedback = currentPage * itemsPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - itemsPerPage;
  const currentFeedbacks = filteredFeedbacks.slice(
    indexOfFirstFeedback,
    indexOfLastFeedback,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-screen-xl mx-auto text-base px-4">
      <div className="border-b-2 border-gray-300 my-14"></div>

      <div className="bg-gradient-to-r from-amber-600/90 to-amber-400/90 text-white font-bold p-4 rounded-lg text-xl">
        Phản hồi
      </div>

      <div className="mb-4 flex items-center mt-3">
        <span className="mr-3">Lọc theo đánh giá:</span>
        <button
          onClick={() => setRatingFilter(null)}
          className={`border border-amber-500 rounded-md px-4 py-2 cursor-pointer transition duration-300 mr-2 ${
            ratingFilter === null
              ? 'bg-amber-500 text-white'
              : 'bg-transparent text-amber-600'
          }`}
        >
          Tất cả
        </button>
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            onClick={() =>
              setRatingFilter(ratingFilter === rating ? null : rating)
            }
            className={`border border-amber-500 rounded-md px-4 py-2 mr-2 cursor-pointer transition duration-300 ${
              ratingFilter === rating
                ? 'bg-amber-500 text-white'
                : 'bg-transparent text-amber-600'
            }`}
          >
            {rating} sao
          </button>
        ))}
      </div>

      {currentFeedbacks.length > 0 ? (
        currentFeedbacks.map((feedback) => (
          <div
            key={feedback.id}
            className="mb-4 shadow-md rounded-lg bg-white border border-gray-200 p-4"
          >
            <div className="flex items-center mb-2">
              <img
                src={imageAva}
                alt={`${feedback.userName}'s avatar`}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h4 className="text-lg font-semibold">{feedback.userName}</h4>
                <p className="text-gray-500">{feedback.feedbackDate}</p>
              </div>
            </div>
            <p className="mb-2">{feedback.content}</p>
            <Rating rating={feedback.rating} />

            {feedback.image && feedback.image.length > 0 && (
              <div className="flex mt-2 space-x-2">
                {feedback.image.split(',').map((img, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={img}
                    alt={`Feedback image ${imgIndex + 1}`}
                    className="w-36 h-36 object-cover rounded-md"
                  />
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500">Chưa có phản hồi nào.</p>
      )}

      <hr className="my-4" />

      <div className="flex justify-between">
        <span>
          Trang {currentPage} / {totalPages}
        </span>
        <div>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`mr-2 px-4 py-2 rounded-lg text-white ${
              currentPage === 1
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-amber-600 hover:bg-amber-700'
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg text-white ${
              currentPage === totalPages
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-amber-600 hover:bg-amber-700'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSection;
