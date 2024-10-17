import fs from 'fs';
import { v4 } from 'uuid';
import Hike from '../models/hike';
import Hiker from '../models/hiker';
import authenticateUser from './utils';

class HikeController {
  static async createHike(req, res) {
    const hiker = await authenticateUser(req, res);

    if (hiker) {
      const { title, description, country, city, startDate, duration } = JSON.parse(req.fields.json);
      const { image } = req.files;

      const fields = {
        title,
        country,
        city,
        startDate,
        duration,
      };
      for (const field in fields) {
        if (!fields[field]) {
          return res.status(400).json({ error: `Missing required field [${field}]` });
        }
      }
      const startDateObj = new Date(startDate);
      if (startDateObj.toString() === 'Invalid Date') {
        return res.status(400).json({ error: 'Invalid date' });
      }
      const hike = new Hike({
        title,
        description,
        country,
        city,
        startDate: startDateObj,
        duration,
      });

      if (image) {
        const fileName = v4();
        const newFilePath = `./public/hike_images/${fileName}`;
  
        await fs.promises.rename(image.path, newFilePath);
        hike.image = fileName;
      }

      await hike.save();
      await Hike.updateOne({
        _id: hike._id,
      }, {
        $push: {
          hikers: { hikerId: hiker._id },
        },
      });
      return res.status(201).json({
        id: hike.id,
        title,
        description,
        country,
        city,
        startDate,
        duration,
        hikers: hike.hikers,
      });
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }

  static async showAllHikes(req, res) {
    const hiker = await authenticateUser(req, res);

    if (hiker) {
      const { page } = req.query;
      const hikes = await Hike.find({}).skip(20 * page).limit(20);

      return res.json(hikes.map((hike) => hike.toJson()));
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }

  static async getHike(req, res) {
    const hiker = await authenticateUser(req, res);

    if (hiker) {
      const { id } = req.params;
      const hike = await Hike.findById(id);

      if (hike) {
        const hikeJson = hike.toJson()
	const hikersJson = [];
        for (const { hikerId } of hikeJson.hikers) {
	  const hikeMember = await Hiker.findById(hikerId);
	  if (hikeMember) {
	    hikersJson.push(hikeMember.toJson());
	  }
	}
	hikeJson.hikers = hikersJson;
	const messagesJson = [];
	for (const { text, senderId } of hikeJson.messages) {
	  const sender = await Hiker.findById(senderId);
	  if (sender) {
	    messagesJson.push({
	      text,
	      sender: sender.toJson()
	    })
	  }
	}
	hikeJson.messages = messagesJson;
        return res.json(hikeJson);
      }
      return res.status(404).json({ error: 'Unrecognized ID' });
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }

  static async joinHike(req, res) {
    const hiker = await authenticateUser(req, res);

    if (hiker) {
      const { hikeId } = req.body;
      const hike = await Hike.findById(hikeId);

      if (hike) {
        const hikerHasHike = await Hike.findOne({
          _id: hikeId,
          hikers: {
            $elemMatch: { hikerId: hiker._id }
          },
        });

        if (!hikerHasHike) {
          await Hike.updateOne({
            _id: hikeId,
          }, {
            $push: {
              hikers: { hikerId: hiker._id },
            },
          });
	  await Hiker.updateOne({
	    _id: hiker._id
	  }, {
	    $pull: {
	      invites: { hikeId: hike._id }
	    }
	  });
        }
        return res.json({});
      }
      return res.status(404).json({ error: 'Unrecognized ID' });
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }

  static async showMyHikes(req, res) {
    const hiker = await authenticateUser(req, res);

    if (hiker) {
      const { page } = req.query;
      const hikerHikes = await Hike.find({
        hikers: {
          $elemMatch: { hikerId: hiker._id },
        },
      }).skip(20 * page).limit(20);
      return res.json(hikerHikes.map((hike) => hike.toJson()));
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }

  static async sendHikeInvite(req, res) {
    const hiker = await authenticateUser(req, res);

    if (hiker) {
      const { hikeId, hikerId } = req.body;

      const hike = await Hike.findById(hikeId);
      const hiker2 = await Hiker.findById(hikerId);
      const hikerHasFriend = await Hiker.findOne({
        _id: (hiker2 ? hiker2._id : hikerId),
        friends: {
          $elemMatch: { friendId: hiker._id },
        },
      });

      if (hike && hiker2 && hiker._id !== hiker2._id && hikerHasFriend) {
        const hikerHasInvite = await Hiker.findOne({
          _id: hiker2._id,
          invites: {
            $elemMatch: {
              hikeId: hike._id,
              senderId: hiker._id,
            },
          },
        });
        const hikerInHike = await Hike.findOne({
          _id: hike._id,
          hikers: {
            $elemMatch: { hikerId: hiker2._id },
          }
        });

        if (!hikerHasInvite && !hikerInHike) {
          await Hiker.updateOne({
            _id: hiker2._id,
          }, {
            $push: {
              invites: {
                hikeId: hike._id,
                senderId: hiker._id,
              },
            },
          });
        }
        return res.json({});
      }
      return res.status(404).json({ error: 'Unrecognized ID' });
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }

  static async showHikeInvites(req, res) {
    const hiker = await authenticateUser(req, res);

    if (hiker) {
      const invites = await Promise.all(hiker.invites.map(async ({ hikeId, senderId }) => {
        return {
          hike: (await Hike.findById(hikeId)).toJson(),
          sender: (await Hiker.findById(senderId)).toJson(),
        }
      }));
      return res.json(invites);
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }

  static async acceptHikeInvite(req, res) {
    const hiker = await authenticateUser(req, res);

    if (hiker) {
      const { hikeId } = req.body;
      const hike = await Hike.findById(hikeId);
      const hikerHasInvite = await Hiker.findOne({
        _id: hiker._id,
        invites: {
          $elemMatch: {
            hikeId: (hike ? hike._id : hikeId),
          },
        },
      });

      if (hike && hikerHasInvite) {
        await Hiker.updateOne({
          _id: hiker._id,
        }, {
          $pull: {
            invites: { hikeId: hike._id },
          },
        });
        await Hike.updateOne({
          _id: hike._id,
        }, {
          $push: {
            hikers: { hikerId: hiker._id },
          },
        });
        return res.json({});
      }
      return res.status(404).json({ error: 'Unrecognized ID' });
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }

  static async rejectHikeInvite(req, res) {
    const hiker = await authenticateUser(req, res);

    if (hiker) {
      const { hikeId, hikerId } = req.body;
      const hike = await Hike.findById(hikeId);
      const hiker2 = await Hiker.findById(hikerId);
      const hikerHasInvite = await Hiker.findOne({
        _id: hiker._id,
        invites: {
          $elemMatch: {
            hikeId: (hike ? hike._id : hikeId),
            senderId: (hiker2 ? hiker2._id : hikerId),
          },
        },
      });

      if (hike && hikerHasInvite) {
        await Hiker.updateOne({
          _id: hiker._id,
        }, {
          $pull: {
            invites: {
              hikeId: hike._id,
              senderId: hiker2._id,
            },
          },
        });
        return res.json({});
      }
      return res.status(404).json({ error: 'Unrecognized ID' });
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }

  static async leaveHike(req, res) {
    const hiker = await authenticateUser(req, res);

    if (hiker) {
      const { hikeId } = req.body;
      const hike = await Hike.findById(hikeId);
      const hikerInHike = await Hike.findOne({
        _id: (hike ? hike._id : hikeId),
        hikers: {
          $elemMatch: { hikerId: hiker._id },
        },
      });
      if (hikerInHike) {
        const updatedHike = await Hike.findOneAndUpdate({
          _id: (hike._id),
        }, {
          $pull: {
            hikers: { hikerId: hiker._id },
          },
        }, { new: true });

        if (!updatedHike.hikers.length) {
          await Hike.deleteOne({
            _id: hike._id,
          });
        }
        return res.json({});
      }
      return res.status(404).json({ error: 'Unrecognized ID' });
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

export default HikeController;
