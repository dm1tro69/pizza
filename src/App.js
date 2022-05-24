import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import { useEffect, useState } from 'react';
import Skeleton from './components/pizzaBlock/Skeleton';

function App() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch('https://628cde00a3fd714fd03af787.mockapi.io/items')
      .then((data) => data.json())
      .then((res) => {
        setPizzas(res);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading
              ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
              : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
