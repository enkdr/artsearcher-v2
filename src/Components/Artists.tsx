import { use, useEffect, useState } from 'react';
import ASMap from './ASMap';
import ArtistList from './ArtistsList';
import { Artist } from '../types';
import { getArtists } from '../db';



const Artists: React.FC = () => {

    const [artists, setArtists] = useState<Artist[]>([]);

    useEffect(() => {
        getArtists().then(setArtists);
    }, []);

    return (
        <div className="container">
            <div className="top-container">
                <ASMap />
            </div>
            <div className="bottom-container">
                <ArtistList artists={artists} />
            </div>
        </div>
    );
}

export default Artists;