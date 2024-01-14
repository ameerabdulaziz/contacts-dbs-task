import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../context/AuthContext";

const HomePage = () => {
    let [contacts, setContacts] = useState([])
    let {authTokens, logoutUser} = useContext(AuthContext)

    useEffect(()=> {
        getContacts()
    }, [])


    let getContacts = async() =>{
        let response = await fetch('http://127.0.0.1:8000/api/contacts/', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        if ( response.status === 200 ){
            setContacts(data.results)
        } else if( response.statusText === 'Unauthorized'){
            logoutUser()
        }

    }
    return (
        <div>
            <h1>Contacts App</h1>
            <ul>
                {contacts.map(contact => (
                    <li key={contacts.indexOf(contact)}>{contact.name} - {contact.email}</li>
                ))}
            </ul>
        </div>
    )
}

export default HomePage