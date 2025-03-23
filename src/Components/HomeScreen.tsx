import { useEffect, useState, useMemo } from "react";
import ASMap from "./ASMap";
import ArtworksList from "./ArtworksList";
import { Loading } from "./Loading";
import { Artwork, Gallery } from "../types";
import { getArtworksNearby } from "../api-calls";

const HomeScreen: React.FC = () => {
    const [defaultRadius, setDefaultRadius] = useState<number>(100);
    const [artworks, setArtworks] = useState<Artwork[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);

    useEffect(() => {
        const savedCoords = sessionStorage.getItem("coords");
        const savedArtworks = sessionStorage.getItem("artworks");

        if (savedCoords) {
            const parsedCoords = JSON.parse(savedCoords);
            setCoords(parsedCoords);
        } else if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    const newCoords = { lat, lon };
                    setCoords(newCoords);
                    sessionStorage.setItem("coords", JSON.stringify(newCoords));
                },
                (err) => {
                    setError(err.message);
                    setLoading(false);
                }
            );
        } else {
            setError("Geolocation not supported");
            setLoading(false);
        }

        if (savedArtworks) {
            setArtworks(JSON.parse(savedArtworks));
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!coords) return;

        setLoading(true);
        getArtworksNearby(coords.lat, coords.lon, defaultRadius)
            .then((data) => {
                setArtworks(data);
                sessionStorage.setItem("artworks", JSON.stringify(data));
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [coords, defaultRadius]);

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
                <select
                    className="as-select-radius"
                    value={defaultRadius}
                    onChange={(e) => setDefaultRadius(Number(e.target.value))}
                >
                    <option value="100">Radius</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="500">500</option>
                    <option value="1000">1000</option>
                    <option value="5000">5000</option>
                </select>
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

export default HomeScreen;
