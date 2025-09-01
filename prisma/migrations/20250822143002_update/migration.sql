-- AlterTable
ALTER TABLE "public"."course" ADD COLUMN     "thumbnail_url" TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/dcnp0gkrx/image/upload/v1755872612/4f95e7dc-e5b7-4c74-96e4-7e23e3125bfd.png';

-- AlterTable
ALTER TABLE "public"."lesson" ADD COLUMN     "thumbnail_url" TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/dcnp0gkrx/image/upload/v1755872612/4f95e7dc-e5b7-4c74-96e4-7e23e3125bfd.png';
