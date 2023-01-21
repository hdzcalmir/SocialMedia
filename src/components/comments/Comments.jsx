import { useContext } from 'react';
import './comments.scss';
import {AuthContext} from '../../context/authContext';
import { makeRequest } from '../../axios';
import { useQuery,  useMutation, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { useState } from 'react';


function Comments({postId}) {

  const [description, setDescription] = useState("");

const {currentUser} = useContext(AuthContext)

const { isLoading, error, data } = useQuery(['comments'], () => (
  makeRequest.get("/comments?postId=" + postId).then(res=>{
    return res.data;
  })
  // data u ovom predstavlja podatke koje dobijemo nazad
)
)

// console.log(data);

const queryClient = useQueryClient();

// koristimo mutation
// mutation.mutate() pozivamo ovu funkciju koja unos korisnika prima kao argumente zatim u istoj vracamo
// axios zahtjev u db u specifican path i saljemo nase unose, te na success, ukoliko se sve izvrsi koristeci
// queryClient.invalidateQueries(["posts"]) ponovo fetcujemo sve postove ukljucujuci i taj novi post
// tako isto na ovom mozemo koristiti i druge metode kao sto su put i delete
const mutation = useMutation((newComment) => {
  return makeRequest.post('/comments', newComment)
},
{
  onSuccess: () => { 
    // invalidate and refatch
    queryClient.invalidateQueries(["comments"])
   },
}
);

// ukoliko je async mora biti i await
const handleClick = async e => {
  e.preventDefault();
  // console.log(file, description);
  // saljemo argumente mutaciji, unos
  mutation.mutate({description, postId });
  // resetuje input polja
  setDescription('');

}
//Temporary
  // const comments = [
  //   {
  //     id: 1,
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
  //     name: "John Doe",
  //     userId: 1,
  //     profilePicture:
  //       "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 2,
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
  //     name: "Jane Doe",
  //     userId: 2,
  //     profilePicture:
  //       "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //   },
  // ];

  return (
    <div className='comments'>
        <div className="write">
            <img src={currentUser.profilePhoto} alt="" />
            <input type="text" value={description} placeholder='Write a creative comment..' onChange={e=> setDescription(e.target.value)}/>
            <button onClick={handleClick}>Post</button>
        </div>
        {/* ukoliko se ocitava prikazi loading ukoliko je ocitalo prikazi mi data */}
        {error ? "There is something wrong" : isLoading ? "loading" : data.map(comment =>(
            <div className="comment">
              <img src={comment.profilePhoto} alt="" />  
              <div className="info">
                <span>{comment.name}</span>
                <p>{comment.description}</p>
              </div>
              <span className='date'>{moment(comment.createdDate).fromNow()}</span>
            </div>
        ))
        }</div>
  )
}

export default Comments