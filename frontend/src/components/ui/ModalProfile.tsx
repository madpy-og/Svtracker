import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type UploadSchema, uploadSchema } from "../../schemas/uploadSchema";
import Card from "./Card";
import { Download, X, Image as ImageIcon } from "lucide-react";
import { uploadToCloudinary } from "../../api/cloudinaryApi";
import { updateProfileImage } from "../../api/userApi";
import { useUIStore } from "../../store/uiStore";
import { useQueryClient } from "@tanstack/react-query";
import { userKeys } from "../../hooks/useUser";

const ModalProfile = () => {
  const { openModal, closeModal } = useUIStore();
  const queryClient = useQueryClient();

  const form = useForm<UploadSchema>({
    resolver: zodResolver(uploadSchema),
  });

  const selectedImage = form.watch("image");

  const handleClose = () => {
    form.reset();
    closeModal();
  };

  const handleSubmit = async (value: UploadSchema) => {
    try {
      const { image } = value;
      if (!image) return;

      const data = await uploadToCloudinary(image, "avatar");
      if (!data?.url || !data?.publicId) {
        throw new Error("Upload to Cloudinary failed");
      }

      await updateProfileImage(data.url, data.publicId);
      await queryClient.invalidateQueries({ queryKey: userKeys.profile }); // Sync profile data after upload
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  if (openModal === "editProfile") {
    return (
      <>
        <div
          onClick={handleClose}
          className="fixed inset-0 z-90 bg-black/40 transition-opacity duration-300 opacity-100"
        ></div>
        <div className="fixed z-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[420px]">
          <Card className="relative w-full shadow-2xl p-5 md:p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-cusgrey pb-3">
              <h2 className="text-h5-m md:text-h5 font-bold text-cusblack">Update Profile Picture</h2>
              <button
                onClick={handleClose}
                className="p-1 rounded-md text-cusdarkgrey hover:bg-cusgrey hover:text-cusblack transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-5">
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                id="upload-avatar-form"
                className="flex flex-col items-center justify-center"
              >
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files?.[0];
                    if (!file) return;

                    form.setValue("image", file, { shouldValidate: true });
                  }}
                  className={`w-full h-48 flex flex-col gap-3 justify-center items-center border-2 border-dashed rounded-lg transition-colors ${selectedImage ? "border-cusorange bg-cusorange/5" : "border-cusdarkgrey hover:border-cusorange/50"
                    }`}
                >
                  {selectedImage ? (
                    <div className="flex flex-col items-center gap-2 text-center px-4">
                      <div className="p-3 bg-cusorange/20 rounded-full text-cusorange">
                        <ImageIcon size={32} />
                      </div>
                      <p className="text-bd-m md:text-bd font-semibold text-cusblack line-clamp-1 break-all">
                        {selectedImage.name}
                      </p>
                      <p className="text-capt-m md:text-capt text-cusdarkgrey font-medium">
                        {(selectedImage.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                      <label
                        htmlFor="file"
                        className="mt-2 text-bs-m md:text-bs bg-cusgrey text-cusblack font-semibold py-1 px-4 rounded-md hover:bg-cusdarkgrey/30 cursor-pointer transition-colors"
                      >
                        Change File
                      </label>
                    </div>
                  ) : (
                    <>
                      <label
                        htmlFor="file"
                        className="flex items-center justify-center gap-2 text-bs-m md:text-bs bg-cusgrey text-cusblack font-semibold py-1.5 px-4 rounded-md hover:bg-cusdarkgrey/30 cursor-pointer transition-colors"
                      >
                        <Download size={16} strokeWidth={2.5} />
                        Upload File
                      </label>
                      <div className="text-center px-4">
                        <p className="text-bs-m md:text-bs text-cusblack font-semibold mb-1">
                          Choose a file or drag & drop
                        </p>
                        <p className="text-capt-m md:text-capt text-cusdarkgrey font-medium">
                          JPEG, PNG formats up to 2MB
                        </p>
                      </div>
                    </>
                  )}

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
                </div>
              </form>

              <div className="flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={form.formState.isSubmitting}
                  className="px-4 h-9 md:h-10 border border-cusdarkgrey hover:bg-cusgrey text-cusblack text-bd-m md:text-bd font-semibold rounded-md transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="upload-avatar-form"
                  disabled={form.formState.isSubmitting || !selectedImage}
                  className={`${form.formState.isSubmitting || !selectedImage
                    ? "bg-cusred opacity-70 cursor-not-allowed"
                    : "bg-cusorange hover:bg-cusred cursor-pointer active:scale-95"
                    } px-5 h-9 md:h-10 text-cuswhite text-bd-m md:text-bd font-semibold rounded-md shadow-md transition-all`}
                >
                  {form.formState.isSubmitting ? "Uploading..." : "Save Picture"}
                </button>
              </div>
            </div>
          </Card>
        </div>
      </>
    );
  }

  return null;
};

export default ModalProfile;
