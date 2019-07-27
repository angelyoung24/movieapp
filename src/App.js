import React from 'react';
import ReactDOM from "react-dom";
import './App.css';

function Movie(props) {
  return <img alt="movies" src = {props.src}/>;
}

function Movies(props) {
  const [movies, setMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => console.log(movies));

  React.useEffect(() => {
    if (!props.search) {
      return;
    }

    fetch(`https://www.omdbapi.com/?s=${props.search}&apikey=e2f1f9a0`).then(
      response =>
      response.json().then(json => {
        setMovies(json.Search);
        setLoading(false);
      })
    );
  }, [props.search]);

  if (loading || !movies) {
    return <div className="loading"> loading... < /div>;
  }

  return movies.map(movie => < Movie src = {
      movie.Poster
    }
    />);
  }

  function App() {
    const [search, setSearch] = React.useState("");
    return ( <div className = "App" >
      <table>
        <tbody>
          <tr>
              <td><h1 > Angel's Movie App</h1></td>
          </tr>
        </tbody>
      
      
       <input placeholder="Enter Movie Name" value = {
        search
      }
      onChange = {
        e => setSearch(e.target.value)
      }/> 
      <Movies search = {
        search
          } />
          </table>
          </div>
    );
  }

  const rootElement = document.getElementById("root");
  ReactDOM.render( < App / > , rootElement);

export default App;
