import React, { useEffect, useRef, useState } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";
import { Artwork, Gallery } from "../types";
import { fromLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Fill, Stroke, Style, Text } from "ol/style";
import CircleStyle from "ol/style/Circle";
import { buffer } from "ol/extent";

interface ASMapProps {
    galleries?: Gallery[];
    artworks?: Artwork[];
}

const ASMap: React.FC<ASMapProps> = ({ galleries = [], artworks = [] }) => {
    const [selectedGallery, setSelectedGallery] = useState<string | null>(null);
    const artworkSource = useRef(new VectorSource());

    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<Map | null>(null);
    const artworkLayerRef = useRef<VectorLayer | null>(null);

    useEffect(() => {
        if (!mapRef.current) return;

        const baseLayer = new TileLayer({
            source: new OSM(),
        });

        const map = new Map({
            target: mapRef.current,
            layers: [baseLayer],
            view: new View({
                center: fromLonLat([0, 0]),
                zoom: 2,
            }),
        });

        mapInstance.current = map;

        return () => map.setTarget(undefined);
    }, []);

    useEffect(() => {
        if (!mapInstance.current) return;

        const map = mapInstance.current;

        // Remove existing vector layers before adding new ones
        map.getLayers().getArray().forEach((layer) => {
            if (layer instanceof VectorLayer) {
                map.removeLayer(layer);
            }
        });

        const gallerySource = new VectorSource();

        galleries.forEach((gallery) => {
            const feature = new Feature({
                geometry: new Point(fromLonLat([gallery.galleryLon, gallery.galleryLat])),
            });

            feature.setId(gallery.galleryId);

            const galleryStyle = new Style({
                image: new CircleStyle({
                    radius: 8,
                    fill: new Fill({ color: '#ffcc33' }),
                    stroke: new Stroke({
                        color: '#ffffff',
                        width: 2
                    })
                }),
                text: new Text({
                    text: gallery.galleryTitle,
                    font: '12px sans-serif',
                    fill: new Fill({ color: '#000000' }),
                    stroke: new Stroke({
                        color: '#ffffff',
                        width: 3
                    }),
                    offsetY: -20,
                }),
            });

            feature.setStyle(galleryStyle);
            gallerySource.addFeature(feature);

            const extent = gallerySource.getExtent();
            if (extent) {
                const bufferedExtent = buffer(extent, 1000); // Add buffer for smoother zoom-in
                map.getView().fit(bufferedExtent, {
                    padding: [50, 50, 50, 50],
                    maxZoom: 10,
                });
            }
        });

        const galleryLayer = new VectorLayer({ source: gallerySource });
        map.addLayer(galleryLayer);

        // Add artwork layer to map (initially empty)
        if (!artworkLayerRef.current) {
            artworkLayerRef.current = new VectorLayer({ source: artworkSource.current });
            map.addLayer(artworkLayerRef.current);
        }

        map.on("click", (event) => {
            map.forEachFeatureAtPixel(event.pixel, (feature) => {
                const galleryId = feature.getId();
                if (galleryId) {
                    setSelectedGallery(galleryId as string);

                    const gallery = galleries.find(g => g.galleryId === galleryId);
                    if (gallery) {
                        map.getView().animate({
                            center: fromLonLat([gallery.galleryLon, gallery.galleryLat]),
                            zoom: 10,
                            duration: 500,
                        });
                    }
                }
            });
        });

    }, [galleries]);

    useEffect(() => {
        if (!selectedGallery) return;

        const filteredArtworks = artworks.filter(artwork => artwork.galleryId === selectedGallery);

        // Clear the previous artworks before adding the new filtered ones
        artworkSource.current.clear();

        filteredArtworks.forEach((artwork) => {
            const feature = new Feature({
                geometry: new Point(fromLonLat([artwork.galleryLon, artwork.galleryLat])),
            });

            feature.setStyle(new Style({
                image: new CircleStyle({
                    radius: 6,
                    stroke: new Stroke({ color: "#8b0000", width: 2 }),
                }),
            }));

            artworkSource.current.addFeature(feature);

            const galleryTitle = artwork.galleryTitle;
            if (galleryTitle) {
                const titleFeature = new Feature({
                    geometry: new Point(fromLonLat([artwork.galleryLon, artwork.galleryLat])),
                    name: galleryTitle,
                });
                titleFeature.setStyle(new Style({
                    text: new Text({
                        text: galleryTitle,
                        font: 'bold 12px sans-serif',
                        fill: new Fill({
                            color: '#000',
                        }),
                        stroke: new Stroke({
                            color: '#fff',
                            width: 2,
                        }),
                    }),
                }));
                artworkSource.current.addFeature(titleFeature);
            }
        });

    }, [selectedGallery, artworks]);

    return <div ref={mapRef} className="as-map" />;
};

export default ASMap;
