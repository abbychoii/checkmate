import Navbar from "../styles/NavBar.styled";

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-tetris2 min-h-screen h-max px-52 py-[5.5rem]">
        <div className="border-2 bg-white">
          <p>Created by Abby & Kate</p>
        </div>
      </div>
    </div>
  );
};

export default About;
