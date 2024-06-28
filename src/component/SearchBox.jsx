
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// jest.mock('next/router');
import { IoSearch } from 'react-icons/io5';
import { IoIosClose } from "react-icons/io";
export default function SearchBox(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMounted, setIsMounted] = useState(false);
//   const {router} = useRouter();
const handleSearchClick=props.handleSearchClick


  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    if (isMounted && searchTerm) {
      router.push({
        pathname: router.pathname,
        query: { q: searchTerm },
      });
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center justify-center gap-2 p-2">
      <div className="relative flex flex-row items-center w-full max-w-md">
      <button className='text-2xl text-black mb-10 absolute -right-3' onClick={handleSearchClick}><IoIosClose /></button>
        <input
         type='text'
                  placeholder='Search'
                  className='bg-gray-50 border border-gray-200 rounded text-md text-black w-full py-2 px-4 max-w-[210px]'
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value.trim())}
         
        />
        <button
          type="submit"
          className="absolute right-2 text-gray-500 hover:text-gray-700"
        >
          <IoSearch className="text-xl" />
        </button>
      </div>
    </form>
  );
}
