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
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { useLocation } from 'react-router-dom';
import Update from '../../components/update/Update';

export default function Profile() {


  const [openUpdate, setOpenUpdate] = useState(false);

  const {currentUser} = useContext(AuthContext);


  // na ovaj nacin smo uzeli treci element iz linka, odnosno userID
  const userId = useLocation().pathname.split("/")[2];


  // getamo podatke o useru
  const {isLoading, error, data} = useQuery(["user"], () =>
  makeRequest.get("/users/find/" + userId).then((res)=> {
    return res.data;
  })
  );

  // getamo followere usera
  const {isLoading: loadingFollowers, data: relationshipData} = useQuery(["relationship"], () =>
  makeRequest.get("/relationships?followedUserId=" + userId).then((res)=> {
    return res.data;
  })
  );

  // console.log(relationshipData);

  const queryClient = useQueryClient();

  const mutation = useMutation((following) => {
    // ukoliko smo lajkovali izvrsit ce se post metoda iz likes controllera
    if(following) return makeRequest.delete('/relationships?userId=' + userId);
    // a ukoliko smo izbrisali like izvrsit ce se delete metoda iz likes
    return makeRequest.post("/relationships", {userId: userId});
    // uzimamo post.id kojeg dobivamo u funkciju Post kao argument
  },
  {
    onSuccess: () => { 
      // invalidate and refatch
      queryClient.invalidateQueries(["relationship"])
     },
  }
  );


  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id)); // ovo saljemo kao argument mutate funkciji, koja to prima u vidu parametra
  }

  // isLoading mozemo koristiti i za cijeli return

  // console.log(data);

  return (
    <div className="profile">
      {isLoading ? (
        "loading"
      ) : (
        <>
      <div className="images">
        <img src={isLoading ? "očitava se" : "/upload/" + data.coverPhoto} alt='' className='cover' />
        <img src={isLoading ? "očitava se" : "/upload/" + data.profilePhoto} alt='' className='profilePic' />
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
            {isLoading ? "očitava se" : currentUser.id === data.id ? 
            ( <button onClick={() => setOpenUpdate(true)}>Edit</button> ) : 
            // ukoliko user prati korisnicki profil sa specificnim ID-em ispisat ce mu followed, a ukoliko ne ispisat ce mu follow
            ( <button onClick={handleFollow}>{
              relationshipData.includes(currentUser.id) ? 
              "Followed" : 
              "Follow"}</button> 
            )}
          </div>
          <div className="right">
            <EmailOutlinedIcon/>
            <MoreVertIcon/>
          </div>
        </div>
        {/* prosljeđujemo u posts userId, odnosno kako bismo u slucaju da je korisnik na specificnom profilu mogli vratiti samo njegove postove */}
        <Posts userId = {userId}/>
      </div>
        </>
        )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data}/>}
    </div>
  )
}
