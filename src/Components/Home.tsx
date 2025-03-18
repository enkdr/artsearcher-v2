import { use, useEffect, useState } from 'react';
import ASMap from './ASMap';
import ArtworksList from './ArtworksList';
import { Artwork, createApiUrl, GPSLocation } from '../types';



export default function Home() {

    const url = createApiUrl("artworks", `artworks_nearby/-37.7787726/144.9777089/100`);

    console.log(" :: url :: ", url);

    // const [location, setLocation] = useState<GPSLocation | null>(null);
    const [artworks, setArtworks] = useState<Artwork[]>([]);


    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setArtworks(data);
            })
    }, []);

    return (
        <div className="container">
            <div className="map-container">
                <ASMap />
            </div>
            <div className="artwork-container">
                <ArtworksList artworks={artworks} />
            </div>
        </div>
    );
}
