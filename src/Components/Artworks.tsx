import { useEffect, useState } from "react";
import ArtworksList from "./ArtworksList";
import { Artwork } from "../types";
import { getHighlights } from "../api-calls";
import { Loading } from './Loading';

const Search: React.FC = () => {
    const [highlights, setHighlights] = useState<Artwork[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getHighlights()
            .then((artworks) => {
                setHighlights(artworks);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching highlights:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="container">
            <div className="search-container">
                {loading ? <Loading /> : <ArtworksList artworks={highlights} screen="artworks" />}
            </div>
        </div>
    );
};

export default Search;
