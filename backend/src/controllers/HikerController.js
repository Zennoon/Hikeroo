import mongoose from 'mongoose';
import Hike from '../models/hike'
import Hiker from '../models/hiker';
import authenticateUser from './utils';

class HikerController {
  static async showFriends(req, res) {
    const hiker = await authenticateUser(req, res);

    if (hiker) {
      const promises = hiker.friends.map(({ friendId }) => {
        const promise = (async () => {
          const friend = await Hiker.findById(friendId);

          if (friend) {
            return friend.toJson();
          }
        })();
        return promise;
      });
      const friends = await Promise.all(promises);
      return res.json(friends);
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }

  static async showFriendRequests(req, res) {
    const hiker = await authenticateUser(req, res);

    if (hiker) {
      const promises = hiker.friendRequests.map(({ hikerId }) => {
        const promise = (async () => {
          const friend = await Hiker.findById(hikerId);

          if (friend) {
            return friend.toJson();
          }
        })();
        return promise;
      });
      const friends = await Promise.all(promises);
      return res.json(friends);
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }

  static async sendFriendRequest(req, res) {
    const hiker = await authenticateUser(req, res);
    if (hiker) {
      const { hikerId } = req.body;
      const hiker2 = await Hiker.findById(hikerId);

      if (hiker2 && hiker.id !== hiker2.id) {
        const hikerHasFriendRequest = await Hiker.findOne({
          _id: hikerId,
          friendRequests: {
            $elemMatch: { hikerId: hiker._id }
          },
        });
        const hikerHasFriend = await Hiker.findOne({
          _id: hikerId,
          friends: {
            $elemMatch: { friendId: hiker._id }
          },
        });
        if (!hikerHasFriendRequest && !hikerHasFriend) {
          await Hiker.updateOne({
            _id: hikerId,
          }, {
            $push: {
              friendRequests: { hikerId: hiker._id },
            }
          });
        }
        return res.json({});
      }
      return res.status(404).json({ error: 'Unrecognized ID' }); 
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }

  static async acceptFriendRequest(req, res) {
    const hiker = await authenticateUser(req, res);
    if (hiker) {
      const { hikerId } = req.body;
      const hikerHasFriendRequest = await Hiker.findOne({
        _id: hiker._id,
        friendRequests: {
          $elemMatch: { hikerId }
        },
      });

      if (hikerHasFriendRequest) {
        await Hiker.updateOne({
          _id: hiker._id,
        }, {
          $pull: {
            friendRequests: { hikerId },
          },
          $push: {
            friends: { friendId: hikerId },
          },
        });

        await Hiker.updateOne({
          _id: hikerId,
        }, {
          $push: {
            friends: { friendId: hiker._id },
          },
        })
        return res.json({});
      }
      return res.status(404).json({ error: 'Friend request not found' });
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }

  static async rejectFriendRequest(req, res) {
    const hiker = await authenticateUser(req, res);
    if (hiker) {
      const { hikerId } = req.body;
      const hikerHasFriendRequest = await Hiker.findOne({
        _id: hiker._id,
        friendRequests: {
          $elemMatch: { hikerId },
        },
      });
      if (hikerHasFriendRequest) {
        await Hiker.updateOne({
          _id: hiker._id,
        }, {
          $pull: {
            friendRequests: { hikerId }
          }
        });
        return res.json({});
      }
      return res.status(404).json({ error: 'Friend request not found' });
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }

  static async unfriend(req, res) {
    const hiker = await authenticateUser(req, res);
    if (hiker) {
      const { friendId } = req.body;
      const hikerHasFriend = await Hiker.findOne({
        _id: hiker._id,
        friends: {
          $elemMatch: { friendId },
        }
      });

      if (hikerHasFriend) {
        await Hiker.updateOne({
          _id: hiker._id,
        }, {
          $pull: {
            friends: { friendId },
          },
        });
        await Hiker.updateOne({
          _id: friendId,
        }, {
          $pull: {
            friends: { friendId: hiker._id },
          },
        });
        return res.json({});
      }
      return res.status(404).json({ error: 'Unrecognized ID' });
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

export default HikerController
