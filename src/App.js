import  { useEffect, useState } from 'react';
import useDrivePicker from 'react-google-drive-picker'
import axios from 'axios'


function App() {
  const [openPicker, authResponse] = useDrivePicker();  
  const [fileId, setFileId] = useState(null)  
  // const customViewsArray = [new google.picker.DocsView()]; // custom view
  const handleOpenPicker = () => {
    openPicker({
      clientId: "758483264841-9kmp9h0v8qghfn8e7d4k5mjg99d0fpn8.apps.googleusercontent.com",
      developerKey: "AIzaSyAmKw4RxJhq67-H-M2HkjoqibzJN5fzqds",
      viewId: "DOCS",
      // token: localStorage.getItem('auth') || null, // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      customScopes: ['https://www.googleapis.com/auth/drive.file'],
      viewMimeTypes: "application/octet-stream",
      // customViews: customViewsArray, // custom view
      callbackFunction: (data) => {
        if (data.action === 'cancel') {
          console.log('User clicked cancel/close button')
        }
        if(data.action === 'picked') {
          console.log(data)
          setFileId(data.docs[0].id)
          localStorage.setItem('fileId', data.docs[0].id);
        }
      },
    })
  }

  useEffect(()=>{
    if(authResponse && fileId) {
      const getFile = async () => {
        const config =  {
          headers: { Authorization: `Bearer ${authResponse.access_token}` }
        }
        const response = await axios.get(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, config)
        console.log(response)
      }
      console.log(authResponse, fileId)
      localStorage.setItem('auth', authResponse.access_token);
      getFile()
    }
    console.log(fileId, authResponse)
  }, [authResponse, fileId])
  
  return (
    <div>
        <button onClick={() => handleOpenPicker()}>Open Picker</button>
    </div>
  );
}

export default App;