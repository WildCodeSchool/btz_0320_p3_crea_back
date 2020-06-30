const User = require("./models/User");
const Type = require("./models/UserType");
const Activity = require("./models/ActivityField")
const Post = require("./models/Post");
const TypePost = require("./models/TypePost");
const JobCategory = require("./models/JobCategory");
const Reply = require("./models/Reply");

User.hasMany(Post, { foreignKey: { allowNull: true}});
Post.belongsTo(User, { foreignKey: { allowNull: true }, onDelete : "CASCADE"});

User.belongsToMany(Post, { through: Reply });
Post.belongsToMany(User, { through: Reply });

User.belongsTo(Activity);
Activity.hasMany(User);

Type.hasMany(User, { foreignKey: { allowNull: true }});
User.belongsTo(Type, { foreignKey: { allowNull: true }});

TypePost.hasMany(Post, { foreignKey: { allowNull: true }});
Post.belongsTo(TypePost, { foreignKey: { allowNull: true }});

JobCategory.hasMany(Post, { foreignKey: { allowNull: true }});
Post.belongsTo(JobCategory, { foreignKey: { allowNull: true }});

