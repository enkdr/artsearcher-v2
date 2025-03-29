import { Artist } from "../types";
import { baseUrl } from "../config";
import { Link } from "react-router-dom";

interface ArtistsListProps {
    artists: Artist[] | null;
    screen?: string;
}

const ArtistsList: React.FC<ArtistsListProps> = ({ artists }) => {
    return (
        <div className="as-artist-list">
            {artists && artists.length > 0 ? (
                artists.map((artist, i) => <ArtistItem key={i} artist={artist} />)
            ) : (
                <p>No artists found</p>
            )}
        </div>
    );
};

export const ArtistItem: React.FC<{ artist: Artist }> = ({ artist }) => {
    return (
        <Link to={`/artist/${artist.artistId}`} state={{ artist }}>
            <div className="as-artist-card">
                <img loading="lazy" src={`${baseUrl}${artist.artistImageUrl}`} alt={artist.artistTitle} />
                <div className="as-artist-card-content">
                    <h4>{artist.artistTitle}</h4>
                </div>
            </div>
        </Link>
    );
};

export default ArtistsList;
