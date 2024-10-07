import mongoose from 'mongoose';
import Hike from '../models/hike'
import Hiker from '../models/hiker';
import authenticateUser from './utils';

class HikerController {
  static async showFriends(req, res) {
    const hiker = await authenticateUser(req, res);

    if (hiker) {
      const promises = hiker.friends.map((friendId) => {
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
      const promises = hiker.friendRequests.map((friendId) => {
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

  static async sendFriendRequest(req, res) {
    const hiker = await authenticateUser(req, res);
    if (hiker) {
      const { id } = req.body;
      const hiker2 = await Hiker.findById(id);

      if (hiker2 && hiker.id !== hiker2.id) {
        if (!hiker2.friendRequests.includes(hiker.id)) {
          hiker2.friendRequests.push(hiker.id.toString());
          await hiker2.save();
        }
        return res.json({});
      }
      return res.status(400).json({ error: 'Id not recognized' }); 
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }

  static async acceptFriendRequest(req, res) {
    const hiker = await authenticateUser(req, res);
    if (hiker) {
      const { id } = req.body;
      const hiker2 = await Hiker.findById(id);

      if (hiker2) {
        if (hiker.friendRequests.includes(hiker2.id)) {
          hiker.friendRequests.splice(hiker.friendRequests.indexOf(hiker2.id), 1);
          hiker.friends.push(hiker2.id);
          hiker2.friends.push(hiker.id);
          await hiker.save();
          await hiker2.save();
          return res.json({});
        }
        return res.status(404).json({ error: 'No friend request for that Id' });
      }
      return res.status(400).json({ error: 'Id not recognized' });
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }

  static async rejectFriendRequest(req, res) {
    const hiker = await authenticateUser(req, res);
    if (hiker) {
      const { id } = req.body;
      const hiker2 = await Hiker.findById(id);

      if (hiker2) {
        if (hiker.friendRequests.includes(hiker2.id)) {
          hiker.friendRequests.splice(hiker.friendRequests.indexOf(hiker2.id), 1);
          await hiker.save();
          await hiker2.save();
          console.log(hiker, hiker2);
          return res.json({});
        }
        return res.status(404).json({ error: 'No friend request for that Id' });
      }
      return res.status(400).json({ error: 'Id not recognized' });
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }

  static async unfriend(req, res) {
    const hiker = await authenticateUser(req, res);
    if (hiker) {
      const { id } = req.body;
      const hiker2 = await Hiker.findById(id);

      if (hiker2) {
        if (hiker.friends.includes(hiker2.id)) {
          await Hiker.updateOne({ id: hiker.id }, {
            $pullAll: {
              friends: hiker2.id,
            }
          });
          await Hiker.updateOne({ id: hiker2.id }, {
            $pullAll: {
              friends: hiker.id,
            }
          });
          await hiker.save();
          await hiker2.save();
          return res.json({});
        }
        return res.status(404).json({ error: 'No friend with that Id' });
      }
      return res.status(400).json({ error: 'Id not recognized' });
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

export default HikerController
