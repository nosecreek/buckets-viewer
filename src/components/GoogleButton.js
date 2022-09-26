import { Button } from 'react-bootstrap'
import { Google } from 'react-bootstrap-icons'

const GoogleButton = ({ openPicker, setFileSize, setFileId, setProvider }) => {
  // Use Google Drive Picker
  const handleOpenPicker = () => {
    openPicker({
      clientId: process.env.REACT_APP_CLIENT_ID,
      developerKey: process.env.REACT_APP_DEVELOPER_KEY,
      viewId: 'DOCS',
      // token: localStorage.getItem('auth') || null, // pass oauth token in case you already have one
      showUploadView: false,
      showUploadFolders: false,
      supportDrives: true,
      multiselect: true,
      viewMimeTypes: 'application/octet-stream',
      viewQuery: '*.buckets',
      customScopes: ['https://www.googleapis.com/auth/drive.file'],
      callbackFunction: (data) => {
        if (data.action === 'cancel') {
          console.log('User clicked cancel/close button')
        }
        if (data.action === 'picked') {
          setFileSize(data.docs[0].sizeBytes)
          setFileId(data.docs[0].id)
          localStorage.setItem('fileId', data.docs[0].id)
          localStorage.setItem('provider', 'Google')
          setProvider('Google')
        }
      }
    })
  }

  return (
    <Button
      size="lg"
      variant="danger"
      className="googleButton"
      onClick={() => handleOpenPicker()}
    >
      <Google /> Google Drive
    </Button>
  )
}

export default GoogleButton
