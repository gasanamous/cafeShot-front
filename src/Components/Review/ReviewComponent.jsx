import Star from "./Star";
import { useEffect, useState } from "react";
import "./review.css";
import PersonIcon from "@mui/icons-material/Person";
import APIService from "../../utils/api";
import Loader from "../Loader/Loader";

export default function ReviewComponent() {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [newReview, setNewReview] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const getReviews = async () => {
    setLoading(true);
    try {
      const data = await APIService.get("/review", false);
      setReviews(data?.topReviews);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  function getTimeAgo(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const secondsAgo = Math.floor((now - past) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const count = Math.floor(secondsAgo / secondsInUnit);
      if (count >= 1) {
        return `${count} ${unit}${count > 1 ? "s" : ""} ago`;
      }
    }

    return "Just now";
  }



  function handleOfStar(value) {
    setRating(value);
  }

  async function handleToTheListOfReview(e) {
    e.preventDefault();
    const body = { comment: comment, rating: rating };
    try {
      const data = await APIService.post("/review/new",body, false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    setNewReview([...newReview, { comment: comment, rating: rating }]);
    setComment("");
    setRating(0);
  }

  useEffect(() => {
    getReviews();
  }, [newReview]);
  
  return (
    <>
      <h1 className="txt4 text-xl sm:text-3xl mt-10 mb-10 m-20">
        Review of cafe friends
      </h1>
      <div className="flex sm:flex-row flex-col text-[#74512D] sm:m-15 sm:w-[90%] w-full ">
        <div className="flex rounded-xl	 justify-center items-center flex-col flex-1 h-[50vh] bg-[#F8F4E1] m-[20px] p-[10px]  border-2 txt3 bg-primary">
          <h1 style={{ textAlign: "center", margin: "20px" }}>
            Share Your experience with us!
          </h1>
          <textarea
            className="w-full rounded-[20px] bg-white border border-[#74512D] p-3"
            value={comment}
            onChange={(event) => {
              setComment(event.target.value);
            }}
            placeholder="Write your review here..."
          />

          <Star
            text="Rate the service"
            handleOfStar={handleOfStar}
            value={rating}
          />

          <button
            onClick={handleToTheListOfReview}
            disabled={comment == "" && rating == 0 ? true : false}
            style={{
              background: comment == "" && rating == "" ? "gray" : "#af8f6f",
            }}
            className="submitReview"
            id={comment == "" && rating == "" ? "" : "submit"}
          >
            submit
          </button>
        </div>
        <div
          className="flex-[2] h-[50vh] m-[20px] overflow-y-auto rounded-l-xl rounded-r-sm border-2 border-[#74512D] scrollable-box"
          style={{ maxHeight: "400px", overflowY: "scroll" }}
        >
          {loading ? (
            <Loader />
          ) : (
            reviews?.map((review) => (
              <div className="w-95% flex flex-row bg-secondary-trans rounded-[20px] mb-[10px] txt1 m-1 p-2">
                <PersonIcon style={{ margin: "10px" }} />
                <Star
                  text={review.comment}
                  value={review.rating}
                  readonly={true}
                />
                <h3 className="ml-auto text-sm">
                  {getTimeAgo(review.ratedAt)}
                </h3>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
