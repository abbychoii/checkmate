// import ".../App.css";
import TitleBlock from "../styles/TitleBlock.styled";
import Navbar from "../styles/NavBar.styled";

function Home({ user, handleSignOut }) {
  return (
    <div>
      <Navbar user={user} handleSignOut={handleSignOut} />
      <div className=' flex justify-center scroll-smooth px-24 lg:px-32 min-h-screen h-max max-w-fit'>
        <div className='content-container flex flex-col px-3'>
          <TitleBlock />
          {/* {user ? (
            <div className='m-10 p-10 flex justify-evenly lg:my-15 rounded-[5rem] bg-white border-[20px] lg:border-[20px] border-yellow-200'>
              Welcome {user.name}!
            </div>
          ) : null} */}
        </div>
      </div>
    </div>
  );
}

export default Home;

// bg-tetris2
