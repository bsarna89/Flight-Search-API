import "./App.css";
import { RouterElement } from "./routes/routes.js";
import NavBar from "./components/NavBar.js";

function App() {
  return (
    <div className="App">
      <NavBar />
      <RouterElement />
    </div>
  );
}

export default App;
