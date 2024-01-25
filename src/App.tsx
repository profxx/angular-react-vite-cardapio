import { useState } from 'react';
import './App.css'
import { Card } from './components/card/card';
import { useFoodData } from './hooks/useFoodData';
import { CreateModal } from './components/create-modal/create-modal';

function App() {
  const { data } = useFoodData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(prev => !prev) ;
  }

  return (
      <div className='container'>
        <h1>Cardápio</h1>
        <div className="card-grid">
          {data?.map(foodData => 
                <Card 
                    title={foodData.title} 
                    image={foodData.image} 
                    price={foodData.price}
                />)}
        </div>
        {isModalOpen && <CreateModal closeModal={handleModalOpen}/>}
        <button onClick={handleModalOpen}>NOVO</button>
      </div>
  )
}

export default App
