import { z } from "zod";

export const ZUser = z.object({
    username: z.string(),
    password: z.string(),
    age: z.number()
})

export type TUser = z.infer<typeof ZUser>