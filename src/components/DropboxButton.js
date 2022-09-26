import { Button } from 'react-bootstrap'

const DropboxButton = ({
  setFileSize,
  setFileId,
  setProvider,
  setLoadDropbox
}) => {
  const loadScript = (src) =>
    new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) return resolve()
      const script = document.createElement('script')
      script.setAttribute('src', src)
      script.setAttribute('id', 'dropboxjs')
      script.setAttribute('data-app-key', process.env.REACT_APP_DROPBOX_KEY)
      script.onload = () => resolve()
      script.onerror = (err) => reject(err)
      document.body.appendChild(script)
    })

  // Use Dropbox Chooser
  const handleOpenDropboxChooser = () => {
    loadScript('https://www.dropbox.com/static/api/2/dropins.js').then(() => {
      window.Dropbox.choose({
        extensions: ['.buckets'],
        linkType: 'direct',
        success: function (data) {
          if (data) {
            setFileSize(data[0].bytes)
            setFileId(data[0].link)
            localStorage.setItem('fileId', data[0].link)
            setProvider('Dropbox')
            localStorage.setItem('provider', 'Dropbox')
            setLoadDropbox(true)
          }
        }
      })
    })
  }

  return (
    <Button
      size="lg"
      variant="primary"
      className="dropboxButton"
      onClick={() => handleOpenDropboxChooser()}
    >
      Dropbox
    </Button>
  )
}

export default DropboxButton
