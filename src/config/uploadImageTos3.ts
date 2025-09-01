import AWS from 'aws-sdk';
import { Request } from 'express';


const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    region: process.env.AWS_REGION!,
});

export const uploadImageToS3 = async (req: Request): Promise<string> => {
    if (!req.file) {
        throw new Error('No image found in request');
    }

    const imageBuffer = req.file.buffer;
    const imageName = `${Date.now()}-${req.file.originalname}`;
    const bucketName = process.env.AWS_S3_BUCKET_NAME!;

    const params = {
        Bucket: bucketName,
        Key: imageName,
        Body: imageBuffer,
        ContentType: req.file.mimetype,
        ACL: 'public-read',
    };

    const uploadResult = await s3.upload(params).promise();
    return uploadResult.Location;
};