import { Unity, useUnityContext } from 'react-unity-webgl'
import { useState, useEffect, useRef } from 'react'

export default function UnityComp() {
  const loadingStartTimeRef = useRef<number | null>(null)

  const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
    loaderUrl: '/build/Build.loader.js',
    dataUrl: '/build/Build.data.br',
    frameworkUrl: '/build/Build.framework.js.br',
    codeUrl: '/build/Build.wasm.br',
    streamingAssetsUrl: '/StreamingAssets',
  })

  useEffect(() => {
    if (unityProvider && !loadingStartTimeRef.current) {
      loadingStartTimeRef.current = Date.now()
      console.log('Unity start to load (unityProvider created)')
    }
  }, [unityProvider])

  useEffect(() => {
    if (loadingProgression > 0 && !loadingStartTimeRef.current) {
      loadingStartTimeRef.current = Date.now()
      console.log('Unity start to load (loadingProgression > 0)')
    }
  }, [loadingProgression])

  useEffect(() => {
    if (isLoaded && loadingStartTimeRef.current) {
      const endTime = Date.now()
      const totalTime = endTime - loadingStartTimeRef.current
      console.log(`Unity loaded，took: ${totalTime}ms`)
    }
  }, [isLoaded])

  useEffect(() => {}, [loadingProgression])

  const [myWidth, setMyWidth] = useState(200)

  function handleClick() {
    setMyWidth((oldVal) => oldVal + 200)
  }

  return (
    <div className="flex h-full w-full rounded-lg shadow-sm" style={{ padding: '16px' }}>
      {/* Empty static 3D visualization area */}
      <div style={{ width: `${myWidth}px`, height: '100%', background: 'blue' }}>
        <button onClick={handleClick}>change width</button>
      </div>
      <div className="h-full flex-1 bg-gray-100">
        <Unity unityProvider={unityProvider} className="h-full w-full" />
      </div>
    </div>
  )
}
