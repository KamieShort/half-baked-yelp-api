import { useEffect, useState } from 'react';
import './App.css';
import { RestaurantListItem } from './services/components/RestaurantListItem';
import { fetchBusinesses } from './services/yelp';
// import Search from '../src/services/components/Search';

function App() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [zip, setZip] = useState('97013');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  // TODO -- add state for zip / search and add event listeners to the inputs

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBusinesses();
      setBusinesses(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const searchHandler = async () => {
    if (!zip) {
      setError('please add zip!');
    } else {
      const data = await fetchBusinesses(zip, search);
      setError('');
      return setBusinesses(data);
    }
  };
  // TODO -- add event for button click to handle calling fetchBusinesses with zip / search

  return (
    <div className="App">
      <h1>Alchemy Restaurant Finder</h1>
      <div className="query-form">
        <div className="form-control">
          <label>Zip:</label>

          <input type="text" placeholder="zip" onChange={(e) => setZip(e.target.value)} />
        </div>
        <div className="form-control">
          <label>Query:</label>
          <input type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
        </div>

        <button onClick={searchHandler}>Search</button>
        <p>{error}</p>
      </div>
      {loading && <div className="loader"></div>}
      {!loading && businesses.map((b) => <RestaurantListItem key={b.id} {...b} />)}
    </div>
  );
}

export default App;
