import Categories from '../components/Categories';
import LatestPosts from './LatestPosts';

const Sidebar = ({
  truncateDescription,
  selectedCategories,
  setSelectedCategories,
}) => {
  return (
    <aside style={{ padding: '1rem' }}>
      <Categories
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
      <LatestPosts truncateDescription={truncateDescription} />
    </aside>
  );
};

export default Sidebar;
