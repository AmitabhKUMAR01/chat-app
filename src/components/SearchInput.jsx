import React, { useEffect, useState } from 'react';
import { SetFilteredUserList } from '../Redux/OneOneChatSlice';
import { useDispatch, useSelector } from 'react-redux';

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const FilteredUserList = useSelector((state) => state.OneOne.FilteredUserList);
  useEffect(()=>{
    dispatch(SetFilteredUserList(searchQuery))
    console.log('FilteredUserList',FilteredUserList)
  },[searchQuery,setSearchQuery])

  

  return (
    <div className='z-50 sticky  text-black'>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='bg-lime-100 px-3 outline-none'
      />
    </div>
  );
};

export default SearchComponent;
