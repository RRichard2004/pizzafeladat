import React, { useEffect, useState } from 'react';

function App() {
  const [pizzák, setPizza] = useState([]);
  const [isFetchPending, setFetchPending] = useState(false);

  useEffect(() => {
    const fileUrl = 'https://pizza.kando-dev.eu/Pizza';

    setFetchPending(true);

    fetch(fileUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setFetchPending(false);
        setPizza(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container">
      <h1 className='text-center mt-5 mb-5'>Pizzák</h1>
      {isFetchPending? (
      <div className="spinner-border"></div>)
      : 
      (<div className="row">
        {pizzák.map(pizza => (
          <div key={pizza.id} className="card">
              <h2 className='cart-subtitle'>Pizza neve: {pizza.name}</h2>
              <p>Gluténmentes-e: {pizza.isGlutenFree ? 'Igen' : 'Nem'}</p>
              <img src={pizza.kepURL} alt={pizza.name}/>
          </div>
        ))}
      </div>)}
    </div>
  );
}

export default App;
