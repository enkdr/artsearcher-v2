import { useEffect, useState } from 'react';
import ASMap from './ASMap';
import ArtworksList from './ArtworksList';
import { Loading } from '../Components/Loading';
import { Artwork } from '../types';
import { getArtworksNearby } from '../api-calls';

const Home: React.FC = () => {

    const [defaultRadius, setDefaultRadius] = useState<number>(100);
    const [artworks, setArtworks] = useState<Artwork[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        } else {
            setError("Geolocation not supported");
            setLoading(false);
        }

        function onSuccess(position: GeolocationPosition) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            setCoords({ lat, lon });
        }

        function onError(err: GeolocationPositionError) {
            setError(err.message);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const savedCoords = sessionStorage.getItem("coords");
        const savedArtworks = sessionStorage.getItem("artworks");

        if (savedCoords) {
            setCoords(JSON.parse(savedCoords));
        }
        if (savedArtworks) {
            setArtworks(JSON.parse(savedArtworks));
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (coords) {
            setLoading(true);
            getArtworksNearby(coords.lat, coords.lon, defaultRadius)
                .then((data) => {
                    setArtworks(data);
                    sessionStorage.setItem("artworks", JSON.stringify(data));
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [coords, defaultRadius]);

    useEffect(() => {
        if (coords) {
            sessionStorage.setItem("coords", JSON.stringify(coords));
        }
    }, [coords]);

    return (
        <div className="container">
            <div className="top-container">
                <select
                    className="as-select-radius"
                    value={defaultRadius}
                    onChange={(e) => setDefaultRadius(Number(e.target.value))}
                >
                    <option value="100">Radius</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="500">500</option>
                    <option value="1000">1000</option>
                    <option value="5000">5000</option>
                </select>
                <ASMap />
            </div>
            <div className="bottom-container">
                {!loading && !error ? (
                    <ArtworksList artworks={artworks} />
                ) : (
                    <div className="loading-component">
                        <Loading message={error || "Loading"} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
