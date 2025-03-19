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
        <>
            <input className="as-search-input" type="text" placeholder="Search Artists" />
            <div className="as-artist-list">

                {artists.map((artist: Artist, i) => (
                    <ArtistItem key={i} artist={artist} />
                ))}
            </div>
        </>
    );
};

const ArtistItem: React.FC<ArtistItemProps> = ({ artist }) => {
    return (
        <div className="as-artist-card">
            <img loading="lazy" src={`${baseUrl}` + artist.artistImageUrl} alt={artist.artistTitle} />
            <div className="as-artist-card-content">
                <h4>{artist.artistTitle}</h4>
                <p className="as-artists-card-nationality">{artist.artistNationality}</p>
            </div>
        </div>
    );
}

export default ArtworksList;
