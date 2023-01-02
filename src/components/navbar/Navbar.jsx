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
import { useContext } from 'react';
import { DarkModeContext } from '../../context/darkModeContext';
import { AuthContext } from '../../context/authContext';


function Navbar() {

  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="left">
        <Link to='/' style={{textDecoration:"none"}}>
        <span>polosocial.</span>
        </Link>
        <HomeRoundedIcon/>
        {darkMode === true ? <WbSunnyRoundedIcon onClick={toggle}/> : <NightlightRoundedIcon onClick={toggle}/>}
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
          <img src={currentUser.profilePic} alt="" />
          <span>{currentUser.name}</span>
        </div>
      </div>
    </div>
  )
}

export default Navbar