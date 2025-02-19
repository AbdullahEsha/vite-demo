import { Link } from "react-router-dom";
import {FC} from "react";

const Home: FC = () => {
  return (
    <>
      <h1>Home</h1>
      <p>Welcome to the home page!</p>
      <Link to="/use-action-state">Use Action State</Link>
      <br />
      <Link to="/use-form-status">Use Form Status</Link>
      <br />
      <Link to="/use-optimistic">Use Optimistic</Link>
    </>
  );
};

export default Home;
