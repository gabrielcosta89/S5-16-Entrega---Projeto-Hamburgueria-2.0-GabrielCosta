import { useContext } from 'react';
import CartProductCard from './CartProductCard';
import { StyledCartProductList } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph } from '../../../styles/typography';

import { cartContext } from '../../../provider/cartContext';

const CartProductList = () => {
  const { cartBurguers, removeAllFromCart } = useContext(cartContext);
  return (
    <StyledCartProductList>
      <ul>
        {cartBurguers.map((burguer) => (
          <CartProductCard
            key={burguer.id}
            name={burguer.name}
            img={burguer.img}
            burguer={burguer}
          />
        ))}
      </ul>

      <div className='totalBox'>
        <StyledParagraph>
          <strong>Total</strong>
        </StyledParagraph>
        <StyledParagraph className='total'>
          R${' '}
          {cartBurguers
            .reduce((acc, current) => acc + current.price, 0)
            .toFixed(2)}
        </StyledParagraph>
      </div>
      <StyledButton
        $buttonSize='default'
        $buttonStyle='gray'
        onClick={() => removeAllFromCart()}
      >
        Remover todos
      </StyledButton>
    </StyledCartProductList>
  );
};
export default CartProductList;
