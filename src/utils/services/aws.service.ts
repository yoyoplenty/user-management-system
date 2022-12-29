import { S3 } from 'aws-sdk';
import { UnprocessableEntityException, Injectable } from '@nestjs/common';

@Injectable()
export class AwsService {
  async uploadPublicFile(data) {
    try {
      const { file, name } = data;
      const s3 = new S3({
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_KEY_SECRET,
      });

      const uploadFile = await s3
        .upload({
          Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
          Key: name,
          Body: file.buffer,
        })
        .promise();

      return uploadFile;
    } catch (error) {
      if (error.code) throw new UnprocessableEntityException(error.code);
      throw new UnprocessableEntityException(error);
    }
  }

  async deletePublicFile(img_key) {
    const s3 = new S3();

    await s3
      .deleteObject({
        Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
        Key: img_key,
      })
      .promise();

    return s3;
  }
}
