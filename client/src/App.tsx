import React, {useEffect, useState} from 'react';
import './App.css';

function App() {
  const [metadata, setMetadata] = useState(0);

  useEffect(() => {
    fetch("/api/metadata").then(res => res.json()).then(data => {
      console.log(data);
      setMetadata(data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>Metadata {metadata}.</p>
      </header>
    </div>
  );
}

export default App;
