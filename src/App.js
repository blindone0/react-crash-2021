import React, { Suspense } from 'react'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Canvas, useLoader, useThree } from '@react-three/fiber'
import { OrbitControls, Stars } from "@react-three/drei";
import { Physics, usePlane, useBox, useSphere, useSpring } from "@react-three/cannon";
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'
import Moon from './components/Moon'
import Sun from './components/Sun'
import Navbar from './components/Navbar'
import Rplanet from './components/Rplanet'
import Bplanet from './components/Bplanet'
import Lplanet from './components/Lplanet'
import Mplanet from './components/Mplanet'
import { TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useFrame } from '@react-three/fiber'
import { ReactComponent as Telegram } from './imgs/Telegram_logo.svg';
import { ReactComponent as TikTok } from './imgs/TikTok-Logo.wine.svg';
import { ReactComponent as YouTube } from './imgs/YouTube-Logo.wine.svg';
import Email from './components/Email';
import { PayPalButton } from "react-paypal-button-v2";



function Saturn()  {
  useFrame(({clock}) => {
    // const a = clock.getElapsedTime()
    
    // console.log(a)
    myMesh.current.rotation.z = Math.sin(clock.getElapsedTime())  
  })
  const myMesh = React.useRef()
  const gltf = useLoader(GLTFLoader, 'Saturn.glb')
  return (
    <mesh
      ref={myMesh}
      scale={[0.05,0.05,0.05]}
      rotation={[0,0,-4]}
    >
    <primitive  object={gltf.scene}/>
    </mesh>
  )
}


function Plane() {
  const camera = useThree(state => state.camera)
  useFrame(({clock}) => {    

    camera.position.z = Math.sin(clock.getElapsedTime())
  })
	const [ref] = usePlane(() => ({
		rotation: [-Math.PI / 2, 0, 0],
	}));
	return (
		<mesh ref={ref} rotation={[-Math.PI / 2, 0, 8]}>
			<planeBufferGeometry attach="geometry" args={[100 , 100]} />
			<meshLambertMaterial rotation={[-Math.PI / 2, 0, 8]} attach="material" transparent={true} opacity={0} />
		</mesh>
	);
}

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()

    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setTasks(tasks.filter((task) => task.id !== id))
      : alert('Error Deleting This Task')
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }

  console.log(OrbitControls);




  return (
    <Router>
      <Suspense fallback={null}>
      	{/* <Canvas camera={{ fov: 35, zoom: 0.001 }}> */}
        <Canvas camera={{fov : 75 , near: 1, far: 10000, position : [100, 0, 0]}}>
		<OrbitControls />
		<Stars />
		<ambientLight intensity={0.5} />
		<spotLight position={[10, 15, 10]} angle={0.3} />
    {/* <Sun/> */}
		<Physics>
      <Saturn/>
			<Plane />
		</Physics>
	</Canvas>
  </Suspense>
      <div className='wrapp'>
        <h1 id='header'>Accurate Tarot Card Predictions by Expert Reader</h1>
      <div className="star"></div>
      <Navbar/>
      <Sun/>
      <Rplanet/>
      <Bplanet/>
      <Mplanet/>
      <Lplanet/>
      
      <div className='container testing'>
        
        <Moon/>
        <Email/>
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        
      
              <div className='logogroup'>
        <a className='logo-tk' href="https://tiktok.com/@shootingstarsgarden">
        <TikTok  className='logo-tk' />
        </a>

        <a className='logo-yt' href="https://youtube.com/@shootingstarsgardentarot327">
        <YouTube className='logo-yt'/>
        </a>
        <a className='logo-tg' href="https://t.me/kovinyovich">
        <Telegram className='logo-tg'/>
        </a>






      </div>
      <div>
        <PayPalButton
        amount="10"
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        onSuccess={(details, data) => {
          alert("Transaction completed by " + details.payer.name.given_name);
        }}

        options={{
          clientId: "kovinyovadasha@gmail.com"
        }}
      />
        </div>
      <p>Welcome to shootingstarsgarden, your trusted source for accurate tarot card predictions. Our expert readers have years of experience in tarot reading and can provide you with insightful and personalized readings that will help you gain clarity and perspective on your life's challenges.

Whether you're facing a difficult decision, feeling uncertain about your future, or just need guidance and support, our tarot card readings can provide you with the answers and insights you need to move forward with confidence.

At shootingstarsgarden, we believe that everyone deserves access to accurate and insightful tarot card readings. That's why we offer affordable and convenient readings that can be done online or over the phone. We also offer a satisfaction guarantee, so you can be confident that you're getting the best service possible.

Ready to discover what the future holds? Contact us now to book your tarot card reading with one of our expert readers. We look forward to helping you gain the clarity and insights you need to navigate life's challenges with confidence.</p>
        <Routes>
          <Route
            path='/'
            // element={
            //   // <>
            //   //   {showAddTask && <AddTask onAdd={addTask} />}
            //   //   {tasks.length > 0 ? (
            //   //     <Tasks
            //   //       tasks={tasks}
            //   //       onDelete={deleteTask}
            //   //       onToggle={toggleReminder}
            //   //     />
            //   //   ) : (
            //   //     'No Tasks To Show'
            //   //   )}
            //   // </>
            // }
          />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </div>
      </div>
    </Router>
  )
}

export default App
