import './navbar.scss';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import NightlightRoundedIcon from '@mui/icons-material/NightlightRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar">
      <div className="left">
        <Link to='/' style={{textDecoration:"none"}}>
        <span>polosocial.</span>
        </Link>
        <HomeRoundedIcon/>
        <NightlightRoundedIcon/>
        <GridViewRoundedIcon/>
        <div className="search">
          <SearchRoundedIcon/>
          <input type="text" placeholder='search'/>
        </div>
      </div>
      <div className="right">
        <PersonRoundedIcon/>
        <EmailRoundedIcon/>
        <NotificationsRoundedIcon/>
        <div className="user">
          <img src="https://images.pexels.com/photos/1848565/pexels-photo-1848565.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
          <span>John Doe</span>
        </div>
      </div>
    </div>
  )
}

export default Navbar