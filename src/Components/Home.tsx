import { use, useEffect, useState } from 'react';
import ASMap from './ASMap';
import ArtworksList from './ArtworksList';
import { Artwork, createApiUrl, GPSLocation } from '../types';
import { getArtworksNearby } from '../db';



const Home: React.FC = () => {

    const [artworks, setArtworks] = useState<Artwork[]>([]);

    useEffect(() => {
        getArtworksNearby().then(setArtworks);
    }, []);

    return (
        <div className="container">
            <div className="top-container">
                <ASMap />
            </div>
            <div className="bottom-container">
                <ArtworksList artworks={artworks} />
            </div>
        </div>
    );
}

export default Home;