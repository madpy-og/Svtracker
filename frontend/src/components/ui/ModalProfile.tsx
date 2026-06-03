import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type UploadSchema, uploadSchema } from "../../schemas/uploadSchema";
import Card from "./Card";
import { Download } from "lucide-react";
import { uploadToCloudinary } from "../../api/cloudinaryApi";
import { updateProfileImage } from "../../api/userApi";
import { useUIStore } from "../../store/uiStore";
import { useFinanceStore } from "../../store/financeStore";

const ModalProfile = () => {
  const { openModal, closeModal } = useUIStore();
  const { fetchProfile } = useFinanceStore();

  const form = useForm<UploadSchema>({
    resolver: zodResolver(uploadSchema),
  });

  const handleSubmit = async (value: UploadSchema) => {
    try {
      const { image } = value;
      if (!image) return;

      const data = await uploadToCloudinary(image, "avatar");
      if (!data?.url || !data?.publicId) {
        throw new Error("Upload to Cloudinary failed");
      }

      await updateProfileImage(data.url, data.publicId);
      await fetchProfile(); // Sync profile data after upload
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  if (openModal === "editProfile") {
    return (
      <>
        <div
          onClick={closeModal}
          className="fixed inset-0 z-90 bg-black/40 transition-opacity duration-30 opacity-100"
        ></div>
        <div className="fixed z-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Card className="relative w-90">
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              id="upload-avatar-form"
              className="flex flex-col items-center justify-center mb-4"
            >
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files?.[0];
                  if (!file) return;

                  form.setValue("image", file, { shouldValidate: true });
                }}
                className="w-full h-50 flex flex-col gap-2 justify-center items-center border-2 border-dashed border-cusdarkgrey rounded-md"
              >
                <label
                  htmlFor="file"
                  className="flex items-center justify-center gap-1 text-bs-m md:text-bs bg-cusgrey text-cusblack font-semibold py-1 pl-3 pr-4 rounded-md hover:bg-cusdarkgrey/30 cursor-pointer"
                >
                  <Download size={14} strokeWidth={2.5} />
                  Upload
                </label>
                <input
                  type="file"
                  id="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    form.setValue("image", file, { shouldValidate: true });
                  }}
                />
                <div className="text-center">
                  <p className="text-bs-m md:text-bs text-cusblack font-semibold">
                    Choose a file or drag & drop{" "}
                    <span className="text-cusorange font-bold">image</span>
                  </p>
                  <p className="text-capt-m md:text-capt text-cusdarkgrey font-semibold">
                    JPEG and PNG formats, maximum 2 mb image size
                  </p>
                </div>
              </div>
            </form>
            <div className="flex justify-center gap-2">
              <button
                type="submit"
                form="upload-avatar-form"
                className="text-bs-m md:text-bs bg-cusorange text-cuswhite font-semibold py-1 px-4 rounded-md hover:bg-cusred cursor-pointer"
              >
                Save
              </button>
              <button
                onClick={closeModal}
                className="text-bs-m md:text-bs bg-cusgrey text-cusblack font-semibold py-1 px-4 rounded-md hover:bg-cusdarkgrey/30 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </Card>
        </div>
      </>
    );
  }

  return null;
};

export default ModalProfile;
