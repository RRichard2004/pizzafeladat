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
    <div className="container text-center">
      <h1 className='mt-5 mb-5'>Pizzák</h1>
      {isFetchPending? (
      <div className="spinner-border"></div>)
      : 
      (<div className="flex-row d-flex flex-grow-0 flex-wrap">
        {pizzák.map(pizza => (
          <div key={pizza.id} className="card border p-2">
              <h2 className='text-muted'>Pizza neve: {pizza.name}</h2>
              <p>Gluténmentes-e: {pizza.isGlutenFree ? 'Igen' : 'Nem'}</p>
              <img height={200} src={pizza.kepURL} alt={pizza.name}/>
          </div>
        ))}
      </div>)}
    </div>
  );
}

export default App;
