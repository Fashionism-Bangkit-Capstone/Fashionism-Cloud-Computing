const { Storage } = require('@google-cloud/storage');

const storage = new Storage({ keyFilename: 'google-cloud-key.json' });
const bucket = storage.bucket('fashionism');

exports.show = (model) => async (req, res) => {
  const { id } = req.params;

  try {
    const profile = await model.findByPk(id);

    if (!profile) {
      return res.status(404).send({ error: true, message: 'Not found.' });
    }

    return res.status(200).send({
      error: false,
      data: {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        address: profile.address,
        avatar: profile.avatar
          ? `https://storage.googleapis.com/fashionism/avatars/${profile.avatar}`
          : 'https://storage.googleapis.com/fashionism/avatars/default/avatar.png',
      },
    });
  } catch (err) {
    return res.status(500).send({ error: true, message: err.message });
  }
};

exports.update = (model) => async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address } = req.body;
  try {
    const profile = await model.findOne({
      where: {
        id,
      },
    });

    if (!profile) {
      return res.status(404).send({ error: true, message: 'Not found.' });
    }

    await model.update(
      {
        name,
        email,
        phone,
        address,
      },
      {
        where: {
          id,
        },
      },
    );

    if (req.file) {
      const folder = 'avatars/';
      const ext = req.file.originalname.substring(
        req.file.originalname.lastIndexOf('.'),
        req.file.originalname.length,
      );
      const fileName = `${Math.random()
        .toString(36)
        .substring(2, 15)}${Math.random().toString(36).substring(2, 15)}${ext}`;

      const blob = bucket.file(folder + fileName);
      const blobStream = blob.createWriteStream({
        resumable: false,
      });

      blobStream.on('error', (err) => {
        res.status(500).send({ error: true, message: err.message });
      });

      blobStream.on('finish', async () => {
        try {
          await bucket.file(folder + fileName).makePublic();
        } catch (err) {
          return res.status(500).send({ error: true, message: err.message });
        }
      });

      blobStream.end(req.file.buffer);
      const oldAvatar = profile.avatar;
      if (oldAvatar) {
        const oldBlob = bucket.file(folder + oldAvatar);
        await oldBlob.delete();
      }

      await model.update(
        {
          avatar: fileName,
        },
        {
          where: {
            id,
          },
        },
      );
    }

    return res.status(200).send({
      error: false,
      message: 'Profile updated successfully!',
    });
  } catch (err) {
    return res.status(500).send({ error: true, message: err.message });
  }
};
