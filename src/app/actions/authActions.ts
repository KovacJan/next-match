"use server";

import { auth, signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { LoginSchema } from "@/lib/schemas/loginSchema";
import { registerSchema, RegisterSchema } from "@/lib/schemas/registerSchema";
import { ActionResult } from "@/types";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

export async function signInUser(
  data: LoginSchema
): Promise<ActionResult<string>> {
  try {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    return { status: "success", data: "Logged in" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { status: "error", error: "Invalid credentials" };
        default:
          return {
            status: "error",
            error: "An error occurred while signing in",
          };
      }
    } else {
      return {
        status: "error",
        error: "An error occurred while signing in",
      };
    }
  }
}

export async function signOutUser() {
  await signOut({ redirectTo: "/" });
}

/**
 * Registers a new user.
 *
 * @param data - The user registration data conforming to the RegisterSchema.
 * @returns An object containing either the created user data or an error message.
 *
 * @remarks
 * This function performs the following steps:
 * 1. Validates the input data against the RegisterSchema.
 * 2. Hashes the user's password using bcrypt.
 * 3. Checks if a user with the provided email already exists in the database.
 * 4. If the email is unique, creates a new user record in the database.
 *
 * @example
 * ```typescript
 * const userData = { name: 'John Doe', email: 'john.doe@example.com', password: 'password123' };
 * const result = await registerUser(userData);
 * if (result.error) {
 *   console.error(result.error);
 * } else {
 *   console.log('User registered successfully:', result);
 * }
 * ```
 */
export async function registerUser(
  data: RegisterSchema
): Promise<ActionResult<User>> {
  try {
    const validated = registerSchema.safeParse(data);

    if (!validated.success) {
      return { status: "error", error: validated.error.errors };
    }

    const { name, email, password } = validated.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { status: "error", error: "User with that email already exists" };
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
      },
    });

    return { status: "success", data: user };
  } catch (error) {
    return {
      status: "error",
      error: "An error occurred while registering the user",
    };
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id },
  });
}

export async function getAuthUserId() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  return userId;
}
