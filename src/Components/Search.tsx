import { useEffect, useState } from 'react';
import ArtistList from './ArtistsList';
import { Artist, Artwork } from '../types';
import { getArtists, getHighlights, getGalleries } from '../db';
import ArtworksList from './ArtworksList';
import GalleriesList from './GalleryList';



const Search: React.FC = () => {

    const [artists, setArtists] = useState<Artist[]>([]);
    const [highlights, setHighlights] = useState<Artwork[]>([]);
    const [galleries, setGalleries] = useState<Gallery[]>([]);

    useEffect(() => {
        getArtists().then(setArtists);
    }, []);

    useEffect(() => {
        getHighlights().then(setHighlights);
    }, []);

    useEffect(() => {
        getGalleries().then(setGalleries);
    }, []);


    return (
        <div className="container">
            <div className="search-container">
                <ArtworksList artworks={highlights} screen="search" />
            </div>
            <div className="search-container">
                <ArtistList artists={artists} />
            </div>
            <div className="search-container">
                <GalleriesList galleries={galleries} />
            </div>
        </div>
    );
}

export default Search;