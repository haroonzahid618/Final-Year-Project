import ImageKit from '@imagekit/nodejs';

const imageFeature = new ImageKit({
  privateKey: process.env.IMAGEFEATURE_KEY,
});

export default imageFeature;