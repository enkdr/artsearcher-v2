import { Artwork } from "../types";
import { shortUrl } from "../config";


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
            {/* Render artworks here */}
            {artworks.map((artwork, i) => (
                <ArtworkItem key={i} artwork={artwork} />
            ))}
        </div>
    );
};

const ArtworkItem: React.FC<ArtworkItemProps> = ({ artwork }) => {
    return (
        <div className="as-artwork-card">
            <img src={`${shortUrl}` + artwork.imageUrl} alt={artwork.artworkTitle} />
            <div className="as-artwor-card-content">
                <h3>Composition VIII</h3>
                <p>Artist: Wassily Kandinsky</p>
                <p>Year: 1923</p>
                <p className="as-artwork-card-gallery">Gallery: Guggenheim Museum</p>
            </div>
        </div>
    );
}

export default ArtworksList;
