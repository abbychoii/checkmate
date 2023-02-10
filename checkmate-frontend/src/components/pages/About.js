import Navbar from "../styles/NavBar.styled";

const About = ({ user, handleSignOut }) => {
  return (
    <div>
      <Navbar user={user} handleSignOut={handleSignOut} />
      <div className='bg-tetris2 min-h-screen h-max lg:px-52 py-[5.5rem] px-16'>
        <div className='h-auto rounded-[3rem] md:rounded-[3rem] lg:rounded-[3rem] xl:rounded-[5rem] md:flex md:flex-col items-center justify-center border-spacing-12 border-[20px] mt-20 text-center mb-10 border-yellow-200 shadow-yellow-400 bg-white py-10 px-10 md:px-14 md:py-14 text-lg'>
          <p className='text-left'>
            Hi there! We're{" "}
            <a
              href='https://www.linkedin.com/in/abigail-m-choi/'
              className='text-purple-400 bg-white'
            >
              Abby
            </a>{" "}
            and{" "}
            <a
              href='https://www.linkedin.com/in/varika/'
              className='text-purple-400 bg-white'
            >
              Kate
            </a>
            , two students at{" "}
            <a
              href='https://adadevelopersacademy.org/'
              className='text-purple-400 bg-white'
            >
              Ada Developers Academy
            </a>
            , where we're learning to become software developers. This website
            you're checking out right now is our latest class project,
            CheckMate. <br />
            <br />
            <p>
              We wanted to use our love for tech to make something that would
              help people in a real and meaningful way. That's why we decided to
              create{" "}
              <a
                href='https://checkmate.herokuapp.com'
                className='text-purple-400 bg-white'
              >
                CheckMate
              </a>{" "}
              a website that provides accurate and up-to-date information about
              medication. We believe that having access to this information is
              essential for individuals to make informed decisions about their
              health and wellness.
            </p>{" "}
            <br />
            <p>
              Working on this project allowed us to put into practice all the
              skills and knowledge we've gained in our time at Ada. From web
              development to algorithm fundamentals, we got to show off what
              we've learned and put it to work creating something truly useful.
            </p>{" "}
            <br />
            <p>
              Our goal is to keep growing and using our skills for good, making
              a positive impact on the world one project at a time. Thanks for
              stopping by and for supporting our journey as software developers!
            </p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
