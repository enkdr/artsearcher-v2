import { Artwork } from "../types";
import { baseUrl } from "../config";
import { Link } from "react-router-dom";

interface ArtworksListProps {
    artworks: Artwork[] | null;
    screen?: string;
}

const ArtworksList: React.FC<ArtworksListProps> = ({ artworks }) => {
    return (
        <div className="as-artwork-list">
            {artworks && artworks.length > 0 ? (
                artworks.map((artwork, i) => <ArtworkItem key={i} artwork={artwork} />)
            ) : (
                <p>No artworks found</p>
            )}
        </div>
    );
};

export const ArtworkItem: React.FC<{ artwork: Artwork }> = ({ artwork }) => {
    return (
        <Link to={`/artwork/${artwork.artworkId}`} state={{ artwork }}>
            <div className="as-artwork-card">
                <img src={`${baseUrl}${artwork.imageUrl}`} alt={artwork.artworkTitle} />
                <div className="as-artwork-card-content">
                    <h4>{artwork.artworkTitle}</h4>
                    <p className="as-artwork-card-artist">{artwork.artistTitle}</p>
                    <p className="as-artwork-card-gallery">{artwork.galleryTitle}</p>
                </div>
            </div>
        </Link>
    );
};

export default ArtworksList;
