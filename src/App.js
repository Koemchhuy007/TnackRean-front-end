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
import DeleteFolderDialoge from "./components/Inclass/Folder/DeleteFolderDialoge";
import EditeFolderDialoge from "./components/Inclass/Folder/EditeFolderDialoge";
import ViewFolderDialoge from "./components/Inclass/Folder/ViewFolderDialoge";
import FolderDialoge from "./components/Inclass/Folder/FolderDialoge";
import { Folder } from "@material-ui/icons";
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

        <Route path="/student">
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

        <Route path="/class-doc">
          <InclassLayout>
            <Switch>
              <Route path="/class-doc/deletefolderdialog">
                <DeleteFolderDialoge/>
              </Route>
              <Route path="/class-doc/folder">
                <Folder/>
              </Route>
              <Route path="/class-doc/view-folder-dialog">
                <ViewFolderDialoge/>
              </Route>
            </Switch>
          </InclassLayout>
        </Route>

      </Router>
    </ThemeProvider>
  );
}

export default App;
