// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface Property {
		id: number;
		created_at: string;
		owner_email: string;
		name: string;
		type: string;
		description: string;
		street: string;
		city: string;
		state: string;
		zipcode: string;
		beds: number;
		baths: number;
		square_feet: number;
		amenities: string[];
		nightly_rate: number;
		weekly_rate: number;
		monthly_rate: number;
		images: string[];
		featured: boolean;
	}
}

export {};
