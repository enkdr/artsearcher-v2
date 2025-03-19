import { useEffect, useState } from 'react';
import ArtistList from './ArtistsList';
import { Artist, Artwork } from '../types';
import { getArtists, getHightlights } from '../db';
import ArtworksList from './ArtworksList';



const Search: React.FC = () => {

    const [artists, setArtists] = useState<Artist[]>([]);
    const [highlights, setHighlights] = useState<Artwork[]>([]);

    useEffect(() => {
        getArtists().then(setArtists);
    }, []);

    useEffect(() => {
        getHightlights().then(setHighlights);
    }, []);

    return (
        <div className="container">
            <div className="search-container">
                <ArtistList artists={artists} />
            </div>
            <div className="search-container">
                <ArtworksList artworks={highlights} screen="search" />
            </div>
            <div className="search-container">
                <ArtistList artists={artists} />
            </div>
        </div>
    );
}

export default Search;