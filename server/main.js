import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/users';
import Links from '../imports/api/links';
import '../imports/startup/simpleSchemaConfig';

Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1);
    const link = Links.findOne({ _id });
    if (link) {
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      res.end();
      // don't need to call next as we have redirected to another link  

      // update link analytics
      Meteor.call('links.trackVisit', _id);
    }
    else {
      // link not found, forward to other handler for default handling
      next();
    }
  });
});
