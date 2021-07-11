import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Notes from "./pages/Nodes";
import TeacherNodeClass from "./components/Teacher/TeacherNodeClass";
import CreateClass from "./pages/CreateClass";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import Layout from "./components/Teacher/TeacherLayout";
import StudentLayout from "./components/student/Layout";
import Studentnode from "./components/student/Studentnode";
import Calender from "./components/student/Calender";
import Login from "./components/Login/Login";
import InclassLayout from "./components/Inclass/InclassLayout";
import Register from "./components/Login/Register";
import ClassWork from "./components/Inclass/Folder/ClassWork";
import StudentList from "./components/Inclass/Folder/StudentList";
import Folder from "./components/Inclass/Folder/Folder";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fefefe",
    },
    secondary: purple,
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Login/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
        </Switch>
        <Route path="/teacherpage">
          <Layout>
            <Switch>
              <Route path="/teacherpage/teacher">
                <Notes />
              </Route>
              <Route path="/teacherpage/create">
                <CreateClass />
              </Route>
            </Switch>
          </Layout>
        </Route>
        <Route path="/student/">
          <StudentLayout>
            <Switch>
              <Route path="/student/myclass">
                <Studentnode />
              </Route>

              <Route path="/student/calender">
                <Calender />
              </Route>
            </Switch>
          </StudentLayout>
        </Route>

        <Route path="/class-doc/">
          <InclassLayout>
            <Switch>
              <Route path="/class-doc/class-work">
                <ClassWork/>
              </Route>
              <Route path="/class-doc/folder">
                <Folder />
              </Route>
              <Route path="/class-doc/student-list">
                <StudentList/>
              </Route>
            </Switch>
          </InclassLayout>
        </Route>
      </Router>
    </ThemeProvider>
  );
}

export default App;
