import React, { useEffect, useState } from "react";
import { getArtists, getGalleries, getArtworks, getCountries } from "../api-calls";
import { Artwork, Country, Artist, Gallery } from "../types";
import { Loading } from "../Components/Loading";
import { ArtworkItem } from "../Components/ArtworksList";
import { ArtistItem } from "../Components/ArtistList";
import { Link } from "react-router-dom";

const SearchScreen: React.FC = () => {
    const [artworks, setArtworks] = useState<Artwork[] | null>(null);
    const [countries, setCountries] = useState<Country[] | null>(null);
    const [artists, setArtists] = useState<Artist[] | null>(null);
    const [galleries, setGalleries] = useState<Gallery[] | null>(null);

    const [error, setError] = useState<string | null>(null);
    const [loadingArtworks, setLoadingArtworks] = useState<boolean>(true);
    const [loadingCountries, setLoadingCountries] = useState<boolean>(true);
    const [loadingArtists, setLoadingArtists] = useState<boolean>(true);
    const [loadingGalleries, setLoadingGalleries] = useState<boolean>(true);

    useEffect(() => {
        setLoadingArtworks(true);
        getArtworks()
            .then((data) => {
                if (!data) setError("Artworks not found");
                setArtworks(data);
            })
            .catch((err) => setError(err.message || "Failed to fetch artworks"))
            .finally(() => setLoadingArtworks(false));
    }, []);

    useEffect(() => {
        setLoadingCountries(true);
        getCountries()
            .then((data) => {
                if (!data) setError("Countries not found");
                setCountries(data);
            })
            .catch((err) => setError(err.message || "Failed to fetch countries"))
            .finally(() => setLoadingCountries(false));
    }, []);

    useEffect(() => {
        setLoadingArtists(true);
        getArtists()
            .then((data) => {
                if (!data) setError("Artists not found");
                setArtists(data);
            })
            .catch((err) => setError(err.message || "Failed to fetch artists"))
            .finally(() => setLoadingArtists(false));
    }, []);

    useEffect(() => {
        setLoadingGalleries(true);
        getGalleries()
            .then((data) => {
                if (!data) setError("Galleries not found");
                setGalleries(data);
            })
            .catch((err) => setError(err.message || "Failed to fetch galleries"))
            .finally(() => setLoadingGalleries(false));
    }, []);

    const [searchArtists, setSearchArtists] = useState("");
    const [searchArtworks, setSearchArtworks] = useState("");
    const [searchGalleries, setSearchGalleries] = useState("");
    const [searchCountries, setSearchCountries] = useState("");

    const filteredArtists = artists?.filter((artist) =>
        artist.artistTitle.toLowerCase().includes(searchArtists.toLowerCase())
    );

    const filteredArtworks = artworks?.filter((artwork: Artwork) =>
        artwork.artworkTitle.toLowerCase().includes(searchArtworks.toLowerCase())
    );

    const filteredGalleries = galleries?.filter((gallery) =>
        gallery.galleryTitle.toLowerCase().includes(searchGalleries.toLowerCase())
    );

    const filteredCountries = countries?.filter((country) =>
        country.countryTitle.toLowerCase().includes(searchCountries.toLowerCase())
    );

    return (
        <div className="container">
            {/* Artists Section */}
            <div className="section">
                {!loadingArtists && !error ? (
                    <>
                        <input
                            type="text"
                            placeholder="Search Artists..."
                            value={searchArtists}
                            onChange={(e) => setSearchArtists(e.target.value)}
                        />
                        <div className="image-scroll-container" >
                            {filteredArtists?.map((artist) => (
                                <ArtistItem key={artist.artistId} artist={artist} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="loading-component">
                        <Loading message={error || "Loading"} />
                    </div>
                )}
            </div>

            {/* Artworks Section */}
            <div className="section">
                {!loadingArtworks && !error ? (
                    <>
                        <input
                            type="text"
                            placeholder="Search Artworks..."
                            value={searchArtworks}
                            onChange={(e) => setSearchArtworks(e.target.value)}
                        />
                        <div className="image-scroll-container">
                            {filteredArtworks?.map((artwork: Artwork) => (
                                <div key={artwork.artworkId} className="image-scroll-item">
                                    <ArtworkItem artwork={artwork} />
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="loading-component">
                        <Loading message={error || "Loading"} />
                    </div>
                )}
            </div>

            {/* Galleries Section */}
            <div className="section">
                {!loadingGalleries && !error ? (
                    <>
                        <input
                            type="text"
                            placeholder="Search Galleries..."
                            value={searchGalleries}
                            onChange={(e) => setSearchGalleries(e.target.value)}
                        />
                        <div className="scroll-container">
                            {filteredGalleries?.map((gallery) => (
                                <Link key={gallery.galleryId} to={`/gallery/${gallery.galleryId}`}>
                                    <div className="scroll-item">{gallery.galleryTitle}</div>
                                </Link>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="loading-component">
                        <Loading message={error || "Loading"} />
                    </div>
                )}
            </div>

            {/* Countries Section */}
            <div className="section">
                {!loadingCountries && !error ? (
                    <>
                        <input
                            type="text"
                            placeholder="Search Countries..."
                            value={searchCountries}
                            onChange={(e) => setSearchCountries(e.target.value)}
                        />
                        <div className="scroll-container">
                            {filteredCountries?.map((country) => (
                                <Link key={country.countryId} to={`/country/${country.countryId}`}>
                                    <div className="scroll-item">{country.countryTitle}</div>
                                </Link>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="loading-component">
                        <Loading message={error || "Loading"} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchScreen;
