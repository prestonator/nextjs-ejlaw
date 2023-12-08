"use client";
import React, { useEffect, useRef } from "react";

const CustomMap = () => {
	const mapRef = useRef(null);
	const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

	useEffect(() => {
		const loadMap = () => {
			const script = document.createElement("script");
			script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly&language=en&libraries=places,geometry&callback=initializeMap`;
			script.async = true;
			script.defer = true;
			document.body.appendChild(script);
		};

		const initializeMap = () => {
			const options = {
				center: {
					lat: 35.221145,
					lng: -97.442186,
				},
				zoom: 17,
				styles: [
					{
						featureType: "water",
						elementType: "geometry",
						stylers: [
							{
								color: "#e9e9e9",
							},
							{
								lightness: 17,
							},
						],
					},
					{
						featureType: "landscape",
						elementType: "geometry",
						stylers: [
							{
								color: "#f5f5f5",
							},
							{
								lightness: 20,
							},
						],
					},
					{
						featureType: "road.highway",
						elementType: "geometry.fill",
						stylers: [
							{
								color: "#ffffff",
							},
							{
								lightness: 17,
							},
						],
					},
					{
						featureType: "road.highway",
						elementType: "geometry.stroke",
						stylers: [
							{
								color: "#ffffff",
							},
							{
								lightness: 29,
							},
							{
								weight: 0.2,
							},
						],
					},
					{
						featureType: "road.arterial",
						elementType: "geometry",
						stylers: [
							{
								color: "#ffffff",
							},
							{
								lightness: 18,
							},
						],
					},
					{
						featureType: "road.local",
						elementType: "geometry",
						stylers: [
							{
								color: "#ffffff",
							},
							{
								lightness: 16,
							},
						],
					},
					{
						featureType: "poi",
						elementType: "geometry",
						stylers: [
							{
								color: "#f5f5f5",
							},
							{
								lightness: 21,
							},
						],
					},
					{
						featureType: "poi.park",
						elementType: "geometry",
						stylers: [
							{
								color: "#dedede",
							},
							{
								lightness: 21,
							},
						],
					},
					{
						elementType: "labels.text.stroke",
						stylers: [
							{
								visibility: "on",
							},
							{
								color: "#ffffff",
							},
							{
								lightness: 16,
							},
						],
					},
					{
						elementType: "labels.text.fill",
						stylers: [
							{
								saturation: 36,
							},
							{
								color: "#333333",
							},
							{
								lightness: 40,
							},
						],
					},
					{
						elementType: "labels.icon",
						stylers: [
							{
								visibility: "off",
							},
						],
					},
					{
						featureType: "transit",
						elementType: "geometry",
						stylers: [
							{
								color: "#f2f2f2",
							},
							{
								lightness: 19,
							},
						],
					},
					{
						featureType: "administrative",
						elementType: "geometry.fill",
						stylers: [
							{
								color: "#fefefe",
							},
							{
								lightness: 20,
							},
						],
					},
					{
						featureType: "administrative",
						elementType: "geometry.stroke",
						stylers: [
							{
								color: "#fefefe",
							},
							{
								lightness: 17,
							},
							{
								weight: 1.2,
							},
						],
					},
				],
				maxZoom: 20,
				minZoom: 0,
				mapTypeId: "roadmap",
				clickableIcons: true,
				disableDoubleClickZoom: true,
				draggable: true,
				keyboardShortcuts: true,
				scrollwheel: false,
			};

			const map = new window.google.maps.Map(mapRef.current, options);

			const markerOptions = {
				map: map,
				position: {
					lat: 35.221145,
					lng: -97.442186,
				},
				icon: {
					path: "M11 2c-3.9 0-7 3.1-7 7 0 5.3 7 13 7 13 0 0 7-7.7 7-13 0-3.9-3.1-7-7-7Zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5 0-1.4 1.1-2.5 2.5-2.5 1.4 0 2.5 1.1 2.5 2.5 0 1.4-1.1 2.5-2.5 2.5Z",
					scale: 1.6363636363636363636363636364,
					anchor: new window.google.maps.Point(11, 22),
					fillOpacity: 1,
					fillColor: "#edbb5f",
					strokeOpacity: 0,
				},
			};

			const marker = new window.google.maps.Marker(markerOptions);
		};

		window.initializeMap = initializeMap;

		loadMap();

		return () => {
			const scripts = document.querySelectorAll(
				`script[src*="maps.googleapis.com/maps/api/js?key=${apiKey}"]`
			);
			scripts.forEach((script) => document.body.removeChild(script));
			delete window.initializeMap;
		};
	}, [apiKey]);

	return <div style={{ width: "100%", height: "100%" }} ref={mapRef}></div>;
};

export default CustomMap;
