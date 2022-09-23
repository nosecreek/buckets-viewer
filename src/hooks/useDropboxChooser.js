import { useEffect } from 'react'

const useDropboxChooser = (appKey) => {
  useEffect(() => {
    const head = document.querySelector('head')
    const script = document.createElement('script')

    script.setAttribute(
      'src',
      'https://www.dropbox.com/static/api/2/dropins.js'
    )
    script.setAttribute('id', 'dropboxjs')
    script.setAttribute('data-app-key', appKey)
    head.appendChild(script)
  }, [appKey])
}

export default useDropboxChooser
