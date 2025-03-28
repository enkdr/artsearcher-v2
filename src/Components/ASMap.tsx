import React, { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";
import { Artwork, Gallery } from "../types";
import { fromLonLat, transformExtent } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Fill, Stroke, Style } from "ol/style";
import { extend, buffer } from "ol/extent";
import CircleStyle from "ol/style/Circle";

interface ASMapProps {
    galleries?: Gallery[];
    artworks?: Artwork[];
}

const ASMap: React.FC<ASMapProps> = ({ galleries = [], artworks = [] }) => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<Map | null>(null);

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

        const galleryStyle = new Style({
            image: new CircleStyle({
                radius: 8,
                // fill: new Fill({ color: "#809fff" }),
                stroke: new Stroke({ color: "#03123c", width: 2 }),
            }),
        });

        const artworkStyle = new Style({
            image: new CircleStyle({
                radius: 6,
                // fill: new Fill({ color: "#ff5733" }),
                stroke: new Stroke({ color: "#8b0000", width: 2 }),
            }),
        });

        const gallerySource = new VectorSource();
        const artworkSource = new VectorSource();

        // Add galleries as point features
        galleries.forEach((gallery) => {
            const feature = new Feature({
                geometry: new Point(fromLonLat([gallery.galleryLon, gallery.galleryLat])),
            });
            feature.setStyle(galleryStyle);
            gallerySource.addFeature(feature);

            let extent = gallerySource.getExtent();

            if (extent) {
                const bufferedExtent = buffer(extent, 1000); // Add a buffer to prevent excessive zoom-in
                map.getView().fit(bufferedExtent, {
                    padding: [50, 50, 50, 50],
                    // duration: 500,
                    maxZoom: 10, // Set a max zoom to prevent excessive close-ups
                });
            }

        });

        // Add artworks as point features
        artworks.forEach((artwork) => {
            const feature = new Feature({
                geometry: new Point(fromLonLat([artwork.galleryLon, artwork.galleryLat])),
            });
            feature.setStyle(artworkStyle);
            artworkSource.addFeature(feature);

            let extent = artworkSource.getExtent();

            if (extent) {
                const bufferedExtent = buffer(extent, 1000); // Add a buffer to prevent excessive zoom-in
                map.getView().fit(bufferedExtent, {
                    padding: [50, 50, 50, 50],
                    // duration: 500,
                    maxZoom: 10, // Set a max zoom to prevent excessive close-ups
                });
            }
        });

        const galleryLayer = new VectorLayer({ source: gallerySource });
        const artworkLayer = new VectorLayer({ source: artworkSource });

        map.addLayer(galleryLayer);
        map.addLayer(artworkLayer);


    }, [galleries, artworks]);

    return <div ref={mapRef} className="as-map" />;
};

export default ASMap;
