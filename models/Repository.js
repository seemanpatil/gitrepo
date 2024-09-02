const Repository = sequelize.define('Repository', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

User.hasMany(Repository);
Repository.belongsTo(User);
