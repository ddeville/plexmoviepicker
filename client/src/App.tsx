import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import './App.css';

function App() {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    const retrieveMetadata = async () => {
      const res = await fetch("/api/metadata");
      const data = await res.json();
      setLanguages(data.languages.map((language: any) => language.title));
      setCountries(data.countries.map((country: any) => country.title));
      setGenres(data.genres.map((genre: any) => genre.title));
    };
    retrieveMetadata();
  }, []);

  return (
    <div className="App">
      <Select
        defaultValue={selectedLanguage}
        onChange={setSelectedLanguage}
        options={languages}
      />
      <Select
        defaultValue={selectedCountry}
        onChange={setSelectedCountry}
        options={countries}
      />
      <Select
        defaultValue={selectedGenre}
        onChange={setSelectedGenre}
        options={genres}
      />
    </div>
  );
}

export default App;
