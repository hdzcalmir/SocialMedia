import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useState } from "react";
import {makeRequest} from '../../axios.js';
import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

const Share = () => {

  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");

  const upload = async () => {
    try {

      // moramo kreirati form data jer ne mozemo poslati fajl direktno
      const formData = new FormData();
      formData.append('file', file);
      const res = await makeRequest.post("/upload", formData);
      return res.data

    }catch(err) {
      console.log(err);
    }
  }

  // koristimo queryClient
  const queryClient = useQueryClient();

  // koristimo mutation
  // mutation.mutate() pozivamo ovu funkciju koja unos korisnika prima kao argumente zatim u istoj vracamo
  // axios zahtjev u db u specifican path i saljemo nase unose, te na success, ukoliko se sve izvrsi koristeci
  // queryClient.invalidateQueries(["posts"]) ponovo fetcujemo sve postove ukljucujuci i taj novi post
  // tako isto na ovom mozemo koristiti i druge metode kao sto su put i delete
  const mutation = useMutation((newPost) => {
    return makeRequest.post('/posts', newPost)
  },
  {
    onSuccess: () => { 
      // invalidate and refatch
      queryClient.invalidateQueries(["posts"])
     },
  }
  );

  // ukoliko je async mora biti i await
  const handleClick = async e => {
    e.preventDefault();
    let imgUrl = "";
    if(file) imgUrl = await upload();
    // console.log(file, description);
    // saljemo argumente mutaciji, unos
    mutation.mutate({description, img: imgUrl});
    // resetuje input polja
    setDescription('');
    setFile(null);
  
  }

  const {currentUser} = useContext(AuthContext)
  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
          <img
            src={currentUser.profilePhoto}
            alt=""
          />
          <input type="text" value={description} placeholder={`What's on your mind ${currentUser.name}?`} onChange={e=> setDescription(e.target.value)}/>
         </div>
         <div className="right">
          {/* na ovaj nacin cemo ispisati sliku odmah nakon uploada */}
          {/* ovo nam ispisuje sliku u pretpregledu iako je jos nismo upload */}
          {file && <img className="file" src={URL.createObjectURL(file)} alt=""/>}
         </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{display:"none"}} onChange={e=>setFile(e.target.files[0])}/>
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
