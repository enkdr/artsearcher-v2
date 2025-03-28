import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrl } from "../config";
import { Artist, Artwork } from "../types";
import { getArtistDetails, getArtistArtworks } from "../api-calls";
import { Loading } from "../Components/Loading";
import ArtworksList from "../Components/ArtworksList";

const ArtistScreen: React.FC = () => {
    const { artistId } = useParams<{ artistId: string }>();
    const [artist, setArtist] = useState<Artist | null>(null);
    const [artworks, setArtworks] = useState<Artwork[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loadingArtist, setLoadingArtist] = useState<boolean>(true);
    const [loadingArtworks, setLoadingArtworks] = useState<boolean>(true);


    useEffect(() => {
        if (!artistId) {
            setError("Artist ID is missing");
            setLoadingArtist(false);
            return;
        }

        setLoadingArtist(true);

        getArtistDetails(artistId)
            .then((data) => {
                if (data === null) {
                    setError("Artist not found");
                    setArtist(null);
                } else {
                    setArtist(data);
                }
            })
            .catch((err) => {
                setError(err.message || "Failed to fetch artist");
            })
            .finally(() => {
                setLoadingArtist(false);
            });
    }, [artistId]);


    useEffect(() => {
        if (!artistId) {
            setError("Artist ID is missing");
            setLoadingArtworks(false);
            return;
        }

        setLoadingArtworks(true);

        getArtistArtworks(artistId)
            .then((data) => {
                if (data === null) {
                    setError("Artworks not found");
                    setArtworks(null);
                } else {
                    setArtworks(data);
                }
            })
            .catch((err) => {
                setError(err.message || "Failed to fetch artworks");
            })
            .finally(() => {
                setLoadingArtworks(false);
            });
    }, [artistId]);


    return (
        <>
            {error && <div className="error">{error}</div>}

            <div className="container artist-screen">
                <div className="top-container">
                    {loadingArtist ? (
                        <Loading />
                    ) : (
                        <div className="as-artist-detail">
                            <img src={`${baseUrl}${artist?.artistImageUrl}`} alt={artist?.artistTitle} />
                            <h4>{artist?.artistTitle}</h4>
                            <p>{artist?.artistShortBio}</p>
                        </div>
                    )}
                </div>
                <div className="bottom-container">
                    {loadingArtworks ? (
                        <Loading />
                    ) : (
                        <ArtworksList artworks={artworks} />
                    )}
                </div>
            </div>

        </>
    )
};

export default ArtistScreen;
