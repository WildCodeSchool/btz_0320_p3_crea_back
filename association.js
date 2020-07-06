const User = require("./models/User");
const Role = require("./models/Role");
const UserType = require("./models/UserType");
const Activity = require("./models/ActivityField")
const Post = require("./models/Post");
const TypePost = require("./models/TypePost");
const JobCategory = require("./models/JobCategory");
const Reply = require("./models/Reply");

User.hasMany(Post, { foreignKey: { allowNull: false}});
Post.belongsTo(User, { foreignKey: { allowNull: false }, onDelete : "CASCADE"});

User.belongsToMany(Post, { through: Reply });
Post.belongsToMany(User, { through: Reply });

User.belongsTo(Activity, { foreignKey: { allowNull: true }});
Activity.hasMany(User, { foreignKey: { allowNull: true }});

User.belongsTo(UserType, { foreignKey: { allowNull: true }});
UserType.hasMany(User, { foreignKey: { allowNull: true }} );

TypePost.hasMany(Post, { foreignKey: { allowNull: false }});
Post.belongsTo(TypePost, { foreignKey: { allowNull: false }});

JobCategory.hasMany(Post, { foreignKey: { allowNull: false }});
Post.belongsTo(JobCategory, { foreignKey: { allowNull: false }});

User.belongsTo(Role, {foreignKey: { allowNull: true }})
Role.hasMany(User, { foreignKey: { allowNull: true }})