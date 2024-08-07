/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      `${process.env.S3_UPLOAD_BUCKET}.s3.amazonaws.com`,
      `${process.env.S3_UPLOAD_BUCKET}.s3.${process.env.S3_UPLOAD_REGION}.amazonaws.com`,
      "clavis-wholesale.s3.us-east-1.amazonaws.com",
    ],
  },
};

export default nextConfig;
