import React, { Suspense } from 'react'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Canvas, useLoader } from '@react-three/fiber'
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


function Saturn()  {
  useFrame(({clock}) => {
    const a = clock.getElapsedTime()
    console.log(a)
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


function Earth() {
  const [earth] = useLoader(TextureLoader, [
    "2k_earth_daymap.jpg"
  ])
	const [ref, api] = useSphere(() => ({ mass: 1, position: [0, 2, 0] }));
	return (
		<mesh
			onClick={() => {
				api.velocity.set(0, 2, 0);
			}}
			ref={ref}
			position={[0, 2, 0]}
		>
      <sphereBufferGeometry attach="geometry"/>
			{/* <boxBufferGeometry attach="geometry" /> */}
			<meshLambertMaterial map={earth} />
		</mesh>
	);
}

function Plane() {
	const [ref] = usePlane(() => ({
		rotation: [-Math.PI / 2, 0, 0],
	}));
	return (
		<mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
			<planeBufferGeometry attach="geometry" args={[100 , 100]} />
			<meshLambertMaterial attach="material" transparent={true} opacity={0} />
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
      <div className="star"></div>
      <Navbar/>
      <Sun/>
      <Rplanet/>
      <Bplanet/>
      <Mplanet/>
      <Lplanet/>
      
      <div className='container testing'>
        
        <Moon/>
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Routes>
          <Route
            path='/'
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  'No Tasks To Show'
                )}
              </>
            }
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
