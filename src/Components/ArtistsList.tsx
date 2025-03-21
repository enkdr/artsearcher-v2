import { Artist } from "../types";
import { baseUrl } from "../config";

interface ArtistListProps {
    artists: Artist[];
    screen?: string;
}

const ArtistList: React.FC<ArtistListProps> = ({ artists }) => {
    return (
        <div className="as-artist-list">
            {artists.length > 0 ? (
                artists.map((artist, i) => <ArtistItem key={i} artist={artist} />)
            ) : (
                <p>No artists found</p>
            )}
        </div>
    );
};

const ArtistItem: React.FC<{ artist: Artist }> = ({ artist }) => {
    return (
        <div className="as-artist-card">
            <img loading="lazy" src={`${baseUrl}${artist.artistImageUrl}`} alt={artist.artistTitle} />
            <div className="as-artist-card-content">
                <h4>{artist.artistTitle}</h4>
                <p className="as-artists-card-nationality">{artist.artistNationality}</p>
            </div>
        </div>
    );
};

export default ArtistList;
