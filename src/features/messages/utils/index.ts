export function formatDate(dateString: string) {
	const date = new Date(dateString);
	const options = {
		month: "2-digit",
		day: "2-digit",
		year: "numeric",
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	};
	const formattedDate = date.toLocaleString("en-US", options);
	return formattedDate
		.replace(",", "")
		.replace(/:([0-9]{2})$/, "$1")
		.replace(" AM", "AM")
		.replace(" PM", "PM");
}

export function formatName(name: string) {
	name = name.split(" ")[0];
	return name[0].toUpperCase() + name.slice(1);
}
