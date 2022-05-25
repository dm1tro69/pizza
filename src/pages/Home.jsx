import React, { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/pizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({ name: 'популярности', sortProperty: 'rating' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://628cde00a3fd714fd03af787.mockapi.io/items?${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortType.sortProperty}&order=desc`,
    )
      .then((data) => data.json())
      .then((res) => {
        setPizzas(res);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
    window.scroll(0, 0);
  }, [categoryId, sortType]);

  return (
    <div className={'container'}>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(i) => setCategoryId(i)} />
        <Sort sortType={sortType} onClickSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </div>
  );
};

export default Home;
