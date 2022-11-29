import Axios from "axios";

export const Cloudinary = async (aiUrl: string) => {
  const url = import.meta.env.VITE_CLOUDINARY_URL as string;
  let cloudinaryImgData = {};

  const formData = new FormData();
  formData.append("file", aiUrl);
  formData.append(
    "upload_preset",
    import.meta.env.VITE_CLOUDINARY_KEY as string
  );

  await Axios.post(url, formData)
    .then((response) => {
      cloudinaryImgData = response.data;
    })
    .catch((e) => console.log("error", e));

  return cloudinaryImgData;
};
