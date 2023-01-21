import Post from '../post/Post';
import './posts.scss';
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from '../../axios';


function Posts() {

  // na ovaj nacin putem react query-a dohvatamo podatke iz backenda

  // posts ovdje predstavlja naziv query-a, zatim saljemo request preko makeRequesta koji smo prethodno napravili axios.js u client strani
  // koji zapravo predstavlja request u db te mi samo na postoji request dodamo koji specificno path hocemo, a ovaj put nam treba posts, kao
  // sto smo i ranije spomenuli
  const { isLoading, error, data } = useQuery(['posts'], () => (
    makeRequest.get("/posts").then(res=>{
      return res.data;
    })
    // data u ovom predstavlja podatke koje dobijemo nazad
)
)

// veoma je slicno useState i useEffect, vraca nam isLoading, error i data

// dole u primjeru smo u slucaju errora ispisali something went wrong, zatim u slucaju da ocitava podatke napisali loading i kada dobijemo podatke
// ispisali iste preko map metode, identicno kao i sa laznim podacima

// a ostale postove ispisujemo u samom posts folderu
  
console.log(data);


  return (
    <div className='posts'>
        {error ? "Something went wrong!" : isLoading ? 'loading' : data.map(post=> (
            // ukoliko koristimo map metodu trebat ce nam key
            <Post post={post} key={post.id}/>
        ))}
    </div>
  )
}

export default Posts