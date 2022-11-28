import Axios from "axios";

export const Cloudinary = async (aiUrl: string) => {
  const url = process.env.VUE_APP_CLOUDINARY_URL as string;
  let cloudinaryImgData = {};

  const formData = new FormData();
  formData.append("file", aiUrl);
  formData.append(
    "upload_preset",
    process.env.VUE_APP_CLOUDINARY_KEY as string
  );

  await Axios.post(url, formData)
    .then((response) => {
      cloudinaryImgData = response.data;
    })
    .catch((e) => console.log("error", e));

  return cloudinaryImgData;
};
