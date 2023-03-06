import { MdDelete } from 'react-icons/md';
import { useContext } from 'react';
import { StyledCartProductCard } from './style';
import { StyledTitle } from '../../../../styles/typography';
import { cartContext } from '../../../../provider/cartContext';

interface iBurguer {
  id: number;
  category: string;
  name: string;
  price: number;
  img: string;
}
interface iCart {
  name: string;
  img: string;
  burguer: iBurguer;
}
const CartProductCard = ({ name, img, burguer }: iCart) => {
  const { removeFromCart } = useContext(cartContext);
  return (
    <StyledCartProductCard>
      <div className='imageBox'>
        <img src={img} alt='Hamburguer' />
      </div>
      <div className='contentBox'>
        <StyledTitle tag='h3' $fontSize='three'>
          {name}
        </StyledTitle>
        <button
          onClick={() => removeFromCart(burguer)}
          type='button'
          aria-label='Remover'
        >
          <MdDelete size={24} />
        </button>
      </div>
    </StyledCartProductCard>
  );
};

export default CartProductCard;
