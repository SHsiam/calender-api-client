import GoogleLogin from '@leecheuk/react-google-login';
import { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import axios from 'axios';


function App() {
  const clientId="632642552532-vgm8vdur0ql3nbt52d2qfn0ajaqrkqdd.apps.googleusercontent.com";

  useEffect(()=>{
    gapi.load('client:auth2',()=>{
      gapi.auth2.init({clientId:clientId})
    })
  },[])
const responseGoogle =(response)=>{
  console.log(response);
  const {code} =response;
  axios.post('http://localhost:3000/create-tokens',{code})
  .then(response=>{
    console.log(response.data);
    setSignedIn(true)
  })
  .catch(error=>console.log(error.message))
}

const responseError=(error)=>{
  console.log(error);
}

const handleSubmit =(e)=>{
  e.preventDefault();
  console.log(summary,description,location,startDateTime,endDateTime);
  axios.post('http://localhost:3000/create-event',{summary,description,location,startDateTime,endDateTime})
  .then(response=>{
    console.log(response.data);
  })
  .catch(error=>console.log(error.message))
}



const [summary,setSummary]=useState('');
const [description,setDescription]=useState('');
const [location,setLocation]=useState('');
const [startDateTime,setStartDateTime]=useState('');
const [endDateTime,setEndDateTime]=useState('');
const[signedIn, setSignedIn]=useState(false);
  return (
    <>
      <div>
        <div className="App">
          <h1>Google Calendar API</h1>
        </div>
        {
          !signedIn ? (
          <div>
            <GoogleLogin
            clientId={clientId}
            buttonText="Sign in Authorize Calender"
            onSuccess={responseGoogle}
            onFailure={responseError}
            cookiePolicy={'single_host_origin'}
            //This is important
            responseType="code"
            accessType="offline"
            scope="openid email profile https://www.googleapis.com/auth/calendar"
            />
          </div>
          ) : (
          <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="summary">Summary</label>
            <br />
            <input type="text" id='summary' value={summary} onChange={e=>setSummary(e.target.value)} />
            <br />

            <label htmlFor="description">Description</label>
            <br />
            <textarea type="text" id='description' value={description} onChange={e=>setDescription(e.target.value)} />
            <br />
            <label htmlFor="location">Location</label>
            <br />
            <input type="text" id='location' value={location} onChange={e=>setLocation(e.target.value)} />
            <br />
            <label htmlFor="startdatetime">Start Date Time</label>
            <br />
            <input type="datetime-local" id='startdatetime' value={startDateTime} onChange={e=>setStartDateTime(e.target.value)} />
            <br />
            <label htmlFor="enddatetime">End Date Time</label>
            <br />
            <input type="datetime-local" id='enddatetime' value={endDateTime} onChange={e=>setEndDateTime(e.target.value)} />
            <br />
            <button type='submit'>Create Event</button>
          </form>
        </div>
        )
        }
        
       </div>
    </>
  )
      }

export default App
