import { useEffect, useState } from 'react';
import ArtistList from './ArtistsList';
import { Artist } from '../types';
import { getArtists } from '../db';



const Search: React.FC = () => {

    const [artists, setArtists] = useState<Artist[]>([]);

    useEffect(() => {
        getArtists().then(setArtists);
    }, []);

    return (
        <div className="container">
            <div className="search-container">
                <ArtistList artists={artists} />
            </div>
            <div className="search-container">
                <ArtistList artists={artists} />
            </div>
            <div className="search-container">
                <ArtistList artists={artists} />
            </div>
        </div>
    );
}

export default Search;