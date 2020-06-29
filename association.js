const User = require("./models/User");
const Type = require("./models/UserType");
// const Activity = require("./models/ActivityField")
const Post = require("./models/Post");
const TypePost = require("./models/TypePost");
const JobCategory = require("./models/JobCategory");
// const Reply = require("./models/Reply");

User.hasMany(Post);
Post.belongsTo(User);

User.belongsToMany(Post, { through: "Reply" });
Post.belongsToMany(User, { through: "Reply" });

// User.hasOne(Activity);
// Activity.belongsToMany(User);

User.hasOne(Type);
Type.belongsTo(User);

Post.hasOne(TypePost);
TypePost.belongsTo(Post);

Post.hasOne(JobCategory);
JobCategory.belongsTo(Post);

//EXample
// This will create a new table rel referencing the PK(by default) of both the tables
// Foo.belongsToMany(Bar, { through: "rel" });
// Bar.belongsToMany(Foo, { through: "rel" });
