import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import "./App.css";

function App() {
  const [isLoading, setLoading] = useState(true);

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
      setLanguages(data.languages);
      setCountries(data.countries);
      setGenres(data.genres);
      setLoading(false);
    };
    retrieveMetadata();
  }, []);

  const handleClick = async () => {
    setLoading(true);
    const res = await fetch("/api/random_movie");
    const data = await res.json();
    console.log(data);
    setLoading(false);
  }

  return (
    <div className="App">
      <Select
        defaultValue={selectedLanguage}
        onChange={setSelectedLanguage}
        options={languages}
        isDisabled={isLoading}
        closeMenuOnSelect={true}
        isMulti={false}
        isClearable={true}
        isSearchable={true}
      />
      <Select
        defaultValue={selectedCountry}
        onChange={setSelectedCountry}
        options={countries}
        isDisabled={isLoading}
        closeMenuOnSelect={true}
        isMulti={false}
        isClearable={true}
        isSearchable={true}
      />
      <Select
        defaultValue={selectedGenre}
        onChange={setSelectedGenre}
        options={genres}
        isDisabled={isLoading}
        closeMenuOnSelect={true}
        isMulti={false}
        isClearable={true}
        isSearchable={true}
      />
      <Button
        variant="primary"
        disabled={isLoading}
        onClick={!isLoading ? handleClick : undefined}
      >
      Pick a Movie
      </Button>
    </div>
  );
}

export default App;
