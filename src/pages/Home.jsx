import React, { useContext, useEffect, useRef, useState } from 'react';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import Skeleton from '../components/pizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setFilters, setPageCount } from '../redux/slices/filterSlice';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isMounted = useRef(false);

  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const currentPage = useSelector((state) => state.filter.pageCount);

  const sort = useSelector((state) => state.filter.sort.sortProperty);

  const { searchValue } = useContext(SearchContext);

  const search = searchValue ? `search=${searchValue}` : '';
  const catId = categoryId > 0 ? `category=${categoryId}` : '';

  const navigate = useNavigate();

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

  useEffect(() => {
    const params = { categoryId: categoryId > 0 ? categoryId : null, sort, currentPage };
    const queryString = qs.stringify(params, { skipNulls: true });
    navigate(`/?${queryString}`);
  }, [categoryId, sort, searchValue, currentPage]);

  const items = pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  // useEffect(() => {
  //   // const category = sortList;
  //   // dispatch(setFilters(qs.parse(window.location.search.substring(1))));
  // }, []);

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
