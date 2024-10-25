import { z } from "zod";

export type AddPropertyFormData = Omit<
	Property,
	"id" | "created_at" | "featured"
>;

export type EditPropertyFormData = Omit<
	Property,
	"created_at" | "featured" | "images" | "owner_email"
>;

export const addPropertyFormSchema = z
	.object({
		owner_email: z
			.string({
				required_error: "Owner email is required",
			})
			.email("Invalid email address"),

		name: z
			.string({
				required_error: "Property name is required",
			})
			.min(1, "Property name cannot be empty"),

		type: z
			.string({
				required_error: "Property type is required",
			})
			.min(1, "Property type cannot be empty"),

		description: z
			.string({
				required_error: "Description is required",
			})
			.min(1, "Description cannot be empty"),

		street: z
			.string({
				required_error: "Street is required",
			})
			.min(1, "Street cannot be empty"),

		city: z
			.string({
				required_error: "City is required",
			})
			.min(1, "City cannot be empty"),

		state: z
			.string({
				required_error: "State is required",
			})
			.min(1, "State cannot be empty"),

		zipcode: z
			.string({
				required_error: "Zipcode is required",
			})
			.min(1, "Zipcode cannot be empty"),

		beds: z
			.number({
				required_error: "Number of beds is required",
			})
			.positive("Number of beds must be a positive number"),

		baths: z
			.number({
				required_error: "Number of baths is required",
			})
			.positive("Number of baths must be a positive number"),

		square_feet: z
			.number({
				required_error: "Square feet is required",
			})
			.positive("Square feet must be a positive number"),

		amenities: z
			.array(z.string(), {
				required_error: "Amenities are required",
			})
			.nonempty("Amenities cannot be empty"),

		// Allow these three rates to be optional initially
		nightly_rate: z.number().nullable().optional(),
		weekly_rate: z.number().nullable().optional(),
		monthly_rate: z.number().nullable().optional(),

		images: z
			.array(z.string(), {
				required_error: "Images are required",
			})
			.nonempty("At least one image is required"),
	})
	.refine(
		(data) => data.nightly_rate || data.weekly_rate || data.monthly_rate,
		{
			message: "At least one of nightly, weekly, or monthly rate is required",
			path: ["nightly_rate", "weekly_rate", "monthly_rate"], // Applies the error to all three fields
		}
	);

export const editPropertyFormSchema = z
	.object({
		name: z
			.string({
				required_error: "Property name is required",
			})
			.min(1, "Property name cannot be empty"),

		type: z
			.string({
				required_error: "Property type is required",
			})
			.min(1, "Property type cannot be empty"),

		description: z
			.string({
				required_error: "Description is required",
			})
			.min(1, "Description cannot be empty"),

		street: z
			.string({
				required_error: "Street is required",
			})
			.min(1, "Street cannot be empty"),

		city: z
			.string({
				required_error: "City is required",
			})
			.min(1, "City cannot be empty"),

		state: z
			.string({
				required_error: "State is required",
			})
			.min(1, "State cannot be empty"),

		zipcode: z
			.string({
				required_error: "Zipcode is required",
			})
			.min(1, "Zipcode cannot be empty"),

		beds: z
			.number({
				required_error: "Number of beds is required",
			})
			.positive("Number of beds must be a positive number"),

		baths: z
			.number({
				required_error: "Number of baths is required",
			})
			.positive("Number of baths must be a positive number"),

		square_feet: z
			.number({
				required_error: "Square feet is required",
			})
			.positive("Square feet must be a positive number"),

		amenities: z
			.array(z.string(), {
				required_error: "Amenities are required",
			})
			.nonempty("Amenities cannot be empty"),

		// Allow these three rates to be optional initially
		nightly_rate: z.number().nullable().optional(),
		weekly_rate: z.number().nullable().optional(),
		monthly_rate: z.number().nullable().optional(),
	})
	.refine(
		(data) => data.nightly_rate || data.weekly_rate || data.monthly_rate,
		{
			message: "At least one of nightly, weekly, or monthly rate is required",
			path: ["nightly_rate", "weekly_rate", "monthly_rate"], // Applies the error to all three fields
		}
	);
