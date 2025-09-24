import { defineConfig } from "vitest/config";
export default defineConfig({
	test: {
		include: ["apiTests/vitest/**/*.spec.ts"],
	},
});
