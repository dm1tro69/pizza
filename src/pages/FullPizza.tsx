import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const FullPizza: FC = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://628cde00a3fd714fd03af787.mockapi.io/items/${id}`)
      .then((res) => setPizza(res.data))
      .catch((err) => {
        console.log(err);
        navigate('/');
      });
  }, []);

  if (!pizza) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className={'container'}>
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>

      <h4>{pizza.price} </h4>
    </div>
  );
};

export default FullPizza;
