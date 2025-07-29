// import { Calendar, GraduationCap, Languages, BriefcaseMedical, User, MapPin, DollarSign, FileText, IndianRupee } from "lucide-react";
// import { useLocation, useNavigate } from "react-router-dom"
// const UserSideDoctorDetails = () => {
//     const location = useLocation()
//     const navigate = useNavigate()
//     const { doctorId, doctor } = location.state
//     return (
//         <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-xl">
//             {/* Profile Image */}
//             <div className="flex flex-col items-center">
//                 <img src={doctor.profileImage} alt="Doctor" className="w-32 h-32 rounded-full shadow-md" />
//                 <h2 className="text-2xl font-bold mt-4">{doctor.name}</h2>
//                 <p className="text-gray-600">{doctor.email}</p>
//                 <p className="text-sm text-gray-500">{doctor.country}, {doctor.state}</p>
//             </div>

//             {/* Details Section */}
//             <div className="mt-6 space-y-4">
//                 {/* Departments */}
//                 <div className="flex items-center space-x-2">
//                     <BriefcaseMedical className="w-5 h-5 text-indigo-600" />
//                     <p><strong>Departments:</strong> {doctor.departments.join(", ")}</p>
//                 </div>

//                 {/* Experience */}
//                 <div className="flex items-center space-x-2">
//                     <User className="w-10 h-10  text-indigo-600 " />
//                     <p><strong>Experience:</strong> {doctor.experience} years</p>
//                 </div>

//                 {/* Date of Birth */}
//                 <div className="flex items-center space-x-2">
//                     <Calendar className="w-5 h-5 text-indigo-600" />
//                     <p><strong>Date of Birth:</strong> {doctor.dateOfBirth}</p>
//                 </div>

//                 {/* Bio */}
//                 <div className="flex items-start space-x-2">
//                     <FileText className="w-28 h-10 text-indigo-600" />
//                     <p><strong>Bio:</strong> {doctor.bio}</p>
//                 </div>

//                 {/* Languages */}
//                 <div className="flex items-center space-x-2">
//                     <Languages className="w-5 h-5 text-indigo-600" />
//                     <p><strong>Languages Known:</strong> {doctor.knownLanguages.join(", ")}</p>
//                 </div>

//                 {/* Education */}
//                 <div className="flex items-center space-x-2">
//                     <GraduationCap className="w-5 h-5 text-indigo-600" />
//                     <p><strong>Education:</strong> {doctor.degree} from {doctor.institution} ({doctor.year})</p>
//                 </div>

//                 {/* License Number */}
//                 <div className="flex items-center space-x-2">
//                     <MapPin className="w-5 h-5 text-indigo-600" />
//                     <p><strong>Medical License Number:</strong> {doctor.medicalLicenceNumber}</p>
//                 </div>

//                 {/* Consultation Types */}
//                 <div className="flex items-center space-x-2">
//                     <FileText className="w-5 h-5 text-indigo-600" />
//                     <p><strong>Consultation Types:</strong> {doctor.consultationType.join(", ")}</p>
//                 </div>

//                 {/* Consultation Fee */}
//                 <div className="flex items-center space-x-2">
//                     {/* <DollarSign className="w-5 h-5 text-indigo-600" /> */}
//                     <IndianRupee className="w-5 h-5 text-indigo-600" />
//                     <p><strong>Consultation Fee:</strong> ₹ {doctor.consultationFee}</p>
//                 </div>
//             </div>

//             {/* Book Appointment Button */}
//             <div className="mt-6 flex justify-center">
//                 <button onClick={() => navigate("/booking",{ state: { doctorId, doctor } })} className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 shadow-md transition-all">
//                     Book Appointment
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default UserSideDoctorDetails;


////////////////////////////////////////////////////////////////////////////////////////////////

"use client"

import {
    Calendar,
    GraduationCap,
    Languages,
    BriefcaseMedical,
    User,
    MapPin,
    FileText,
    IndianRupee,
    Star,
    Send,
} from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { findReviewData, submitReview } from "src/services/user/userApi"
import { toast } from "sonner"

