import { useEffect, useState } from "react";
import ArtistList from "./ArtistsList";
import ArtworksList from "./ArtworksList";
import { Artist, Artwork } from "../types";
import { getArtists, getHighlights, getArtistArtworks } from "../api-calls";
import { Loading } from './Loading';

const Search: React.FC = () => {
    const [artists, setArtists] = useState<Artist[]>([]);
    const [highlights, setHighlights] = useState<Artwork[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const filteredArtists = artists.filter((artist) =>
        artist.artistTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        getArtists().then(setArtists);
    }, []);

    useEffect(() => {
        getHighlights().then(setHighlights);
    }, []);


    const getArtworksByArtist = (artist: Artist) => {
        setLoading(true);
        getArtistArtworks(artist.artistId).then((artworks) => {
            setLoading(false);
            setHighlights(artworks);
        });
    };

    if (filteredArtists.length === 1) {

        getArtworksByArtist(filteredArtists[0]);
    }

    return (
        <div className="container">
            <div className="search-container">
                <input
                    className="as-search-input"
                    type="text"
                    placeholder="Search Artists"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <ArtistList artists={filteredArtists} screen="search" />
            </div>
            <div className="search-container">
                {loading ? <Loading /> : <ArtworksList artworks={highlights} screen="search" />}
            </div>
        </div>
    );
};

export default Search;
