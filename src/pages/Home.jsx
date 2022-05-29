import React, { useContext, useEffect, useState } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/pizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';
import axios from 'axios';

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  // const [categoryId, setCategoryId] = useState(0);
  // const [sortType, setSortType] = useState({ name: 'популярности', sortProperty: 'rating' });
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);

  const sort = useSelector((state) => state.filter.sort.sortProperty);

  const { searchValue } = useContext(SearchContext);

  const search = searchValue ? `search=${searchValue}` : '';
  const catId = categoryId > 0 ? `category=${categoryId}` : '';

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://628cde00a3fd714fd03af787.mockapi.io/items?page=${currentPage}&limit=4&${catId}&sortBy=${sort}${search}`,
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });

    window.scroll(0, 0);
  }, [categoryId, sort, searchValue, currentPage]);

  const items = pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className={'container'}>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : items}</div>
      <Pagination onPageChange={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
