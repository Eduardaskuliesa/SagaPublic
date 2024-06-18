/* eslint-disable no-await-in-loop */
import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import connectToDB from '@/lib/mongoose';
import Album from '../../../models/Album';
import cloudinary from '../../../utils/cloudinary';

const jwt = require('jsonwebtoken');

export const PUT = async (req: NextRequest) => {
  try {
    const token = req.cookies.get('saga-sessionToken')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Neturi teises!' }, { status: 401 });
    }

    const validToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!validToken) {
      return NextResponse.json({ error: 'Neturi teises!' }, { status: 401 });
    }

    const data = await req.formData();

    const name = data.get('name');
    const date = data.get('date');
    const id = data.get('id');

    const imageFile: File | null = data.get(
      'image',
    ) as unknown as File;

    if (!imageFile) {
      return NextResponse.json(
        { error: 'Nepavyko sukurti albumo! Reikia nuotrauku!' },
        { status: 400 },
      );
    }

    const imageBytes = await imageFile.arrayBuffer();
    // const imagesBytesPromises = imagesFiles.map((image) => image.arrayBuffer());

    const imageBuffer = Buffer.from(imageBytes);

    // const image: {
    //   public_id: any;
    //   url: any;
    //   width: any;
    //   height: any;
    // }[] = [];

    // const resultPromises = imagesBuffer.map((image) => cloudinary.v2.uploader.upload(
    //   `data:image/jpeg;base64,${image.toString('base64')}`,
    //   {
    //     folder: 'albumImages',
    //   },
    // ));

    const uploadingToCloudinary = await cloudinary.v2.uploader.upload(
      `data:image/jpeg;base64,${imageBuffer.toString('base64')}`,
      {
        folder: 'albumImages',
      },
    );
    // results.forEach((result) => images.push({
    //   public_id: result.public_id,
    //   url: result.secure_url,
    //   width: result.width,
    //   height: result.height,
    // }));
    const image = ({
      public_id: uploadingToCloudinary.public_id,
      url: uploadingToCloudinary.secure_url,
      width: uploadingToCloudinary.width,
      height: uploadingToCloudinary.height,
    });
    let album;
    await connectToDB();
    if (!id) {
      album = await Album.create({
        name,
        date,
        images: image,
      });
    } else {
      album = await Album.findOneAndUpdate({
        _id: id,
      }, {
        $push: { images: image },
      });
    }
    revalidateTag('Albums');
    console.log('album', album);
    return NextResponse.json(
      { message: 'Album created!', id: album._id },
      { status: 201 },
    );
  } catch (error) {
    console.log('album/post', error);
    return NextResponse.json(
      { message: 'Unable to create album' },
      { status: 400 },
    );
  }
};

export const GET = async () => {
  try {
    await connectToDB();
    const albums = await Album.find().sort({ date: -1 });
    return NextResponse.json({ albums });
  } catch (error) {
    console.log('album/get');
    return NextResponse.json({ error: 'Unable to Load' }, { status: 404 });
  }
};
