import { writable, get, derived } from "svelte/store";

export const propertiesStore = writable<Property[]>([]);

export const propertiesPerSet = writable(40);

export const propertiesToDisplay = derived(
	[propertiesStore, propertiesPerSet],
	([$propertiesStore, $propertiesPerSet]) =>
		$propertiesStore.slice(0, $propertiesPerSet)
);

export function showMoreProperties() {
	const propertyCount = get(propertiesStore).length;
	const displayedPropertyCount = get(propertiesToDisplay).length;
	if (displayedPropertyCount < propertyCount) {
		propertiesPerSet.update((i) => i + 40);
	}
}
