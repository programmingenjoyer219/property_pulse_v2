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
		nightly_rate: number | null;
		weekly_rate: number | null;
		monthly_rate: number | null;
		images: string[];
		featured: boolean;
	}

	interface Message {
		id: number;
		marked_as_read: boolean;
		content: string;
		sender_name: string;
		sender_email: string;
		sender_phone_number: string;
		created_at: string;
		properties: {
			name: string;
		};
	}
}
export {};
