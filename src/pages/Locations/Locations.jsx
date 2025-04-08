import { useEffect, useState } from "react";
import { bringAllLocation } from "../../services/apiCalls";
import { Row } from "react-bootstrap";
import './Locations.css';





const LocationList = () => {

    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const charactersPerPage = 10;
    const [totalLocations, setTotalLocations] = useState(0);

    useEffect(() => {
        const fetchLocation = async () => {
            await bringLocation(currentPage);
        }
        fetchLocation();
    },[currentPage])

    const bringLocation = async (page) => {
        try {
            const response = await bringAllLocation(page, charactersPerPage);
            setLocations(response.data.results);
            setTotalLocations(response.data.count);
            setLoading(false);

        } catch (error) {
            console.error(error);
        }
    }

    const getLocationIdFromUrl = (url) => {
        const parts = url.split('/');
        return parts[parts.length - 2];
    }

      //Pagination
  const totalPages = Math.ceil(totalLocations / charactersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

    return(
        <>
        <h3>Locations</h3>
        <Row xs={12} sm={6} md={3}/>
        <div className="location-list">
            {locations.map((location) => {
                const id = getLocationIdFromUrl(location.url);
                return(
                    <li key={location.name} className="location-card">
                        <p>Location: {location.name}</p>
                    </li>
                )
            })}

        </div>

        </>
    )
}

export default LocationList;