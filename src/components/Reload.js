import { ArrowClockwise } from 'react-bootstrap-icons'
import { Button } from 'react-bootstrap'

const Reload = ({ setAccessToken, provider, setLoadDropbox }) => {
  const loadScript = (src) =>
    new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) return resolve()
      const script = document.createElement('script')
      script.src = src
      script.onload = () => resolve()
      script.onerror = (err) => reject(err)
      document.body.appendChild(script)
    })

  const handleReload = () => {
    if (provider === 'Dropbox') {
      setLoadDropbox(true)
    } else {
      loadScript('https://accounts.google.com/gsi/client').then(() => {
        const google = window.google
        const client = google.accounts.oauth2.initTokenClient({
          client_id: process.env.REACT_APP_CLIENT_ID,
          scope: 'https://www.googleapis.com/auth/drive.file',
          callback: (tokenResponse) => {
            setAccessToken(tokenResponse.access_token)
          }
        })

        client.requestAccessToken()
      })
    }
  }

  return (
    <Button variant="light" onClick={() => handleReload()}>
      <ArrowClockwise /> Reload
    </Button>
  )
}

export default Reload
