import { Canvas } from '@react-three/fiber'
import Globe from './Globe'

function App() {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-[url('https://unpkg.com/three-globe/example/img/night-sky.png')]">
      <Canvas camera={{ position: [0, 0, 300] }}>
        <Globe />
      </Canvas>
    </div>
  )
}

export default App
