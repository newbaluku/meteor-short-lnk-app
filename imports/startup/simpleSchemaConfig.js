import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

// this handle converts simpleSchema validation error into a meteor error
SimpleSchema.defineValidationErrorTransform((e) => {
  return new Meteor.Error(400, e.message);
});