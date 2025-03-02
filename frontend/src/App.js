import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
import "./App.css";
import Login from "./page/authentication/login";
import SignUp from "./page/authentication/SignUp";
import MainHome from "./page/Student/Home/StudentHome";
import UserDetail from "./page/authentication/userDetails";
import Assignment from "./page/Student/Assignment/Assignment";
import AssignmentDetails from "./page/Student/Assignment/AssignmentDetails";
import Compiler from "./page/Student/compiler/Compiler";
import Courses from "./page/Student/Course/Courses";
import CourseDetails from "./page/Student/Course/CoursesDetails";
import SimpleCompiler from "./page/Student/simpleCompiler/SimpleCompiler";
import ToolHome from "./page/Student/Tools/ToolHome";
import Calculator from "./page/Student/Tools/calculator/calculator";
import CalendarComponent from "./page/Student/Tools/calendar/Calendar";
import MainAdminHome from "./page/Admin/Home/MainAdminHome";
import AdminHome from "./page/Student/Home/AdminHome";
import AdminAssignment from "./page/Admin/Assignment/Assignment";
import AdminCourses from "./page/Admin/Course/Courses";
import AdminCourseDetails from "./page/Admin/Course/CoursesDetails";
import ChatAi from "./page/Student/ChatAi/ChatAi";
import ExternalForumComponent from "./ExternalForum";
import Landing from "./page/authentication/Landing";
import Test from "./page/authentication/Test";
import FreeCourses from "./page/freeCourse/FreeCourseHome";
import FreeCourseCompiler from "./page/freeCourse/Compiler";
import GenerateAi from "./page/Student/ChatAi/GenerateAi";
import UserGroupCreater from "./page/Admin/userGroup/UserGroup";
import Grade from "./page/Student/Grade/Grade";
import StudentProgress from "./page/Admin/StudentProgress/StudentProgress";
import JsonDisplay from "./page/authentication/jsonViewer/JsonDisplay";
import StudentProgressByCourse from "./page/Admin/StudentProgressByCourse/StudentProgress";
import StudentSection from "./page/Admin/StudentSection/StudentSection";
function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={isLoggedIn == "true" ? <UserDetail /> : <Landing />}
          />
          <Route path="/adminAssignment" element={<AdminAssignment />} />
          <Route path="/course" element={<Courses />} />
          <Route path="/studentSection" element={<StudentSection />} />

          <Route path="/test" element={<Test />} />
          <Route path="/questionBank" element={<JsonDisplay />} />

          <Route path="/studentReport" element={<StudentProgress/>} />


          <Route path="/home" element={<Landing />} />
          <Route path="/group" element={<UserGroupCreater />} />
          <Route path="/freecourses/:id" element={<FreeCourses />} />
          <Route path="/codeai" element={<ChatAi />} />
          <Route path="/grade" element={<Grade />} />

          <Route
            path="/course/adminCourseDetails/:id"
            element={<AdminCourseDetails />}
          />
          <Route path="/calendar" element={<CalendarComponent />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/tools" element={<ToolHome />} />
          <Route path="/simpleCompiler" element={<SimpleCompiler />} />
          <Route path="/course/courseDetails/:id" element={<CourseDetails />} />
          <Route path="/studentProgress/:id" element={<StudentProgressByCourse />} />
          <Route path="/assignment" element={<Assignment />} />
          <Route path="/userDetails" element={<UserDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/home" element={<MainHome />} />
          <Route path="/adminCourse" element={<AdminCourses />} />
          <Route
            path="/assignment/assignmentDetails/:id"
            element={<AssignmentDetails />}
          />
          <Route path="/codemeet" element={<ExternalForumComponent />} />
          <Route path="/generateAi" element={<GenerateAi />} />

          <Route
            path="/assignment/assignmentDetails/:id/compiler"
            element={<Compiler />}
          />
          <Route path="/freecompiler/:id" element={<FreeCourseCompiler />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
