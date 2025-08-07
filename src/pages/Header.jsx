import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../redux/searchSlice';

export default function Header() {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search.query);

  return (
    <header className="p-4 bg-gray-100 flex justify-between items-center">
      <h1 className="text-xl font-bold">A Status Page</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        placeholder="Search..."
        className="border px-3 py-1 rounded w-64"
      />
    </header>
  );
}
