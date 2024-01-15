import {Component} from 'react'
import './index.css'

class AppointmentItem extends Component {
  render() {
    const {appointmentLists, toggleFavorite} = this.props
    const {id, title, date, isFavorite} = appointmentLists

    const starClick = () => {
      toggleFavorite(id)
    }

    const starImg = isFavorite
      ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

    return (
      <li key={id}>
        <p>{title}</p>
        <button
          type="button"
          onClick={starClick}
          className="btn-stop"
          data-testid="star"
        >
          <img src={starImg} alt="star" />
        </button>

        <p>{date}</p>
      </li>
    )
  }
}

export default AppointmentItem
