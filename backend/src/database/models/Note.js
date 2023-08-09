module.exports = (sequelize, dataTypes) => {
    let alias = 'Notes';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        text: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        archived: {
            type: dataTypes.BOOLEAN,
            defaultValue: false
        },
        category_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }

    let config = {
        tableName: 'notes',
        timestamps: false
    }

    const Note = sequelize.define(alias, cols, config);

    return Note;
}