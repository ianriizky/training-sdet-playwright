import { z } from 'zod';

const envSchema = z.object({
  SAUCEDEMO_BASE_URL: z.url().optional().default('https://www.saucedemo.com'),
  SAUCEDEMO_USERNAME_STANDARD_USER: z.string(),
  SAUCEDEMO_PASSWORD_STANDARD_USER: z.string(),
  SAUCEDEMO_USERNAME_LOCKED_OUT_USER: z.string(),
  SAUCEDEMO_PASSWORD_LOCKED_OUT_USER: z.string(),
  SAUCEDEMO_USERNAME_PROBLEM_USER: z.string(),
  SAUCEDEMO_PASSWORD_PROBLEM_USER: z.string(),
  SAUCEDEMO_USERNAME_PERFORMANCE_GLITCH_USER: z.string(),
  SAUCEDEMO_PASSWORD_PERFORMANCE_GLITCH_USER: z.string(),
  SAUCEDEMO_USERNAME_ERROR_USER: z.string(),
  SAUCEDEMO_PASSWORD_ERROR_USER: z.string(),
  SAUCEDEMO_USERNAME_VISUAL_USER: z.string(),
  SAUCEDEMO_PASSWORD_VISUAL_USER: z.string(),

  ORANGEHRM_BASE_URL: z
    .url()
    .optional()
    .default('https://opensource-demo.orangehrmlive.com'),
  ORANGEHRM_USERNAME: z.string(),
  ORANGEHRM_PASSWORD: z.string(),

  TYPICODE_BASE_URL: z
    .url()
    .optional()
    .default('https://jsonplaceholder.typicode.com'),

  REQRES_BASE_URL: z.url().optional().default('https://reqres.in'),
  REQRES_API_KEY: z.string(),
});

const env = envSchema.parse(process.env);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface ProcessEnv extends EnvSchema {}
  }
}

export type EnvSchema = z.infer<typeof envSchema>;
export default env;
