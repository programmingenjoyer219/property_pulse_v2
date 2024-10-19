import { writable, get, derived } from "svelte/store";

export const propertiesStore = writable<Property[]>([]);

export const numberOfPropertiesToDisplay = writable(40);

export const propertiesToDisplay = derived(
	[propertiesStore, numberOfPropertiesToDisplay],
	([$propertiesStore, $numberOfPropertiesToDisplay]) =>
		$propertiesStore.slice(0, $numberOfPropertiesToDisplay)
);

export const canShowMoreProperties = derived(
	[propertiesStore, propertiesToDisplay],
	([$propertiesStore, $propertiesToDisplay]) =>
		$propertiesToDisplay.length < $propertiesStore.length,
	true
);

export function showMoreProperties() {
	if (get(canShowMoreProperties)) {
		numberOfPropertiesToDisplay.update((i) => i + 40);
	}
}
