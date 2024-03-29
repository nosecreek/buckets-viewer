import { useEffect, useState } from 'react'
import useDrivePicker from './react-google-drive-picker'
import axios from 'axios'
import initSqlJs from 'sql.js'
import Accounts from './components/Accounts'
import Buckets from './components/Buckets'
import Reload from './components/Reload'
import Transactions from './components/Transactions'
import { Container, Tab, Tabs, Navbar, Button, Alert } from 'react-bootstrap'
import { Bucket, FileEarmarkText } from 'react-bootstrap-icons'
import './App.css'
import GoogleButton from './components/GoogleButton'
import DropboxButton from './components/DropboxButton'

function App() {
  const [db, setDb] = useState(null)
  const [openPicker, authResponse] = useDrivePicker()
  const [fileId, setFileId] = useState(null)
  const [fileSize, setFileSize] = useState(null)
  const [buckets, setBuckets] = useState(null)
  const [bucketCats, setBucketCats] = useState(null)
  const [accounts, setAccounts] = useState(null)
  const [bucketTransactions, setBucketTransactions] = useState(null)
  const [accountTransactions, setAccountTransactions] = useState(null)
  const [view, setView] = useState('buckets')
  const [transactionView, setTransactionView] = useState(null) //null or [transaction type(bucket/account), bucket/account id, name, balance]
  const [lastUpdated, setLastUpdated] = useState(null)
  const [reloadToken, setReloadToken] = useState(null)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [error, setError] = useState(null)
  const [provider, setProvider] = useState(null)
  const [loadDropbox, setLoadDropbox] = useState(false)

  const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })
  const dateFormat = { year: 'numeric', month: 'long', day: 'numeric' }

  //If we have an auth token, load the DB from Google Drive
  useEffect(() => {
    const loadDB = async (response) => {
      const uInt8Array = new Uint8Array(response.data)
      const SQL = await initSqlJs({
        locateFile: (file) =>
          `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
      })
      setDb(new SQL.Database(uInt8Array))
    }

    const getGoogleDriveFile = async () => {
      setError(null)
      const token = authResponse ? authResponse.access_token : reloadToken
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-sqlite3'
        },
        responseType: 'arraybuffer',
        onDownloadProgress: (progressEvent) => {
          setDownloadProgress(
            Math.floor((progressEvent.loaded / fileSize) * 100)
          )
        }
      }
      const response = await axios
        .get(
          `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&supportsAllDrives=true`,
          config
        )
        .catch((e) => {
          setError(e.message)
          setFileId(null)
          setBuckets(null)
          setProvider(null)
          localStorage.clear()
        })
      localStorage.setItem('fileId', fileId)
      await loadDB(response)
    }

    const getDropboxFile = async () => {
      setError(null)
      const config = {
        headers: {
          'Content-Type': 'application/x-sqlite3'
        },
        responseType: 'arraybuffer',
        onDownloadProgress: (progressEvent) => {
          setDownloadProgress(
            Math.floor((progressEvent.loaded / fileSize) * 100)
          )
        }
      }
      const response = await axios.get(`${fileId}`, config).catch((e) => {
        setError(e.message)
        setFileId(null)
        setBuckets(null)
        setProvider(null)
        setLoadDropbox(false)
        localStorage.clear()
      })

      setLoadDropbox(false)
      await loadDB(response)
    }

    if (provider === 'Google' && (authResponse || reloadToken) && fileId) {
      getGoogleDriveFile()
    } else if (provider === 'Dropbox' && loadDropbox && fileId) {
      console.log('loading dropbox file')
      getDropboxFile()
    }
  }, [authResponse, reloadToken, fileId, fileSize, loadDropbox, provider])

  //DB Queries - Saved to Local Storage and State
  useEffect(() => {
    if (db) {
      try {
        const newBuckets = db
          .exec(
            'SELECT id, name, balance, group_id FROM bucket WHERE kicked = 0'
          )[0]
          .values.reduce(
            (entryMap, e) =>
              entryMap.set(e[3], [...(entryMap.get(e[3]) || []), e]),
            new Map()
          )
        setBuckets(newBuckets)
        localStorage.setItem('buckets', JSON.stringify(Array.from(newBuckets)))

        const newBucketCats = db.exec('SELECT id, name FROM bucket_group')[0]
        setBucketCats(newBucketCats)
        localStorage.setItem('bucketCats', JSON.stringify(newBucketCats))

        const newAccounts = db.exec(
          'SELECT id, name, balance, kind FROM account WHERE closed = 0'
        )[0].values
        setAccounts(newAccounts)
        localStorage.setItem('accounts', JSON.stringify(newAccounts))

        const newBucketTransactions = db.exec(
          'SELECT id, bucket_id, posted, memo, amount FROM bucket_transaction WHERE posted > date("now","-1 years")'
        )[0].values
        setBucketTransactions(newBucketTransactions)
        localStorage.setItem(
          'bucketTransactions',
          JSON.stringify(newBucketTransactions)
        )

        const newAccountTransactions = db.exec(
          'SELECT id, account_id, posted, memo, amount FROM account_transaction WHERE posted > date("now","-1 years")'
        )[0].values
        setAccountTransactions(newAccountTransactions)
        localStorage.setItem(
          'accountTransactions',
          JSON.stringify(newAccountTransactions)
        )

        setLastUpdated(new Date())
        localStorage.setItem('lastUpdated', JSON.stringify(new Date()))
      } catch (e) {
        setError(e.toString())
        setFileId(null)
        setBuckets(null)
        setDb(null)
        localStorage.clear()
      }
    }
  }, [db])

  //Retrieve Data from Local Storage
  useEffect(() => {
    if (localStorage.getItem('buckets')) {
      setBuckets(new Map(JSON.parse(localStorage.getItem('buckets'))))
    }
    if (localStorage.getItem('bucketCats')) {
      setBucketCats(JSON.parse(localStorage.getItem('bucketCats')))
    }
    if (localStorage.getItem('accounts')) {
      setAccounts(JSON.parse(localStorage.getItem('accounts')))
    }
    if (localStorage.getItem('bucketTransactions')) {
      setBucketTransactions(
        JSON.parse(localStorage.getItem('bucketTransactions'))
      )
    }
    if (localStorage.getItem('accountTransactions')) {
      setAccountTransactions(
        JSON.parse(localStorage.getItem('accountTransactions'))
      )
    }
    if (localStorage.getItem('lastUpdated')) {
      setLastUpdated(new Date(JSON.parse(localStorage.getItem('lastUpdated'))))
    }
    if (localStorage.getItem('fileId')) {
      setFileId(localStorage.getItem('fileId'))
    }
    if (localStorage.getItem('provider')) {
      setProvider(localStorage.getItem('provider'))
    } else if (localStorage.getItem('buckets')) {
      setProvider('Google') // users may have loaded a file from Google before Dropbox was supported
    }
  }, [])

  if (!fileId || error) {
    return (
      <>
        {error ? <Alert variant="danger">{error}</Alert> : null}
        <div
          style={{ height: '100vh' }}
          className="d-flex align-items-center justify-content-center"
        >
          <div style={{ textAlign: 'center' }}>
            <GoogleButton
              openPicker={openPicker}
              setFileSize={setFileSize}
              setFileId={setFileId}
              setProvider={setProvider}
            />
            <DropboxButton
              setFileSize={setFileSize}
              setFileId={setFileId}
              setProvider={setProvider}
              setLoadDropbox={setLoadDropbox}
            />
            <br />
            <br />
            <p>
              Welcome to Buckets Viewer. Use one of the buttons above to select
              your .buckets file.
            </p>
          </div>
        </div>
      </>
    )
  }

  if (!buckets || !bucketCats || !accounts) {
    return (
      <div
        style={{ height: '100vh', textAlign: 'center' }}
        className="d-flex align-items-center justify-content-center"
      >
        <div>
          <p>Loading {downloadProgress}%</p>
          <p>
            Progress bar stuck?{' '}
            <button
              onClick={() => {
                localStorage.clear()
                setFileId(null)
              }}
              className="link"
            >
              Click here
            </button>{' '}
            to start over.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <Bucket color="white" style={{ position: 'relative', bottom: 2 }} />{' '}
            Buckets Viewer
          </Navbar.Brand>
          <div style={{ textAlign: 'right' }}>
            <Reload
              accessToken={reloadToken}
              setAccessToken={setReloadToken}
              fileId={fileId}
              provider={provider}
              setLoadDropbox={setLoadDropbox}
            />{' '}
            <Button
              variant="light"
              onClick={() => {
                setFileId(null)
                setBuckets(null)
                setReloadToken(null)
                setProvider(null)
              }}
            >
              <FileEarmarkText /> Select New File
            </Button>
          </div>
        </Container>
      </Navbar>
      <Container>
        <br />
        <br />
        <Tabs
          activeKey={view}
          onSelect={(k) => {
            setView(k)
            setTransactionView(null)
          }}
        >
          <Tab eventKey="buckets" title="Buckets">
            {!transactionView || !transactionView[0] === 'bucket' ? (
              <Buckets
                buckets={buckets}
                bucketCats={bucketCats}
                setTransactionView={setTransactionView}
                currency={currency}
              />
            ) : (
              <Transactions
                transactionView={transactionView}
                setTransactionView={setTransactionView}
                transactions={bucketTransactions}
                currency={currency}
                dateFormat={dateFormat}
              />
            )}
          </Tab>
          <Tab eventKey="accounts" title="Accounts">
            {!transactionView || !transactionView[0] === 'account' ? (
              <Accounts
                accounts={accounts}
                setTransactionView={setTransactionView}
                currency={currency}
              />
            ) : (
              <Transactions
                transactionView={transactionView}
                setTransactionView={setTransactionView}
                transactions={accountTransactions}
                currency={currency}
                dateFormat={dateFormat}
              />
            )}
          </Tab>
        </Tabs>
        <div className="footer">
          {lastUpdated ? (
            <p>
              <br />
              Last loaded {lastUpdated.toString()}
            </p>
          ) : null}
          <p>
            &copy;2022 Dustin Lammiman.{' '}
            <a href="privacy.html">Privacy Policy</a>. This website is not
            associated with One Part Rain, LLC.
          </p>
        </div>
      </Container>
    </div>
  )
}

export default App
