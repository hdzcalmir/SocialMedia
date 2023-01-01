import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";



export const DarkModeContext = createContext();

// ovdje kreiramo context API, a da bismo koristili ovaj context, treba nam ovaj provider kako bismo odradili wrap app.js u index.js
// jer moramo koristiti darkMode i toggle funkciju u nasim komponentama
// jer odradujemo wrap app.js u index.js mozemo koristiti sve sto smo naveli u value u returnu, a sada smo poslali darkMode i toggle, jer nam oni trebaju
// odnosno darkMode znaci trenutna vrijednost darkMode u localStorage, ako je ona true tema ce biti tamna i obrnuta
// a toggle nam sluzi da trenutacnu boolean vrijednost darkMode uzmemo te ce nam ta funkcija na odredjeni button ili slicno dodijeliti suprotnu
// vrijednost toj vrijednosti, te ako je tema bila svjetla klikom na to ce biti dark mode true i tema ce postati tamna
export const DarkModeContextProvider = ({ children }) => {
    // odradili smo JSON.parse kako bi nam vratilo boolean

    // a u useState smo stavili localStorage.getItem('darkMode') sto znaci da ce prilikom ulaska na stranicu provjeriti da li postoji varijabla
    // darkMode, ukoliko postoji uzet ce tu trenutnu vrijednost te varijable i na odnosu toga postavit temu tamnu/svjetlu a ukoliko ne postoji varijabla
    // u localStorage darkMode, to znaci da korisnik prethodno nije bio na stranici te ce mu po defaultu kreirati varijablu i dodijeliti joj 
    // vrijednost false, sto znaci da je po defaultu svjetla tema a korisnik klikom na specifican button moze promijeniti tu temu u tamnu, sto je
    // prethodno pojasnjeno
    const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem('darkMode')) || false);

    const toggle = () => {
        setDarkMode(!darkMode);
    }

    useEffect(() => {
        localStorage.setItem('darkmode', darkMode)
    }, [darkMode]);


    return (
        <DarkModeContext.Provider value={{ darkMode, toggle }}>
            {children}
        </DarkModeContext.Provider>
    )

}