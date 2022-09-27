import { Button } from 'react-bootstrap'

const DropboxButton = ({
  setFileSize,
  setFileId,
  setProvider,
  setLoadDropbox
}) => {
  
  // Replace with icon from react-bootstrap-icons when available
  const Dropbox = (({
    color, size, title, ...rest
  }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        width="1em"
        height="1em"
        fill="#fff"
      >
        {title ? <title>{title}</title> : null}
  
        <path d="M8.01 4.555 4.005 7.11 8.01 9.665 4.005 12.22 0 9.651l4.005-2.555L0 4.555 4.005 2 8.01 4.555Zm-4.026 8.487 4.006-2.555 4.005 2.555-4.005 2.555-4.006-2.555Zm4.026-3.39 4.005-2.556L8.01 4.555 11.995 2 16 4.555 11.995 7.11 16 9.665l-4.005 2.555L8.01 9.651Z"/>
      </svg>
    )
  })

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
      <Dropbox /> Dropbox
    </Button>
  )
}

export default DropboxButton
