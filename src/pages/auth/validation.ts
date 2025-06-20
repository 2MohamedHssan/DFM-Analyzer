import { z } from "zod";

export const signUpschema = z
    .object({
        name: z
            .string()
            .min(2, "The name must be at least 2 characters")
            .nonempty("name is required")
            .regex(
                /^[A-Za-z\u0600-\u06FF\s]+$/,
                "Name must contain only English or Arabic letters"
            ),
        email: z
            .string()
            .min(1, "Email is required")
            .email("Invalid email")
            .regex(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(?:com|net|org|info|biz|name|pro|xyz|app|dev|tech|store|online|site|blog|design|ai|edu|gov|mil|museum|int|arpa|eg|sa|ae|uk|us|de|jp|in|cn|fr)$/,
                "Invalid Email format"
            ),
        password: z
            .string()
            .nonempty("Password is required")
            .min(8, "Password must be at least 8 characters")
            .regex(
                /^[A-Za-z0-9@$!%*?&_]+$/,
                "Password must contain only English characters and special characters"
            )
            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[0-9]/, "Password must contain at least one number")
            .regex(
                /[@$!%*?&_#~`'^+{}|<>,.;:=()[\]\\/-]/,
                "Password must contain at least one special character"
            ),
        confirmPassword: z.string().nonempty("Confirm Password is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
export type FormFields = z.infer<typeof signUpschema>;

export const Loginschema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email")
        .regex(
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            "Email must be in valid format and contain only English characters"
        ),
    password: z
        .string()
        .nonempty("Password is required")
});

export type LoginFields = z.infer<typeof Loginschema>;

export const Forgetschema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email")
        .regex(
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            "Email must be in valid format and contain only English characters"
        ),
});

export type ForgetFields = z.infer<typeof Forgetschema>;

export const Resetschema = z
    .object({
        password: z
            .string()
            .nonempty("Password is required")
            .min(8, "Password must be at least 8 characters")
            .regex(
                /^[A-Za-z0-9@$!%*?&_]+$/,
                "Password must contain only English characters and special characters"
            )
            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[0-9]/, "Password must contain at least one number")
            .regex(
                /[@$!%*?&_]/,
                "Password must contain at least one special character"
            ),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type ResetFields = z.infer<typeof Resetschema>;