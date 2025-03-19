import { Artwork } from "../types";
import { baseUrl } from "../config";


interface ArtworkListProps {
    artworks: Artwork[];
}

interface ArtworkItemProps {
    artwork: Artwork;
}


const ArtworksList: React.FC<ArtworkListProps> = ({ artworks }) => {
    console.log(artworks);
    return (
        <div className="as-artwork-list">
            {artworks.map((artwork: Artwork, i) => (
                <ArtworkItem key={i} artwork={artwork} />
            ))}
        </div>
    );
};

const ArtworkItem: React.FC<ArtworkItemProps> = ({ artwork }) => {
    return (
        <div className="as-artwork-card">
            <img src={`${baseUrl}` + artwork.imageUrl} alt={artwork.artworkTitle} />
            <div className="as-artwork-card-content">
                <h4>{artwork.artworkTitle}</h4>
                <p className="as-artwork-card-artist">{artwork.artistTitle}</p>
                <p className="as-artwork-card-gallery">Guggenheim Museum</p>
            </div>
        </div>
    );
}

export default ArtworksList;
