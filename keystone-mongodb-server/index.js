const dotenv = require('dotenv').config()
const { Keystone } = require('@keystonejs/keystone');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const {PasswordAuthStrategy} = require('@keystonejs/auth-password')
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');

const PROJECT_NAME = 'keystone-blog';
const adapterConfig = { mongoUri: process.env.MONGO_URI };


/**
 * You've got a new KeystoneJS Project! Things you might want to do next:
 * - Add adapter config options (See: https://keystonejs.com/keystonejs/adapter-mongoose/)
 * - Select configure access control and authentication (See: https://keystonejs.com/api/access-control)
 */

 const PostSchema = require('./lists/Post')
 const UserSchema = require('./lists/User')

const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  cookieSecret: process.env.COOKIE_SECRET
});

// creating the auth guard function
// destructuring item from the auth object and rename item
const isAdmin = ({authentication: {item:user}}) => {
  return !!user && !!user.isAdmin
}
const isLoggedIn = ({authentication: {item:user}}) => {
  return !!user
}

// schemas
// keystone.createList('Post', PostSchema)
keystone.createList('Post', {
  fields: PostSchema.fields,
  access: {
    create:isLoggedIn,
    read:true,
    update:isLoggedIn,
    delete:isLoggedIn,
  }
})
keystone.createList('User', {
  fields: UserSchema.fields,
  access: {
    create:isAdmin,
    read:true,
    update:isAdmin,
    delete:isAdmin,
  }
})

// defining the auth strategy
const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
  config: {
    identityField: 'email',
    secretField: 'password'
  } 
})

module.exports = {
  keystone,
  apps: [new GraphQLApp(), new AdminUIApp({ name: PROJECT_NAME, enableDefaultRoute: true, authStrategy, isAccessAllowed: isLoggedIn })],
};
