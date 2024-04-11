import { Review } from "../model"; 

/**
 * @typedef {object} review
 */

/**
 * GET /v1/review/review-data
 * @summary review data
 * @tags Review
 * @return {object} 200 - Success response - application/json
 */  



const review = async(req,res) => {
    try {
        const review = await Review.find(); 
        res.status(200).json(review)
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: "Internal server error" });
    }
} 

export default {
    review,
  };