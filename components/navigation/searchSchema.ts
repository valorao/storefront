import { z } from 'zod';

export const searchSchema = z.object({
    search: z.string()
        .refine((value) => {
            const parts = value.split("#");
            return parts.length === 2 && parts[0].length > 0 && parts[1].length > 0;
        }, (value) => ({
            message: `A busca "${value}" deve seguir o formato nome#tag`
        })),
});