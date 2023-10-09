import Categories from '../components/Categories';
import LatestPosts from './LatestPosts';

const Sidebar = ({
  truncateDescription,
  selectedCategories,
  setSelectedCategories,
}) => {
  return (
    <aside>
      <Categories
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
      <LatestPosts truncateDescription={truncateDescription} />
    </aside>
  );
};

export default Sidebar;
