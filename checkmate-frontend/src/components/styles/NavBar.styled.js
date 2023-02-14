export default function Navbar({ user, handleSignOut, setUser }) {
  return (
    <div className='min-w-fit max-w-full px-6 bg-white'>
      <div className='flex items-center justify-between border-b-2 border-gray-100 py-4 md:justify-start md:space-x-10'>
        <div className='flex justify-start lg:w-0 lg:flex-1'>
          <a href='https://checkmate.herokuapp.com/' className='bg-transparent'>
            <svg
              viewBox='0 0 366 366'
              fill='fill-black'
              xmlns='http://www.w3.org/2000/svg'
              className='logo h-12 hover:rotate-12 animate-spin-slow bg-white hover:fill-purple-400 hover:bg-transparent'
            >
              <rect width='183' height='183' />
              <rect x='183' y='183' width='183' height='183' />
            </svg>
          </a>
        </div>
        {/* <div></div> */}
        <div className='flex flex-nowrap items-center justify-end md:flex md:flex-1 lg:w-0 '>
          <a
            href='https://checkmate.herokuapp.com/'
            className='ml-8 inline-flex items-center justify-center bg-white text-black px-4 py-2 text-base font-medium hover:text-purple-400 hover:-rotate-12 sm:text-sm font-groteskreg lg:text-base'
          >
            Home
          </a>
          <a
            href='http://checkmate.herokuapp.com/about'
            className='ml-8 inline-flex items-center justify-center bg-white text-black px-4 py-2 text-base font-medium hover:text-purple-400 hover:rotate-12 sm:text-sm font-groteskreg lg:text-base'
          >
            About
          </a>
          <a
            href='http://checkmate.herokuapp.com/interactions'
            className='ml-8 inline-flex max-w-[6rem] flex-wrap items-center justify-center bg-white text-black px-4 py-2 text-base font-medium hover:text-purple-400 hover:-rotate-12 sm:text-sm font-groteskreg lg:text-base'
          >
            Interactions CheckMate
          </a>
          {user ? (
            <a
              href='http://checkmate.herokuapp.com/profile'
              className='bg-transparent text-black ml-8 items-center justify-center  hover:rotate-12'
            >
              <img
                className='rounded-full min-h-[2rem] min-w-[2rem] max-h-[3rem] max-w-[3rem]'
                src={user.picture}
                alt='profile'
              ></img>
              {user.given_name}
            </a>
          ) : null}
          {user ? (
            <button
              className='btn inline-flex items-center justify-center bg-white text-black px-4 py-2 text-base font-medium hover:text-purple-400 hover:-rotate-12 hover:bg-purple-200 sm:text-sm font-groteskreg lg:text-base'
              onClick={(e) => handleSignOut(e)}
            >
              Sign Out
            </button>
          ) : (
            <div className='mx-10'>
              <div id='signInDiv'></div>
            </div>
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
}
