import  { useEffect, useState } from 'react';
import useDrivePicker from 'react-google-drive-picker'
import axios from 'axios'
import initSqlJs from "sql.js"
import Accounts from './components/Accounts';
import Buckets from './components/Buckets';
import { Container, Tab, Tabs, Navbar, Button } from 'react-bootstrap'
import { ArrowClockwise, Bucket, BucketFill, bucketFill, FileEarmarkText } from 'react-bootstrap-icons'

function App() {
  const [db, setDb] = useState(null);
  const [openPicker, authResponse] = useDrivePicker();  
  const [fileId, setFileId] = useState(null)
  const [buckets, setBuckets] = useState(null)
  const [bucketCats, setBucketCats] = useState(null)
  const [accounts, setAccounts] = useState(null)
  const [view, setView] = useState("buckets")
  const [lastUpdated, setLastUpdated] = useState(null)

  const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

  // const customViewsArray = [new google.picker.DocsView()]; // custom view
  const handleOpenPicker = () => {
    openPicker({
      clientId: process.env.REACT_APP_CLIENT_ID,
      developerKey: process.env.REACT_APP_DEVELOPER_KEY,
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
      
      const newAccounts = db.exec("SELECT id, name, balance, kind FROM account WHERE closed = 0")[0].values
      setAccounts(newAccounts)
      localStorage.setItem("accounts", JSON.stringify(newAccounts))

      setLastUpdated(new Date())
      localStorage.setItem('lastUpdated', JSON.stringify(new Date()))
    }
  }, [db])

  useEffect(() => {
    if(localStorage.getItem('buckets')) {
      setBuckets(new Map(JSON.parse(localStorage.getItem('buckets'))))
    }
    if(localStorage.getItem('bucketCats')) {
      setBucketCats(JSON.parse(localStorage.getItem('bucketCats')))
    }
    if(localStorage.getItem('accounts')) {
      setAccounts(JSON.parse(localStorage.getItem('accounts')))
    }
    if(localStorage.getItem('lastUpdated')) {
      setLastUpdated(new Date(JSON.parse(localStorage.getItem('lastUpdated'))))
    }
  }, [])
  
  if(!buckets || !bucketCats || !accounts) {
    return (
      <div>
          <button onClick={() => handleOpenPicker()}>Open Picker</button>
      </div>
    );
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand><Bucket color="white" style={{ position: "relative", bottom: 2 }} /> Buckets Viewer</Navbar.Brand>
          <div style={{ textAlign: "right" }}>
            <Button variant="light"><ArrowClockwise /> Reload</Button>{' '}
            <Button variant="light" onClick={() => handleOpenPicker()}><FileEarmarkText /> Select New File</Button>
          </div>
        </Container>
      </Navbar>
      <Container>
        <br /><br />
        <Tabs activeKey={view} onSelect={(k) => setView(k)}>
          <Tab eventKey="buckets" title="Buckets">
            <Buckets buckets={buckets} bucketCats={bucketCats} currency={currency} />
          </Tab>
          <Tab eventKey="accounts" title="Accounts">
            <Accounts accounts={accounts} currency={currency} />
          </Tab>
        </Tabs>
        { lastUpdated ? <p><br />Last updated { lastUpdated.toString() }</p> : null }
      </Container>
    </div>
  )
}

export default App;