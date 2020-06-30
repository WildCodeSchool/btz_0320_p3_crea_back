const User = require("./models/User");
const Type = require("./models/UserType");
const Activity = require("./models/ActivityField")
const Post = require("./models/Post");
const TypePost = require("./models/TypePost");
const JobCategory = require("./models/JobCategory");
const Reply = require("./models/Reply");

User.hasMany(Post, { foreignKey: { allowNull: false}, onDelete : "CASCADE"});
Post.belongsTo(User, { foreignKey: { allowNull: false }});

User.belongsToMany(Post, { through: Reply });
Post.belongsToMany(User, { through: Reply });

User.belongsTo(Activity);
Activity.hasMany(User);

Type.hasMany(User, { foreignKey: { allowNull: false }});
User.belongsTo(Type, { foreignKey: { allowNull: false }});

TypePost.hasMany(Post, { foreignKey: { allowNull: false }});
Post.belongsTo(TypePost, { foreignKey: { allowNull: false }});

JobCategory.hasMany(Post, { foreignKey: { allowNull: false }});
Post.belongsTo(JobCategory, { foreignKey: { allowNull: false }});

