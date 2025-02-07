import type {
  InsertUser,
  SelectUser,
  Habit,
  HabitEntry,
} from "../types/schema";

export interface ApiError {
  message: string;
  status?: number;
}

export interface AuthResponse {
  message: string;
  user: SelectUser;
  token: string;
}

export type ApiResponse<T> =
  | { ok: true; data: T }
  | { ok: false; error: ApiError };

const API_BASE_URL = process.env.API_BASE_URL || "/api"; // Allows dynamic API base URL

async function handleRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const headers: HeadersInit = Object.assign(
      {},
      options.headers,
      options.body ? { "Content-Type": "application/json" } : {}
    );

    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers,
      credentials: "include", // Enables auth cookies
    });

    const contentType = response.headers.get("content-type");
    const responseData = contentType?.includes("application/json")
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      return {
        ok: false,
        error: {
          message:
            (typeof responseData === "object" && responseData.message) ||
            response.statusText ||
            "An error occurred",
          status: response.status,
        },
      } as const;
    }

    return { ok: true, data: responseData } as const;
  } catch (error) {
    return {
      ok: false,
      error: {
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        status: 500,
      },
    } as const;
  }
}

export const api = {
  auth: {
    async login(
      credentials: Pick<InsertUser, "username" | "password">
    ): Promise<ApiResponse<AuthResponse>> {
      return handleRequest<AuthResponse>("/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });
    },

    async register(userData: InsertUser): Promise<ApiResponse<AuthResponse>> {
      return handleRequest<AuthResponse>("/register", {
        method: "POST",
        body: JSON.stringify(userData),
      });
    },

    async getCurrentUser(): Promise<ApiResponse<SelectUser>> {
      return handleRequest<SelectUser>("/user");
    },

    async logout(): Promise<ApiResponse<void>> {
      return handleRequest<void>("/logout", { method: "POST" });
    },
  },

  habits: {
    async getAll(): Promise<ApiResponse<Habit[]>> {
      return handleRequest<Habit[]>("/habits");
    },

    async create(
      habit: Omit<Habit, "id" | "userId" | "createdAt" | "updatedAt">
    ): Promise<ApiResponse<Habit>> {
      return handleRequest<Habit>("/habits", {
        method: "POST",
        body: JSON.stringify(habit),
      });
    },

    async get(id: number): Promise<ApiResponse<Habit>> {
      return handleRequest<Habit>(`/habits/${id}`);
    },

    async update(
      id: number,
      habit: Partial<Omit<Habit, "id" | "userId" | "createdAt" | "updatedAt">>
    ): Promise<ApiResponse<Habit>> {
      return handleRequest<Habit>(`/habits/${id}`, {
        method: "PUT",
        body: JSON.stringify(habit),
      });
    },

    async delete(id: number): Promise<ApiResponse<void>> {
      return handleRequest<void>(`/habits/${id}`, {
        method: "DELETE",
      });
    },
  },

  habitEntries: {
    async getAll(): Promise<ApiResponse<HabitEntry[]>> {
      return handleRequest<HabitEntry[]>("/habit-entries");
    },

    async logEntry(
      entry: Omit<HabitEntry, "id" | "userId" | "createdAt" | "updatedAt">
    ): Promise<ApiResponse<HabitEntry>> {
      return handleRequest<HabitEntry>("/habit-entries", {
        method: "POST",
        body: JSON.stringify(entry),
      });
    },

    async get(id: number): Promise<ApiResponse<HabitEntry>> {
      return handleRequest<HabitEntry>(`/habit-entries/${id}`);
    },

    async update(
      id: number,
      entry: Partial<
        Omit<HabitEntry, "id" | "userId" | "createdAt" | "updatedAt">
      >
    ): Promise<ApiResponse<HabitEntry>> {
      return handleRequest<HabitEntry>(`/habit-entries/${id}`, {
        method: "PUT",
        body: JSON.stringify(entry),
      });
    },

    async delete(id: number): Promise<ApiResponse<void>> {
      return handleRequest<void>(`/habit-entries/${id}`, {
        method: "DELETE",
      });
    },
  },
};
