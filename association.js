const User = require("./models/User");
const Type = require("./models/UserType");
// const Activity = require("./models/ActivityField")
const Post = require("./models/Post");
const TypePost = require("./models/TypePost");
const JobCategory = require("./models/JobCategory");
const Reply = require("./models/Reply");

User.hasMany(Post, { foreignKey: { allowNull: false }});
Post.belongsTo(User, { foreignKey: { allowNull: false }});

User.belongsToMany(Post, { through: Reply });
Post.belongsToMany(User, { through: Reply });

// User.hasOne(Activity);
// Activity.belongsToMany(User);

User.hasOne(Type, { foreignKey: { allowNull: false }});
Type.belongsTo(User, { foreignKey: { allowNull: false }});

Post.hasOne(TypePost, { foreignKey: { allowNull: false }});
TypePost.belongsTo(Post, { foreignKey: { allowNull: false }});

Post.hasOne(JobCategory, { foreignKey: { allowNull: false }});
JobCategory.belongsTo(Post, { foreignKey: { allowNull: false }});

