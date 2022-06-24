import  { useEffect, useState } from 'react';
import useDrivePicker from 'react-google-drive-picker'
import axios from 'axios'
import initSqlJs from "sql.js"

function App() {
  const [db, setDb] = useState(null);
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
          headers: { Authorization: `Bearer ${authResponse.access_token}`,
          'Content-Type': "application/x-sqlite3" },
        responseType: 'arraybuffer'
        }
        const response = await axios.get(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, config)
        const uInt8Array = new Uint8Array(response.data)
        const SQL = await initSqlJs({
          locateFile: file => `https://sql.js.org/dist/${file}`
        })
        setDb(new SQL.Database(uInt8Array));
        console.log(db.exec("SELECT balance FROM account WHERE id=1"))
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