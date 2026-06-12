import dotenv from "dotenv";
import { afterEach, beforeEach, vi } from "vitest";

// Load base test env first, then local overrides written by global setup
dotenv.config({ quiet: true, path: ".env.test" });
dotenv.config({ quiet: true, path: ".env.test.local" });

// Mock dependencies BEFORE any imports that use them
vi.mock("@stackframe/stack", () => ({
  __esModule: true,
  StackServerApp: vi.fn().mockImplementation(() => ({
    getUser: vi.fn().mockResolvedValue(null),
  })),
}));

vi.mock("@/stack/server", () => ({
  __esModule: true,
  stackServerApp: {
    getUser: vi.fn().mockResolvedValue(null),
  },
}));

// Mock Next.js redirect function
vi.mock("next/navigation", () => ({
  __esModule: true,
  redirect: vi.fn(),
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  })),
  usePathname: vi.fn(),
}));

// Mock the AI summarize service globally
vi.mock("@/ai/summarize", () => ({
  __esModule: true,
  default: vi.fn().mockResolvedValue("This is a test summary."),
}));

// Setup and cleanup hooks can be added here

beforeEach(async () => {
  // Setup code before each test
});

afterEach(async () => {
  // Cleanup code after each test
});
