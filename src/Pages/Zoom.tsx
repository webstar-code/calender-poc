import { ZoomMtg } from '@zoomus/websdk'
import { useEffect } from 'react'

const ZoomPage = () => {
  useEffect(() => {
    // Global CDN, use source.zoom.us:
    ZoomMtg.setZoomJSLib('https://source.zoom.us/{VERSION_NUMBER}/lib', '/av')
    // loads dependent assets
    ZoomMtg.preLoadWasm()
    ZoomMtg.prepareWebSDK()
    // loads language files, also passes any error messages to the ui
    ZoomMtg.i18n.load('en-US')
    ZoomMtg.i18n.reload('en-US')
  }, []);



  return (
    <div>
      Zoom Page
    </div>
  )
}

export default ZoomPage;