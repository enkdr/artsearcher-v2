import { Artist } from "../types";
import { baseUrl } from "../config";


interface ArtistListProps {
    artists: Artist[];
}

interface ArtistItemProps {
    artist: Artist;
}

const ArtworksList: React.FC<ArtistListProps> = ({ artists }) => {
    console.log(artists);
    return (
        <div className="as-artwork-list">
            {artists.map((artist: Artist, i) => (
                <ArtistItem key={i} artist={artist} />
            ))}
        </div>
    );
};

const ArtistItem: React.FC<ArtistItemProps> = ({ artist }) => {
    return (
        <div className="as-artwork-card">
            <img src={`${baseUrl}` + artist.artistImageUrl} alt={artist.artistTitle} />
            <div className="as-artwork-card-content">
                <h4>{artist.artistTitle}</h4>
                <p className="as-artwork-card-artist">{artist.artistFirstname}</p>
                <p className="as-artwork-card-gallery">{artist.artistNationality}</p>
            </div>
        </div>
    );
}

export default ArtworksList;
