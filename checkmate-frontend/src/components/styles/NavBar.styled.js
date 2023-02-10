import { Popover } from "@headlessui/react";

export default function Navbar({ user, handleSignOut }) {
  return (
    <Popover className='relative bg-white'>
      <div className='max-w-full px-6'>
        <div className='flex items-center justify-between border-b-2 border-gray-100 py-4 md:justify-start md:space-x-10'>
          <div className='flex justify-start lg:w-0 lg:flex-1'>
            <a href='https://checkmate.herokuapp.com/'>
              <svg
                viewBox='0 0 366 366'
                fill='fill-black'
                xmlns='http://www.w3.org/2000/svg'
                className='logo h-12 hover:-rotate-12 bg-white hover:fill-purple-400 hover:bg-transparent'
              >
                <rect width='183' height='183' />
                <rect x='183' y='183' width='183' height='183' />
              </svg>
            </a>
          </div>

          <div className='items-center justify-end md:flex md:flex-1 lg:w-0 '>
            <a
              href='https://checkmate.herokuapp.com/about'
              className='ml-8 inline-flex items-center justify-center bg-white text-black px-4 py-2 text-base font-medium hover:text-purple-400 hover:rotate-12 sm:text-sm font-groteskreg lg:text-base'
            >
              About
            </a>
            {user ? (
              <a
                href='https://checkmate.herokuapp.com/profile'
                className='ml-8 inline-flex items-center justify-center bg-white text-black px-4 py-2 text-base font-medium hover:text-purple-400 hover:rotate-12 sm:text-sm font-groteskreg lg:text-base'
              >
                <img
                  className='contain w-11 rounded-full'
                  src={user.picture}
                  alt='profile'
                ></img>
              </a>
            ) : null}
          </div>
          <div>
            <div id='signInDiv'></div>
            {user ? (
              <button
                className='btnml-8 inline-flex items-center justify-center bg-white text-black px-4 py-2 text-base font-medium hover:text-purple-400 hover:rotate-12 sm:text-sm font-groteskreg lg:text-base'
                onClick={(e) => handleSignOut(e)}
              >
                Sign Out
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </Popover>
  );
}
