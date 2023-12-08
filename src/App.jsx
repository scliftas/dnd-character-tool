import { Link, Outlet } from "react-router-dom";
import d20 from "./d20.png";
import "./app.css";

function App() {
  return (
    <>
      <header>
        <img src={d20} alt="D20" />

        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/create">Create</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
