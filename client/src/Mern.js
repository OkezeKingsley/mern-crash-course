import './Mern.css'
import { useEffect, useState } from "react";
import Axios from 'axios'

function Mern(){

    const [listOfUsers, setListOfUsers] = useState([])

    const [name, setName] = useState("")
    const [age, setAge] = useState(0)
    const [username, setUserName] = useState("")

    useEffect(() => {
        //Axios will be used to handle the request from the frontend
        Axios.get("http://localhost:3001/getUsers").then((response) => {
           setListOfUsers(response.data) 
        })
    }, [])

    //This function is for sending post request to the database
    const createUser = () => {
        Axios.post("http://localhost:3001/createUser", {
            name, 
            age, 
            username
        }).then((response) => {
            setListOfUsers([...listOfUsers, {name, age, username}])
            alert('user created')
        })
    }

    return(
        <div>
            <div className="usersDisplay">
                {
                    listOfUsers.map((user) => (
                        <div>
                            <h1>Name: {user.name}</h1>
                            <h1>Age: {user.age}</h1>
                            <h1>Username: {user.username}</h1>
                        </div>
                    ))
                }
                
            </div>

            {/*Let's send some post request to the server*/}
            <div>
                <input type="text" placeholder="Name..." 
                onChange={(event) => {
                    setName(event.target.value)
                }}></input>
                <input type="number" placeholder="Number..."
                 onChange={(event) => {
                    setAge(event.target.value)
                }}
                ></input>
                <input type="text" placeholder="Userame..."
                 onChange={(event) => {
                    setUserName(event.target.value)
                }}
                ></input>
                <button onClick={createUser} className="btn">Create user</button>
            </div>




        </div>
    )
}

export default Mern;