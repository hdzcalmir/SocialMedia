import './profile.scss';
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts"
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { useLocation } from 'react-router-dom';

export default function Profile() {


  const {currentUser} = useContext(AuthContext);


  // na ovaj nacin smo uzeli treci element iz linka, odnosno userID
  const userId = useLocation().pathname.split("/")[2];


  // getamo podatke o useru
  const {isLoading, error, data} = useQuery(["user"], () =>
  makeRequest.get("/users/find/" + userId).then((res)=> {
    return res.data;
  })
  );

  // isLoading mozemo koristiti i za cijeli return

  console.log(data);

  return (
    <div className="profile">
      <div className="images">
        <img src={isLoading ? "očitava se" : data.coverPhoto} alt='' className='cover' />
        <img src={isLoading ? "očitava se" : data.profilePhoto} alt='' className='profilePic' />
      </div> 
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            {/* mozemo koristit fontSize kao u primjerima ispod za velicinu mui ikona */}
          <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>{isLoading ? "očitava se" : data.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon/>
                <span>BiH</span>
              </div>
              <div className="item">
                <LanguageIcon/>
                <span>{isLoading ? "očitava se" : data.website}</span>
              </div>
            </div>
            {isLoading ? "očitava se" : currentUser.name === data.name ? <button>Edit</button> : <button>Follow</button>}
          </div>
          <div className="right">
            <EmailOutlinedIcon/>
            <MoreVertIcon/>
          </div>
        </div>
        <Posts/>

      </div>
    </div>
  )
}
