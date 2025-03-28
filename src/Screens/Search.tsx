import React, { useEffect, useState } from "react";
import { getHighlights, getArtists, getGalleries, getArtworks, getCountries } from "../api-calls";
import { Artwork, Country } from "../types";
import { Loading } from "../Components/Loading";

const initialArtists = ["Van Gogh", "Picasso", "Da Vinci", "Monet", "Rembrandt"];
const initialArtworks = ["Starry Night", "Guernica", "Mona Lisa", "Water Lilies", "Night Watch"];
const initialGalleries = ["Louvre", "MoMA", "Tate Modern", "Uffizi", "The Met"];

const SearchScreen: React.FC = () => {


    const [artworks, setArtworks] = useState<Artwork[] | null>(null);
    const [countries, setCountries] = useState<Country[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loadingArtworks, setLoadingArtworks] = useState<boolean>(true);
    const [loadingCountries, setLoadingCountries] = useState<boolean>(true);

    useEffect(() => {

        setLoadingArtworks(true);

        getArtworks()
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
    }, []);

    useEffect(() => {

        setLoadingCountries(true);

        getCountries()
            .then((data) => {
                if (data === null) {
                    setError("Countries not found");
                    setCountries(null);
                } else {
                    setCountries(data);
                }
            })
            .catch((err) => {
                setError(err.message || "Failed to fetch countries");
            })
            .finally(() => {
                setLoadingCountries(false);
            });
    }, []);



    const [searchArtists, setSearchArtists] = useState("");
    const [searchArtworks, setSearchArtworks] = useState("");
    const [searchGalleries, setSearchGalleries] = useState("");
    const [searchCountries, setSearchCountries] = useState("");

    const filteredArtists = initialArtists.filter((artist) =>
        artist.toLowerCase().includes(searchArtists.toLowerCase())
    );

    const filteredArtworks = artworks?.filter((artwork) =>
        artwork.artworkTitle.toLowerCase().includes(searchArtworks.toLowerCase())
    );

    const filteredGalleries = initialGalleries.filter((gallery) =>
        gallery.toLowerCase().includes(searchGalleries.toLowerCase())
    );

    const filteredCountries = countries?.filter((country) =>
        country.countryTitle.toLowerCase().includes(searchCountries.toLowerCase())
    );

    return (
        <div className="container">
            {/* Artists Section */}
            <div className="section">
                <input
                    type="text"
                    placeholder="Search Artists..."
                    value={searchArtists}
                    onChange={(e) => setSearchArtists(e.target.value)}
                />
                <div className="scroll-container">
                    {filteredArtists.map((artist) => (
                        <div key={artist} className="scroll-item">{artist}</div>
                    ))}
                </div>
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
                        <div className="scroll-container">
                            {filteredArtworks?.map((artwork) => (
                                <div key={artwork.artworkId} className="scroll-item">{artwork.artworkTitle}</div>
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
                <input
                    type="text"
                    placeholder="Search Galleries..."
                    value={searchGalleries}
                    onChange={(e) => setSearchGalleries(e.target.value)}
                />
                <div className="scroll-container">
                    {filteredGalleries.map((gallery) => (
                        <div key={gallery} className="scroll-item">{gallery}</div>
                    ))}
                </div>
            </div>

            {/* Countries Section */}
            <div className="section">
                <input
                    type="text"
                    placeholder="Search Countries..."
                    value={searchCountries}
                    onChange={(e) => setSearchCountries(e.target.value)}
                />
                <div className="scroll-container">
                    {filteredCountries?.map((country) => (
                        <div key={country.countryId} className="scroll-item">{country.countryTitle}</div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default SearchScreen;
