import { json } from "@sveltejs/kit";
import { OPENCAGE_API_KEY } from "$env/static/private";
import opencage from "opencage-api-client";

// POST : /api/map
export async function POST({ request }) {
	try {
		const location = await request.json();
		const { lat, lng } = await getCoordinatesFromLocation(location);
		return json({ lat, lng }, { status: 200 });
	} catch (error) {
		console.error(error);
		return json({ lat: 0, lng: 0 }, { status: 500 });
	}
}

interface Location {
	street: string;
	city: string;
	state: string;
	zipcode: string;
}

async function getCoordinatesFromLocation(
	location: Location
): Promise<{ lat: number; lng: number }> {
	const { street, city, state, zipcode } = location;

	const data = await opencage.geocode({
		q: `${street} ${city} ${state} ${zipcode}`,
		key: OPENCAGE_API_KEY,
	});

	if (data.status.code === 200 && data.results.length > 0) {
		const place = data.results[0];
		return { lat: place.geometry.lat, lng: place.geometry.lng };
	} else {
		console.error(
			"/api/map :: getCoordinatesFromLocation() :: Failed to fetch coordinates"
		);
		console.error("total_results", data.total_results);
		throw new Error("Status", data.status.message);
	}
}
