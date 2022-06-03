import React, { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/pizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setPageCount } from '../redux/slices/filterSlice';
import qs from 'qs';
import { Link, useNavigate } from 'react-router-dom';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const currentPage = useSelector((state) => state.filter.pageCount);
  const itemsPizzas = useSelector((state) => state.pizza.items);

  const sort = useSelector((state) => state.filter.sort.sortProperty);

  const { searchValue } = useSelector((state) => state.filter);

  const search = searchValue ? `search=${searchValue}` : '';
  const catId = categoryId > 0 ? `category=${categoryId}` : '';

  const navigate = useNavigate();

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  useEffect(() => {
    setIsLoading(true);
    const getPizzas = async () => {
      try {
        dispatch(fetchPizzas({ sort, currentPage, search, catId }));
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    };
    getPizzas();

    window.scroll(0, 0);
  }, [categoryId, sort, searchValue, currentPage]);

  useEffect(() => {
    const params = { categoryId: categoryId > 0 ? categoryId : null, sort, currentPage };
    const queryString = qs.stringify(params, { skipNulls: true });
    navigate(`/?${queryString}`);
  }, [categoryId, sort, searchValue, currentPage]);

  const items = itemsPizzas.map((pizza) => (
    <Link key={pizza.id} to={`/pizza/${pizza.id}`}>
      <PizzaBlock {...pizza} />
    </Link>
  ));
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className={'container'}>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : items}</div>
      <Pagination onPageChange={(number) => dispatch(setPageCount(number))} />
    </div>
  );
};

export default Home;
