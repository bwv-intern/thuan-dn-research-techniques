import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import connection, { connectDB } from './database/connection';
import User from './database/models/users';
import Project from './database/models/projects';
import { createUser } from './controllers/userController';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/login', (req: Request, res: Response) => {
  res.render('login');
});

app.post('/login-account', async (req: Request, res: Response) => {
  try {
    let user = await User.findOne({
      where: { email: req.body.email, password: req.body.password }
    });
    if (user) {
      return res.status(200).redirect('/project');
    } else {
      return res.send('The user is not exist');
    }
  } catch (err) {
    return res.send('Login user error!');
  }
});

app.get('/register', (req: Request, res: Response) => {
  res.render('register');
});

app.post('/register', createUser);

app.get('/project', (req: Request, res: Response) => {
  res.render('project-add');
});

app.get('/project-detail', (req: Request, res: Response) => {
  res.render('project-detail');
});

app.post('/create-project', async (req: Request, res: Response) => {
  try {
    setTimeout(async () => {
      console.log('Check post project: ', req.body);
      let project = await Project.create(req.body);
      console.log('Check project: ', project);
      return res.status(201).json({ id: project.id });
    }, 3000);
  } catch (err) {
    console.log('Err: ', err);
    return res.status(500).json({ message: 'Error when creating project' });
  }
});

app.post('/test-transaction', async (req: Request, res: Response) => {
  const t = await connection.transaction();
  const { fullName, email, password, retypePassword, isAgreeTerms } = req.body;
  try {
    const user = await User.create({ email: email, password: password, fullName: fullName }, { transaction: t });

    await Project.create(
      {
        projectName: 'Greenfield Urban Development',
        projectDescription:
          'A large-scale development project to revitalize a downtown area with residential and commercial spaces.',
        status: 'In Progress',
        clientCompany: 3,
        projectLeader: 5,
        estimatedBudget: 47483647,
        totalAmountSpent: 47483647,
        estimatedProjectDuration: 18
      },
      { transaction: t }
    );
    await t.commit();
    return res.send('Create transaction successfully');
  } catch (error) {
    await t.rollback();
    return res.send('Error when creating transaction');
  }
});

connectDB();

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
