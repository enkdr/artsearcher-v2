import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import ASMap from "../Components/ASMap";
import ArtworksList from "../Components/ArtworksList";
import { Loading } from "../Components/Loading";
import { Artwork, Gallery } from "../types";
import { getArtworksByGallery, getArtworksByCountry } from "../api-calls";

const ArtworkResultsScreen: React.FC = () => {

    const { galleryId, countryId } = useParams<{ galleryId?: string; countryId?: string }>();
    const [artworks, setArtworks] = useState<Artwork[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!galleryId && !countryId) return;

        setLoading(true);
        setError(null);

        const fetchArtworks = galleryId
            ? getArtworksByGallery(galleryId)
            : getArtworksByCountry(countryId as string);

        fetchArtworks
            .then((data) => {
                setArtworks(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [galleryId, countryId]);

    const galleries = useMemo(() => {
        if (!artworks) return [];
        const galleriesMap = new Map<string, Gallery>();

        artworks.forEach(({ galleryId, galleryTitle, galleryAddress, galleryLink, galleryLat, galleryLon, countryId, countryTitle }) => {
            if (!galleriesMap.has(galleryId)) {
                galleriesMap.set(galleryId, {
                    galleryId,
                    galleryTitle,
                    galleryAddress,
                    galleryLink,
                    galleryLat,
                    galleryLon,
                    countryId,
                    countryTitle,
                });
            }
        });

        return Array.from(galleriesMap.values());
    }, [artworks]);

    return (
        <div className="container">
            <div className="top-container">
                <ASMap galleries={galleries} />
            </div>
            <div className="bottom-container">
                {!loading && !error ? (
                    <ArtworksList artworks={artworks} />
                ) : (
                    <div className="loading-component">
                        <Loading message={error || "Loading"} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArtworkResultsScreen;
