module.exports = (sequelize, DataTypes) => {
    const Fund = sequelize.define('Fund', {
        fundName: DataTypes.STRING,
        fundType: DataTypes.STRING,
        fundDescription: DataTypes.TEXT,
        fundNAV: DataTypes.DECIMAL,
        fundSlug: DataTypes.STRING
    })

    return Fund
}