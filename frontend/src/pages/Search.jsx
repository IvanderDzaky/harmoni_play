import "../styles/Search.css";
import { useState, useEffect } from "react";
import { getAllCategories } from "../services/genresService";
import Loader from "../components/layout/Loader";
import "../styles/loader.css";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

export default function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const data = await getAllCategories();
        setGenres(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCategories();
  }, []);

  if (loading) {
    return (
      <div className="loader-overlay">
        <Loader />
      </div>
    );
  }

  const Color = [
    "#f39c12",
    "#e74c3c",
    "#8e44ad",
    "#3498db",
    "#27ae60",
    "#d35400",
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query || !query.trim()) return;
    navigate(`/searchlist?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="search-page">
      <h2 className="search-title">Search</h2>

      <SearchBar
        handleSearch={handleSearch}
        query={query}
        setQuery={setQuery}
      />

      <h3 className="section-title">Browse All</h3>
      <div className="search-grid">
        {genres?.map((genre, index) => (
          <div
            key={genre.genre_id}
            className="search-card"
            style={{ backgroundColor: Color[index % Color.length] }}
            onClick={() => navigate(`/genre/${genre.genre_id}`)}
          >
            <p>{genre.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
