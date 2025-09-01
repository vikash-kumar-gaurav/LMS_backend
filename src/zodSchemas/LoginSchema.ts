import { z} from 'zod';

export const loginSchema = z.object({
    email:z.string().email("Invalid email format"),
    password:z.string().min(6, "password must be at least 6 characters")
});


//now zod gives a types safety like we use in interface, 
export type LoginUserInput = z.infer<typeof loginSchema>