import  { useEffect, useState } from 'react';
import useDrivePicker from 'react-google-drive-picker'
import axios from 'axios'
import initSqlJs from "sql.js"
import Accounts from './components/Accounts';
import Buckets from './components/Buckets';
import { Container, Tab, Tabs } from 'react-bootstrap'

function App() {
  const [db, setDb] = useState(null);
  const [openPicker, authResponse] = useDrivePicker();  
  const [fileId, setFileId] = useState(null)
  const [buckets, setBuckets] = useState(null)
  const [bucketCats, setBucketCats] = useState(null)
  const [view, setView] = useState("buckets")

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
      }
      console.log(authResponse, fileId)
      localStorage.setItem('auth', authResponse.access_token);
      getFile()
    }
    console.log(fileId, authResponse)
  }, [authResponse, fileId])

  useEffect(() => {
    if(db) {
      const newBuckets = db.exec("SELECT id, name, balance, group_id FROM bucket WHERE kicked = 0")[0].values
        .reduce(
          (entryMap, e) => entryMap.set(e[3], [...entryMap.get(e[3])||[], e]),
          new Map()
      )
      setBuckets(newBuckets)
      localStorage.setItem("buckets", JSON.stringify(Array.from(newBuckets)))
      const newBucketCats = db.exec("SELECT id, name FROM bucket_group")[0]
      setBucketCats(newBucketCats)
      localStorage.setItem("bucketCats", JSON.stringify(newBucketCats))
    }
  }, [db])

  useEffect(() => {
    if(localStorage.getItem('buckets')) {
      setBuckets(new Map(JSON.parse(localStorage.getItem('buckets'))))
    }
    if(localStorage.getItem('bucketCats')) {
      setBucketCats(JSON.parse(localStorage.getItem('bucketCats')))
    }
  }, [])
  
  if(!buckets || !bucketCats) {
    return (
      <div>
          <button onClick={() => handleOpenPicker()}>Open Picker</button>
      </div>
    );
  }

  return (
    <Container>
      <Tabs activeKey={view} onSelect={(k) => setView(k)}>
        <Tab eventKey="buckets" title="Buckets">
          <Buckets buckets={buckets} bucketCats={bucketCats} />
        </Tab>
        <Tab eventKey="accounts" title="Accounts">
          <Accounts />
        </Tab>
      </Tabs>
    </Container>
  )
}

export default App;