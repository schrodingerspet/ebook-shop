import { Link } from 'react-router-dom'
import './TopBar.css'

function TopBar() {
  return (
    <div className="topbar">
      <div className="page-container-wide topbar__inner">
        <p>🎓 Student Offer: Flat 30% off on Web Development ebooks this week.</p>
        <div className="topbar__links">
          <Link to="/contact">Help Center</Link>
          <Link to="/about">About Project</Link>
        </div>
      </div>
    </div>
  )
}

export default TopBar
