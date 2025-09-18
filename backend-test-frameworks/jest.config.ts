const jestConfig = {
	projects: [
    {
      displayName: 'api',
	  testMatch: ['<rootDir>/apiTests/jest/**/*.spec.ts'],
    },
    {
      displayName: 'unit',
      testMatch: ['<rootDir>/tests/jest/**/*.spec.ts'],
    },
  ],
};

export default jestConfig;
