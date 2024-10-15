import Review from './components/Review';
import React, { useState } from 'react';
import RatingsOverview from './components/RatingsOverview';
import UserRatingsSelector from './components/UserRatingsSelector';
import Toast from 'components/ux/toast/Toast';
import PaginationController from 'components/ux/pagination-controller/PaginationController';
import Loader from 'components/ux/loader/loader';
// import { useSelector } from 'react-redux';
import apiService from 'services/request';
import { store } from '../../../../redux/store';
/**
 * Renders the user reviews component.
 *
 * @component
 * @param {Object} reviewData - The review data object.
 * @returns {JSX.Element} The user reviews component.
 */
const UserReviews = ({
  hotelCode,
  reviewData,
  handlePageChange,
  handlePreviousPageChange,
  handleNextPageChange,
  handleSetSubmitStatus,
}) => {
  const [userRating, setUserRating] = useState(0);

  const [userReview, setUserReview] = useState('');

  const [shouldHideUserRatingsSelector, setShouldHideUserRatingsSelector] =
    useState(false);

  const [toastMessage, setToastMessage] = useState('');

  // const reviewerName = useSelector((state) => {
  //   if (state.auth === true) {
  //     return state.auth.user.lastName;
  //   } else {
  //     return '';
  //   }
  // });
  let reviewerName = '';
  if (store.getState().auth.auth === true) {
    reviewerName = store.getState().auth.auth.user.lastName;
  }
  /**
   * Handles the selected user rating.
   * @param {number} rate - The rating value.
   */
  const handleRating = (rate) => {
    setUserRating(rate);
  };

  const clearToastMessage = () => {
    setToastMessage('');
  };

  const handleReviewSubmit = async () => {
    console.log('okj');
    if (userRating === 0) {
      setToastMessage({
        type: 'error',
        message: 'Please select a rating before submitting.',
      });
      return;
    }
    let currentDate = new Date();
    const response = await apiService.post('/api/hotel/add-review', {
      rating: userRating,
      review: userReview,
      date: currentDate,
      reviewerName: reviewerName,
      hotelId: hotelCode,
    });
    console.log(response);
    if (response && response.errors.length === 0 && response.data.status) {
      setToastMessage({
        type: 'success',
        message: response.data.status,
      });
      handleSetSubmitStatus();
    } else {
      setToastMessage({
        type: 'error',
        message: 'Review submission failed',
      });
    }
    setShouldHideUserRatingsSelector(true);
  };

  const handleUserReviewChange = (review) => {
    setUserReview(review);
  };

  const isEmpty = reviewData.data.length === 0;

  return (
    <div className="flex flex-col p-4 border-t">
      <h1 className="text-xl font-bold text-gray-700">User Reviews</h1>
      <div className="flex flex-col md:flex-row py-4 bg-white shadow-sm gap-6">
        {reviewData.data.length === 0 ? (
          <div className="w-3/5">
            <span className="text-gray-500 italic">
              Be the first to leave a review!
            </span>
          </div>
        ) : (
          <RatingsOverview
            averageRating={reviewData.metadata.averageRating}
            ratingsCount={reviewData.metadata.totalReviews}
            starCounts={reviewData.metadata.starCounts}
          />
        )}
        {shouldHideUserRatingsSelector ? null : (
          <UserRatingsSelector
            userRating={userRating}
            isEmpty={isEmpty}
            handleRating={handleRating}
            userReview={userReview}
            handleReviewSubmit={handleReviewSubmit}
            handleUserReviewChange={handleUserReviewChange}
          />
        )}
      </div>
      {toastMessage && (
        <Toast
          type={toastMessage.type}
          message={toastMessage.message}
          dismissError={clearToastMessage}
        />
      )}
      <div>
        {reviewData.isLoading ? (
          <Loader height={'600px'} />
        ) : (
          <div>
            {reviewData.data.map((review, index) => (
              <Review
                key={index}
                reviewerName={review.reviewerName}
                reviewDate={review.date}
                review={review.review}
                rating={review.rating}
                verified={review.verified}
              />
            ))}
          </div>
        )}
      </div>
      {reviewData.data.length > 0 && (
        <PaginationController
          currentPage={reviewData.pagination.currentPage}
          totalPages={reviewData.pagination.totalPages}
          handlePageChange={handlePageChange}
          handlePreviousPageChange={handlePreviousPageChange}
          handleNextPageChange={handleNextPageChange}
        />
      )}
    </div>
  );
};

export default UserReviews;