const UserSideDoctorDetails = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { doctorId, doctor } = location.state

    // Review state
    const [rating, setRating] = useState(0)
    const [hoveredRating, setHoveredRating] = useState(0)
    const [review, setReview] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Mock existing reviews - replace with actual API call
    const [existingReviews, setExistingReviews] = useState([])
    useEffect(() => {
        const getexistingReviews = async () => {
            const fethReviewData: any = await findReviewData(doctorId)
            setExistingReviews(fethReviewData?.data?.data)
        }
        getexistingReviews()
    }, [])

    const handleSubmitReview = async () => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo") || '{}');

        if (rating === 0 || review.trim() === "") {
            alert("Please provide both rating and review")
            return
        }

        setIsSubmitting(true)
        const reviewData = {
            doctorId,
            rating,
            comment: review,
            userId: userInfo?._id
        }
        try {
            const data: any = await submitReview(reviewData)
            // console.log(data.data.data);

            if (data?.data?.message === "Review submitted successfully") {
                setExistingReviews(data.data.data)
                setIsSubmitting(false)
                setRating(0)
                setReview("")
                toast.success("Review submitted successfully")
            }

        } catch (error: any) {
            toast.error(error.response.data.error)
            setIsSubmitting(false)
        }


    }

    const renderStars = (currentRating: number, interactive = false) => {
        return [...Array(5)].map((_, index) => {
            const starValue = index + 1
            return (
                <Star
                    key={index}
                    className={`w-6 h-6 cursor-pointer transition-colors ${starValue <= (interactive ? hoveredRating || rating : currentRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                        }`}
                    onClick={interactive ? () => setRating(starValue) : undefined}
                    onMouseEnter={interactive ? () => setHoveredRating(starValue) : undefined}
                    onMouseLeave={interactive ? () => setHoveredRating(0) : undefined}
                />
            )
        })
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    const averageRating =
        existingReviews.length > 0
            ? (existingReviews.reduce((sum, review) => sum + review.rating, 0) / existingReviews.length).toFixed(1)
            : "0.0"

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl">
            {/* Profile Image */}
            <div className="flex flex-col items-center">
                <img
                    src={doctor.profileImage || "/placeholder.svg"}
                    alt="Doctor"
                    className="w-32 h-32 rounded-full shadow-md"
                />
                <h2 className="text-2xl font-bold mt-4">{doctor.name}</h2>
                <p className="text-gray-600">{doctor.email}</p>
                <p className="text-sm text-gray-500">
                    {doctor.country}, {doctor.state}
                </p>

                {/* Average Rating Display */}
                <div className="flex items-center mt-2 space-x-2">
                    <div className="flex">{renderStars(Number.parseFloat(averageRating))}</div>
                    <span className="text-lg font-semibold text-gray-700">{averageRating}</span>
                    <span className="text-sm text-gray-500">({existingReviews.length} reviews)</span>
                </div>
            </div>

            {/* Details Section */}
            <div className="mt-6 space-y-4">
                {/* Departments */}
                <div className="flex items-center space-x-2">
                    <BriefcaseMedical className="w-5 h-5 text-indigo-600" />
                    <p>
                        <strong>Departments:</strong> {doctor.departments.join(", ")}
                    </p>
                </div>

                {/* Experience */}
                <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-indigo-600" />
                    <p>
                        <strong>Experience:</strong> {doctor.experience} years
                    </p>
                </div>

                {/* Date of Birth */}
                <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                    <p>
                        <strong>Date of Birth:</strong> {doctor.dateOfBirth}
                    </p>
                </div>

                {/* Bio */}
                <div className="flex items-start space-x-2">
                    <FileText className="w-5 h-5 text-indigo-600 mt-1" />
                    <p>
                        <strong>Bio:</strong> {doctor.bio}
                    </p>
                </div>

                {/* Languages */}
                <div className="flex items-center space-x-2">
                    <Languages className="w-5 h-5 text-indigo-600" />
                    <p>
                        <strong>Languages Known:</strong> {doctor.knownLanguages.join(", ")}
                    </p>
                </div>

                {/* Education */}
                <div className="flex items-center space-x-2">
                    <GraduationCap className="w-5 h-5 text-indigo-600" />
                    <p>
                        <strong>Education:</strong> {doctor.degree} from {doctor.institution} ({doctor.year})
                    </p>
                </div>

                {/* License Number */}
                <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-indigo-600" />
                    <p>
                        <strong>Medical License Number:</strong> {doctor.medicalLicenceNumber}
                    </p>
                </div>

                {/* Consultation Types */}
                <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-indigo-600" />
                    <p>
                        <strong>Consultation Types:</strong> {doctor.consultationType.join(", ")}
                    </p>
                </div>

                {/* Consultation Fee */}
                <div className="flex items-center space-x-2">
                    <IndianRupee className="w-5 h-5 text-indigo-600" />
                    <p>
                        <strong>Consultation Fee:</strong> ₹ {doctor.consultationFee}
                    </p>
                </div>
            </div>

            {/* Book Appointment Button */}
            <div className="mt-6 flex justify-center">
                <button
                    onClick={() => navigate("/booking", { state: { doctorId, doctor } })}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 shadow-md transition-all"
                >
                    Book Appointment
                </button>
            </div>

            {/* Rating and Review Section */}
            <div className="mt-8 border-t pt-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Reviews & Ratings</h3>

                {/* Add Review Form */}
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                    <h4 className="text-lg font-semibold mb-4 text-gray-700">Write a Review</h4>

                    {/* Star Rating Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
                        <div className="flex space-x-1">{renderStars(rating, true)}</div>
                        {rating > 0 && (
                            <p className="text-sm text-gray-600 mt-1">
                                You rated: {rating} star{rating !== 1 ? "s" : ""}
                            </p>
                        )}
                    </div>

                    {/* Review Text Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                        <textarea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="Share your experience with this doctor..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                            rows={4}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmitReview}
                        disabled={isSubmitting || rating === 0 || review.trim() === ""}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all flex items-center space-x-2"
                    >
                        <Send className="w-4 h-4" />
                        <span>{isSubmitting ? "Submitting..." : "Submit Review"}</span>
                    </button>
                </div>

                {/* Existing Reviews */}
                <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-700">Patient Reviews ({existingReviews.length})</h4>

                    {existingReviews.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review!</p>
                    ) : (
                        existingReviews.map((reviewItem) => (
                            <div key={reviewItem._id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                                <div className="flex items-start space-x-4">
                                    <img
                                        src={reviewItem.userId.profileIMG || reviewItem.userId.profileImage}
                                        alt={reviewItem.userId.name}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h5 className="font-semibold text-gray-800">{reviewItem.userId.name}</h5>
                                            <span className="text-sm text-gray-500">{formatDate(reviewItem.createdAt)}</span>
                                        </div>

                                        <div className="flex items-center mb-3">
                                            {renderStars(reviewItem.rating)}
                                            <span className="ml-2 text-sm text-gray-600">{reviewItem.rating}/5</span>
                                        </div>

                                        <p className="text-gray-700 leading-relaxed">{reviewItem.comment}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default UserSideDoctorDetails
