// Write your code here

import {Component} from 'react'
import './index.css'
import AppointmentItem from '../AppointmentItem'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'

class Appointments extends Component{
    state={appointmentInput:'',
    dateInput:'',
    appointmentsList:[],
    clickedStarred:false,
    }

    toggleIsStarred=(id)=>{
        this.setState(prevState=>(
            {appointmentsList:prevState.appointmentsList.map(each=>{
                if(each.id===id){
                    return {...each,isStarred:!each.isStarred}
                }
                return each
            })
            }))
    }
    
    onClickAdd=event=>{
        event.preventDefault()
        const {appointmentInput,dateInput}=this.state
        const formattedDate = dateInput ? format(new Date(dateInput),'dd MMMM yyyy, EEEE') : ''
        const newAppointment={
            id:uuidv4,
            title:appointmentInput,
            date:formattedDate,
            isStarred:false,
        }
        this.setState(prevState=>({
            appointmentsList:[...prevState.appointmentsList, newAppointment],
            appointmentInput:'',
            dateInput:''
        }))
    }

    onChangeTitle=event=>{
        this.setState({appointmentInput:event.target.value})
    }

    onChangeDate=event=>{
        this.setState({dateInput: event.target.value})
    }

    onClickStarred=()=>{
        const {appointmentsList,clickedStarred}=this.state
        if(clickedStarred){
            return appointmentsList.filter(appointment=>(appointment.isStarred===true))
        }
        else{
            return appointmentsList
        }
        
    }

    onStarred=()=>{
        const {clickedStarred}=this.state
        this.setState({clickedStarred:!clickedStarred})

    }

    render(){
        const {appointmentInput,dateInput,clickedStarred}=this.state
        const isStarredAppointment=clickedStarred ? "active" : "non-active"
        const getStarredAppointments=this.onClickStarred()
        return(
            <div className="bg-container">
            <div className="appointment-container">
            <div className="header">
            <form className="form" onSubmit={this.onClickAdd}>
            <div>
            <h1 className="heading">Add Appointment</h1>
            <label className="title" htmlFor="titleInput">TITLE</label><br/>
            <input type="text" className="input-text" id="titleInput" placeholder="Title" onChange={this.onChangeTitle} value={appointmentInput}/>
            <label className="date" htmlFor="dateInput">DATE</label><br/>
            <input type="date" className="date-text" id="dateInput" onChange={this.onChangeDate} value={dateInput}/>
            <button className="add-btn" type="submit">Add</button>
            </div>
            </form>
            <img src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png" className="image" alt="appointments"/>
            </div>
            <hr className="line"/>
            <div className="footer">
            <h1 className="sub-heading">Appointments</h1>
            <button className={isStarredAppointment} onClick={this.onStarred}>Starred</button>
            <ul className="appointments-list">
            {getStarredAppointments.map(eachAppointment=>(
                <AppointmentItem key={eachAppointment.id} appointmentDetails={eachAppointment} toggleIsStarred={this.toggleIsStarred}/>
            ))}
            </ul>
            </div>
            </div>
            </div>
        )
    }
}
export default Appointments
