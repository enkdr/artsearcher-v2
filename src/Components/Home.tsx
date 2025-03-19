import { useEffect, useState } from 'react';
import ASMap from './ASMap';
import ArtworksList from './ArtworksList';
import { Loading } from '../Components/Loading';
import { Artwork } from '../types';
import { getArtworksNearby } from '../db';

const Home: React.FC = () => {
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        } else {
            setError("Geolocation not supported");
            setLoading(false);
        }

        function onSuccess(position: GeolocationPosition) {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            const radius = 100;

            getArtworksNearby(lat, long, radius)
                .then(data => {
                    setArtworks(data);
                    setLoading(false);
                })
                .catch(err => {
                    setError("Failed to fetch artworks");
                    setLoading(false);
                });
        }

        function onError(err: GeolocationPositionError) {
            setError(err.message);
            setLoading(false);
        }
    }, []);

    return (
        <div className="container">
            <div className="top-container">
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
