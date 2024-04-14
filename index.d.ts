import { z } from "zod";

const envVariables = z.object({
  NEXT_PUBLIC_GOOGLE_MAP_API: z.string(),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
