import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import "./App.css";

function App() {
  const [isLoading, setLoading] = useState(true);

  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState<null | {value: string, label: string}>(null);

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState<null | {value: string, label: string}>(null);

  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState<null | {value: string, label: string}>(null);

  const [movie, setMovie] = useState<null | any>(null);

  useEffect(() => {
    const retrieveMetadata = async () => {
      setLoading(true);

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

    let query: string[] = []
    if (selectedLanguage !== null) {
      query.push("audioLanguage=" + encodeURIComponent(selectedLanguage.value))
    }
    if (selectedCountry !== null) {
      query.push("country=" + encodeURIComponent(selectedCountry.value))
    }
    if (selectedGenre !== null) {
      query.push("genre=" + encodeURIComponent(selectedGenre.value))
    }
    let url = "/api/random_movie"
    if (query.length > 0) {
      url += "?" + query.join("&")
    }

    const res = await fetch(url)
    const data = await res.json();

    setMovie(data.movies.length > 0 ? data.movies[0] : null)

    setLoading(false);
  }

  return (
    <div className="App">
      <div className="App-picker">
        <Select
          placeholder="Language..."
          defaultValue={selectedLanguage}
          onChange={setSelectedLanguage}
          options={languages}
          isDisabled={isLoading}
          closeMenuOnSelect={true}
          isMulti={false}
          isClearable={true}
          isSearchable={true}
          className="App-select"
        />

        <Select
          placeholder="Country..."
          defaultValue={selectedCountry}
          onChange={setSelectedCountry}
          options={countries}
          isDisabled={isLoading}
          closeMenuOnSelect={true}
          isMulti={false}
          isClearable={true}
          isSearchable={true}
          className="App-select"
        />

        <Select
          placeholder="Genre..."
          defaultValue={selectedGenre}
          onChange={setSelectedGenre}
          options={genres}
          isDisabled={isLoading}
          closeMenuOnSelect={true}
          isMulti={false}
          isClearable={true}
          isSearchable={true}
          className="App-select"
        />

        <Button
          variant="primary"
          disabled={isLoading}
          onClick={!isLoading ? handleClick : undefined}
          className="App-button"
        > Pick a Movie
        </Button>

        <div className="App-spinner">
        {
          isLoading ? (
            <Spinner
              variant="primary"
              animation="border"
              role="status"
            />
          ) : null
        }
        </div>
      </div>

      <div className="App-movie">
      {
        movie ? (
            <Card style={{ width: '18rem', color: 'black' }}>
              <Card.Img variant="top" src={window.location.href + movie.posterPath} />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                  {movie.summary}
                </Card.Text>
              </Card.Body>
            </Card>
        ) : null
      }
      </div>
    </div>
  );
}

export default App;
