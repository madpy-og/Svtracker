import { z } from "zod";

export const uploadSchema = z.object({
  image: z
    .custom<File>((file) => file instanceof File, {
      message: "File wajib diisi",
    })
    .refine((file) => file.size <= 2 * 1024 * 1024, {
      message: "Maksimal 2MB",
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      { message: "Format tidak didukung" },
    ),
});

export type UploadSchema = z.infer<typeof uploadSchema>;
