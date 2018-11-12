import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

const Links = new Mongo.Collection('links');

// because publish is only available on server but this file is used by
// both client and server. Hence this if statement is needed
if (Meteor.isServer) {
  // the name 'links' here can be anything, as long as the same name is
  // used on the client to subscribe for publication
  Meteor.publish('links', function () {
  return Links.find({ userId: this.userId });
  });
}

Meteor.methods({
  'links.insert'(url) {
    if (!this.userId) {
      throw new Meteor.Error('not-authenticated');
    }

    new SimpleSchema({
      url: {
        type: String,
        label: 'Your link', // this will replace the variable name 'url' to the new label so that it appears nicely in the validation error message (if any)
        regEx: SimpleSchema.RegEx.Url
      }
    }).validate({ url });

    Links.insert({
      _id: shortid.generate(),
      url,
      userId: this.userId,
      visible: true,
      visitedCount: 0,
      lastVisitedAt: null
    });
  },
  
  'links.setVisibility'(_id, visible) {
    if (!this.userId) {
      throw new Meteor.Error('not-authenticated');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      visible: {
        type: Boolean
      }
    }).validate({ _id, visible });

    Links.update({
      _id,
      userId: this.userId
    }, {
      $set: { visible }
    })
  },

  'links.trackVisit'(_id) {
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    Links.update({
      _id
    }, {
      $set: {
        lastVisitedAt: new Date().getTime()
      },
      $inc: {
        visitedCount: 1
      }
    });
  },

  'links.delete'(_id) {
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    Links.remove({ _id });
  }
});

export default Links;