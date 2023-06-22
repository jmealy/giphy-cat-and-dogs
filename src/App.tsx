import { useState, useEffect } from 'react'
import { Image } from './types/image'
import { fetchImages } from './giphyApiService'
import Modal from '@mui/material/Modal';
import './App.css'

const ImageType = {
  CATS: 'cats',
  DOGS: 'dogs',
};

function App() {
  const [images, setImages] = useState<Image[]>([])
  const [page, setPage] = useState(1)
  const [imageType, setImageType] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')

  const selectImageType = async (imageType: string) => {
    const newImages = await fetchImages(imageType, 1);
    setImages(newImages);
    setImageType(imageType);
    setPage(1);
  }

  const loadMoreImages = async () => {
    const newImages = await fetchImages(imageType, page + 1);
    setImages([...images, ...newImages]);
    setPage(page + 1);
  }

  const openImageModal = (url: string) => {
    setModalOpen(true);
    setSelectedImage(url);
  }

  useEffect(() => {
  }, [])

  return (
    <>
      <div className="imageTypeSelect">
        <button onClick={() => selectImageType(ImageType.CATS)}>Show Me Cats 🐱</button>
        <button onClick={() => selectImageType(ImageType.DOGS)}>Show Me Dogs 🐶</button>
      </div>

      <div className="imageGrid">
        {
          images.map((image: Image) => (
            <img
              key={image.url}
              src={image.url}
              alt={`A cute animal gif`}
              onClick={() => openImageModal(image.originalUrl)}
            />
          ))
        }
      </div>

      {
        images.length > 0 && (
          <div className="pageSelect">
            <button onClick={() => loadMoreImages()}>Load More</button>
          </div>
        )
      }

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <div className="modalContents">
          <img src={selectedImage} alt={`A gif containing ${imageType}`} />
        </div>
      </Modal>
    </>
  )
}

export default App
