// Write your code here
import './index.css'

const AppointmentItem=props=>{
    const {appointmentDetails,toggleIsStarred}=props
    const{id,title,date,isStarred}=appointmentDetails
    const starimgs=isStarred ? "https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png" : "https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png"
    const clickStarred=()=>{
        toggleIsStarred(id)
    }
    return (
        <li className="appointment-items-list">
        <div className="appointment-sub-container">
        <div className="heading">
        <p className="name">{title}</p>
        <button className="starBtn" type="button" onClick={clickStarred} data-testid="star">
        <img src={starimgs} alt="star" className="star-img"/>
        </button>
        </div>
        <p className="date-input">Date: {date}</p>
        </div>
        </li>
    )
}
export default AppointmentItem
