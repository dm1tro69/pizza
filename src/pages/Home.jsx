import React, { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/pizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../Pagination';

const Home = ({ searchValue }) => {
  const [pizzas, setPizzas] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({ name: 'популярности', sortProperty: 'rating' });
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const search = searchValue ? `search=${searchValue}` : '';

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://628cde00a3fd714fd03af787.mockapi.io/items?page=${currentPage}&limit=4${
        categoryId > 0 ? `category=${categoryId}` : ''
      }${search}&sortBy=${sortType.sortProperty}&order=desc`,
    )
      .then((data) => data.json())
      .then((res) => {
        setPizzas(res);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
    window.scroll(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const items = pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className={'container'}>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(i) => setCategoryId(i)} />
        <Sort sortType={sortType} onClickSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : items}</div>
      <Pagination onPageChange={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
