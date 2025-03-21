import { useLocation, useParams } from "react-router-dom";
import { baseUrl } from "../config";
import { Artwork } from "../types";

const ArtworkScreen: React.FC = () => {

    const { artworkId } = useParams<{ artworkId: string }>();
    const location = useLocation();
    const artwork: Artwork | undefined = location.state?.artwork; // Get artwork from state

    if (!artwork) return <p>Artwork not found</p>;


    return (
        <div className="container artwork-screen">
            <div className="top-container">
                <div className="as-artwork-detail">
                    <img src={`${baseUrl}${artwork.imageUrl}`} alt={artwork.artworkTitle} />
                    <h4>{artwork.artworkTitle} - {artwork.artistTitle}</h4>
                </div>
            </div>
            <div className="bottom-container">
                <h1>Artwork bottom container</h1>
            </div>
        </div>
    );
};

export default ArtworkScreen;
