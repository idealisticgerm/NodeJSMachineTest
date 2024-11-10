import { Sequelize,DataTypes } from "sequelize";
import { sequelize } from "../config/db";

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: 'id'
    }
  }
},
{
  // freezeTableName: true
  tableName: 'products'
}
);

export default Product