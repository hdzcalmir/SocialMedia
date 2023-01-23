import './post.scss';
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import Comments from '../comments/Comments';
import moment from 'moment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { AuthContext } from '../../context/authContext';

export const Post = ({post}) => {


  const [commentOpen, setCommentOpen] = useState(false);

  const {currentUser} = useContext(AuthContext);

  const {isLoading, error, data} = useQuery(["likes", post.id], () =>
  makeRequest.get("/likes?postId=" + post.id).then((res)=> {
    return res.data;
  })
  );

  // ispisat ce nam prazne arrays jer nemamo nijedan lajk
// console.log(data);

  // temporary
  // const [liked, setLiked] = useState(false);
  // const [likes, setLikes] = useState(99);

  // const handleLike = () => { 
  //   setLiked(!liked);
  //   if(liked) {
  //   setLikes(likes - 1);
  //   }
  //   else {
  //     setLikes(likes + 1)
  //   }
  //  }

  const queryClient = useQueryClient();

  const mutation = useMutation((liked) => {
    // ukoliko smo lajkovali izvrsit ce se post metoda iz likes controllera
    if(liked) return makeRequest.delete('/likes?postId=' + post.id);
    // a ukoliko smo izbrisali like izvrsit ce se delete metoda iz likes
    return makeRequest.post("/likes", {postId: post.id});
    // uzimamo post.id kojeg dobivamo u funkciju Post kao argument
  },
  {
    onSuccess: () => { 
      // invalidate and refatch
      queryClient.invalidateQueries(["likes"])
     },
  }
  );


  const handleLike = ()=> { 
    // ovo nam vraca true ili false, ovisno od toga da li smo lajkovali post ili ne, odnosno da li je nas id u lajkovima tog posta
    mutation.mutate(data.includes(currentUser.id)); // ovo saljemo kao argument mutate funkciji, koja to prima u vidu parametra
    // liked, a on je true ukoliko smo lajkovali i false ukoliko nisamo
   }


  return (
  <div className='post'>
    <div className="container">
      <div className="user">
        <div className="userInfo">
          <img src={post.profilePhoto} alt="" />
          <div className="details">
            {/* color: inherit znaci da nece biti specificne boje reko, bice default */}
            <Link to={`/profile/${post.userId}`} style={{textDecoration:'none', color:'inherit'}}>
              <span className='name'>{post.name}</span>
              </Link>
              {/* moment nam ispisuje prije koliko je kreiran post */}
              <span className='date'>{moment(post.createdDate).fromNow()}</span>
          </div>
        </div>
        <MoreHorizIcon/>
      </div>
      <div className="content">
        <p>{post.description}</p>
        <img src={'upload/' + post.img} alt="" />
      </div>
      <div className="btns">
        <div className="btn">
        {isLoading ? "učitava se" : data.includes(currentUser.id) ? 
        <FavoriteOutlinedIcon style={{color:"red"}} onClick={handleLike}/>: 
        <FavoriteBorderOutlinedIcon onClick={handleLike} />}
        {/* <span>{likes}</span> */}
        <span>{isLoading ? "učitava se" : data.length}</span>
        </div>
        <div className="btn">
        <TextsmsOutlinedIcon onClick={() => setCommentOpen(!commentOpen)}/>
        <span>20</span>
        </div>
        <div className="btn">
          <ShareOutlinedIcon/>
          <span>33</span>
        </div>
      </div>
      {/* saljemo u posts jsx post id */}
      {commentOpen && <Comments postId={post.id}/>}
    </div>
  </div>
  )
}

export default Post;