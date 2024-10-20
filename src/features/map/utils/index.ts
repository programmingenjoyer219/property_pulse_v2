import { PUBLIC_OPENCAGE_API_KEY } from "$env/static/public";
import opencage from "opencage-api-client";

export async function getCoordinatesFromLocation(
	street: string,
	city: string,
	state: string,
	zipcode: string
): Promise<{ lat: number; lng: number }> {
	const data = await opencage.geocode({
		q: `${street} ${city} ${state} ${zipcode}`,
		key: PUBLIC_OPENCAGE_API_KEY,
	});

	if (data.status.code === 200 && data.results.length > 0) {
		const place = data.results[0];
		return { lat: place.geometry.lat, lng: place.geometry.lng };
	}

	console.error("Failed to fetch coordinates");
	console.error("Status", data.status.message);
	return { lat: 0, lng: 0 };
}
