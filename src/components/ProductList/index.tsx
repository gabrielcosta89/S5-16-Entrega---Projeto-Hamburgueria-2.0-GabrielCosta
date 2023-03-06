import { useContext } from 'react';
import ProductCard from './ProductCard';
import { StyledProductList } from './style';
import { cartContext } from '../../provider/cartContext';

const ProductList = () => {
  const { burguers } = useContext(cartContext);

  return (
    <StyledProductList>
      {burguers.map((burguer) => (
        <ProductCard
          burguer={burguer}
          key={burguer.id}
          name={burguer.name}
          category={burguer.category}
          img={burguer.img}
          price={`R$ ${burguer.price.toFixed(2)}`}
        />
      ))}
    </StyledProductList>
  );
};

export default ProductList;
