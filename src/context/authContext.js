import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";



export const AuthContext = createContext();

// ovdje kreiramo context API, a da bismo koristili ovaj context, treba nam ovaj provider kako bismo odradili wrap app.js u index.js
// jer moramo koristiti darkMode i toggle funkciju u nasim komponentama
// jer odradujemo wrap app.js u index.js mozemo koristiti sve sto smo naveli u value u returnu, a sada smo poslali darkMode i toggle, jer nam oni trebaju
// odnosno darkMode znaci trenutna vrijednost darkMode u localStorage, ako je ona true tema ce biti tamna i obrnuta
// a toggle nam sluzi da trenutacnu boolean vrijednost darkMode uzmemo te ce nam ta funkcija na odredjeni button ili slicno dodijeliti suprotnu
// vrijednost toj vrijednosti, te ako je tema bila svjetla klikom na to ce biti dark mode true i tema ce postati tamna
export const AuthContextProvider = ({ children }) => {
    // odradili smo JSON.parse kako bi nam vratilo boolean

    // a u useState smo stavili localStorage.getItem('darkMode') sto znaci da ce prilikom ulaska na stranicu provjeriti da li postoji varijabla
    // darkMode, ukoliko postoji uzet ce tu trenutnu vrijednost te varijable i na odnosu toga postavit temu tamnu/svjetlu a ukoliko ne postoji varijabla
    // u localStorage darkMode, to znaci da korisnik prethodno nije bio na stranici te ce mu po defaultu kreirati varijablu i dodijeliti joj 
    // vrijednost false, sto znaci da je po defaultu svjetla tema a korisnik klikom na specifican button moze promijeniti tu temu u tamnu, sto je
    // prethodno pojasnjeno
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || false);

    // ova funkcija seta state na odnosu unesenih podataka za prijavu i koristi te podatke za login
    const login = () => {
        // TODO
        setCurrentUser({
            id: 1,
            name: "Nermina Halilcevic",
            profilePic: "https://images.pexels.com/photos/1848565/pexels-photo-1848565.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        });
    }

    // JSON.parse vraca izvorni oblik

    // JSON.stringify pretvara u string, a ovo radimo jer ne mozemo u localstorage spremiti objekat, to mora biti string a zatim to ponovo
    // samo pretvorimo u objekat
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser))
    }, [currentUser]);


    return (
        // ovo znaci da cemo moci koristiti currentUser i login funkciju svugdje u nasoj aplikaciji
        <AuthContext.Provider value={{ currentUser, login }}>
            {children}
        </AuthContext.Provider>
    )

}