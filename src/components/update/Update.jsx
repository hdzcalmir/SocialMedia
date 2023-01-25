import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { makeRequest } from "../../axios";
import "./update.scss";

function Update({setOpenUpdate, user}) {

    const [cover, setCover] = useState(null);
    const [profile, setProfile] = useState(null);
    const [texts, setTexts] = useState({
        name: "",
        city: "",
        website: ""
    });

    // console.log(cover);

    const upload = async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await makeRequest.post("/upload", formData);
            return res.data;
        } catch(err) {
            console.log(err);
        }
    }

    // setamo unesene podatke koje saljemo u backend, ovo je automatizovani proces koristeci state
    const handleChange = (e) => { 
        setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
     };

     const queryClient = useQueryClient();

     const mutation = useMutation(
        (user) => {
            return makeRequest.put("/users", user);
        },
        {
            onSuccess: () => {
                // ponovo getaj podatke iz db
                queryClient.invalidateQueries(["user"]);
            }
        }
     )

     const handleUpdate = async (e) => { 
        e.preventDefault();
        let coverUrl;
        let profileUrl;

        coverUrl = cover ? await upload(cover) : user.coverPhoto;
        profileUrl = profile ? await upload(profile) : user.profilePhoto;

        mutation.mutate({...texts, coverPhoto: coverUrl, profilePhoto: profileUrl});
        setOpenUpdate(false);
      }

  return (
    <div className="update">Update
    <form>
        <input type="file" onChange={e => setCover(e.target.files[0])}/>
        <input type="file" onChange={e => setProfile(e.target.files[0])} />
        <input type="text" name="name" onChange={handleChange}/>
        <input type="text" name="city" onChange={handleChange}/>
        <input type="text" name="website" onChange={handleChange}/>
        <button onClick={handleUpdate}>Update</button>
    </form>
    {/* ukoliko direktno samo stavimo state da se seta na klik on ce se odmah po renderu stranice odraditi, zato je pravilnije to odraditi
    preko funkcije, odnosno na klik izvrsava se funkcija koja poziva state setOpenUpdate */}
    <button onClick={() => setOpenUpdate(false)}>X</button>
    </div>
  )
}

export default Update;