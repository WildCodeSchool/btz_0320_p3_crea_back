const User = require("./models/User");
const Type = require("./models/UserType");
const Post = require("./models/Post");
const TypePost = require("./models/TypePost");
const JobCategory = require("./models/JobCategory");
const Reply = require("./models/Reply");

User.hasMany(Post);
Post.belongsTo(User);

User.belongsToMany(Post, { through: Reply });
Post.belongsToMany(User, { through: Reply });

User.hasOne(Type);
Type.belongsTo(User);

Post.hasOne(TypePost);
TypePost.belongsTo(Post);

Post.hasOne(JobCategory);
JobCategory.belongsTo(Post);
