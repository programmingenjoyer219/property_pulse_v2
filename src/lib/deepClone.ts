export default function deepClone(arg: any) {
	if (arg === null || typeof arg !== "object") return arg;
	const newArg: any = Array.isArray(arg) ? [] : {};
	for (const key in arg) {
		const newValue = arg[key];
		newArg[key] = deepClone(newValue);
	}
	return newArg;
}
