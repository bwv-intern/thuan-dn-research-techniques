import { Sequelize, QueryInterface, DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.createTable('Projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      projectName: {
        type: DataTypes.STRING
      },
      projectDescription: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.STRING
      },
      clientCompany: {
        type: DataTypes.INTEGER
      },
      projectLeader: {
        type: DataTypes.INTEGER
      },
      estimatedBudget: {
        type: DataTypes.INTEGER
      },
      totalAmountSpent: {
        type: DataTypes.INTEGER
      },
      estimatedProjectDuration: {
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.dropTable('Projects');
  }
};
