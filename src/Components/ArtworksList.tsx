import { Artwork } from "../types";
import { baseUrl } from "../config";


interface ArtworkListProps {
    artworks: Artwork[];
    screen?: "search" | "home";
}

interface ArtworkItemProps {
    artwork: Artwork;
}

const ArtworksList: React.FC<ArtworkListProps> = ({ artworks, screen }) => {
    console.log(artworks);
    return (
        <>
            {screen === "search" ? (<input className="as-search-input" type="text" placeholder="Search Artworks" />) : null}
            <div className="as-artwork-list">
                {artworks.map((artwork: Artwork, i) => (
                    <ArtworkItem key={i} artwork={artwork} />
                ))}
            </div>
        </>
    );
};

const ArtworkItem: React.FC<ArtworkItemProps> = ({ artwork }) => {
    return (
        <div className="as-artwork-card">
            <img loading="lazy" src={`${baseUrl}` + artwork.imageUrl} alt={artwork.artworkTitle} />
            <div className="as-artwork-card-content">
                <h4>{artwork.artworkTitle}</h4>
                <p className="as-artwork-card-artist">{artwork.artistTitle}</p>
                <p className="as-artwork-card-gallery">{artwork.galleryTitle}</p>
            </div>
        </div>
    );
}

export default ArtworksList;
