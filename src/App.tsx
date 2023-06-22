import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [images, setImages] = useState(0)

  useEffect(() => {


    const fetchImages = async () => {
      const images = await axios.get('https://api.giphy.com/v1/gifs/search', {
        params: {
          q: 'cats',
          api_key: '',
          limit: 25,
          offset: 0,
        }
      })

      console.log(images.data);
    }

    fetchImages();
  }, [])

  return (
    <>
      <h1>Vite + React</h1>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
