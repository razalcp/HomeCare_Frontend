import { CDN_URL } from '../utils/constant'
import UserContext from '../utils/UserContext'
import { useContext } from 'react'

const ResturantCard = (resData) => {

  const { loggedInUser } = useContext(UserContext)
  // console.log(resData);

  const { cuisines, cloudinaryImageId, name, sla, avgRating, costForTwo } = resData?.resData



  return (
    <div className='m-4 p-4 w-[230px] h-[370px] rounded-lg shadow-xl bg-gray-100 hover:bg-gray-200'>
      <img src={CDN_URL + cloudinaryImageId} className="h-[150px] w-[280px] rounded-lg" />
      <h3 className="font-bold py-4 text-lg">{name}</h3>
      <h4>{cuisines[0]},{cuisines[1]}</h4>
      <h4>{avgRating} Stars</h4>
      <h4>{costForTwo}</h4>
      <h4>{sla.deliveryTime} minutes</h4>
      <h3>User : {loggedInUser}</h3>

    </div>
  )
}

export const withPromotedLabel = (ResturantCard) => {
  return (props) => {


    return (
      <div>
        <label className="absolute bg-black text-white m-2 p-2 rounded-lg">{props.resData.aggregatedDiscountInfoV3.header}</label>

        <ResturantCard {...props} />

      </div>
    )
  }
}

export default ResturantCard