import { Model, DataTypes } from 'sequelize';
import connection from '../connection';

interface ProjectAttributes {
  id?: number;
  projectName: string;
  projectDescription: string;
  status: string;
  clientCompany: number;
  projectLeader: number;
  estimatedBudget: number;
  totalAmountSpent: number;
  estimatedProjectDuration: number;
  updatedAt?: Date;
  createdAt?: Date;
}

class Project extends Model<ProjectAttributes> implements ProjectAttributes {
  public id?: number;
  public projectName!: string;
  public projectDescription!: string;
  public status!: string;
  public clientCompany!: number;
  public projectLeader!: number;
  public estimatedBudget!: number;
  public totalAmountSpent!: number;
  public estimatedProjectDuration!: number;
  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
}

Project.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.NUMBER,
    },
    projectName: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    projectDescription: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    clientCompany: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    projectLeader: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    estimatedBudget: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    totalAmountSpent: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    estimatedProjectDuration: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },


    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: connection,
    modelName: 'Project',
  }
);

export default Project;