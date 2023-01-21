import './post.scss';
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Comments from '../comments/Comments';
import moment from 'moment';

export const Post = ({post}) => {


  const [commentOpen, setCommentOpen] = useState(false);

  // temporary
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(99);

  const handleLike = () => { 
    setLiked(!liked);
    if(liked) {
    setLikes(likes - 1);
    }
    else {
      setLikes(likes + 1)
    }
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
        {liked ? <FavoriteOutlinedIcon onClick={handleLike}/> : <FavoriteBorderOutlinedIcon onClick={handleLike}/>}
        <span>{likes}</span>
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