import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {title: '', date: '', appointmentList: [], showStarred: false}

  getTitle = event => {
    this.setState({title: event.target.value})
  }

  getDate = event => {
    this.setState({date: event.target.value})
  }

  toggleFavorite = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isFavorite: !eachAppointment.isFavorite}
        }
        return eachAppointment
      }),
    }))
  }

  addAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const dates = format(new Date(date), 'dd MMMM yyyy, EEEE')
    const newList = {
      id: uuidv4(),
      title,
      date: dates,
      isFavorite: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newList],
      title: '',
      date: '',
    }))
  }

  toggleStarred = () => {
    this.setState(prevState => ({
      showStarred: !prevState.showStarred,
    }))
  }

  render() {
    const {title, date, appointmentList, showStarred} = this.state
    const filteredAppointments = showStarred
      ? appointmentList.filter(appointment => appointment.isFavorite)
      : appointmentList
    return (
      <div className="bg-con">
        <div className="main-con">
          <form className="appointment-con" onSubmit={this.addAppointment}>
            <h1>Add Appointment</h1>
            <div className="title-con">
              <label htmlFor="title">TITLE</label>
              <input
                type="text"
                id="title"
                onChange={this.getTitle}
                placeholder="Title"
                value={title}
              />
            </div>
            <div className="date-con">
              <label htmlFor="date">DATE</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={this.getDate}
              />
            </div>
            <div>
              <button type="submit" className="btn-add">
                Add
              </button>
            </div>
          </form>
          <div className="img-con">
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="img-con-inner"
            />
          </div>
          <hr className="hr-line" />
          <div className="appointment-list">
            <h1>Appointments</h1>
            <button type="button" onClick={this.toggleStarred}>
              Starred
            </button>

            <ul>
              {filteredAppointments.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentLists={eachAppointment}
                  toggleFavorite={this.toggleFavorite}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
