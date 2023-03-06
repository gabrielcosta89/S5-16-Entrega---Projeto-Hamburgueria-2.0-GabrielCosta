import { useContext } from 'react';
import { StyledProductCard } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph, StyledTitle } from '../../../styles/typography';
import { cartContext } from '../../../provider/cartContext';

interface iburguer {
  name: string;
  category: string;
  img: string;
  price: number;
  id: number;
}

interface IbruguerProps {
  name: string;
  category: string;
  img: string;
  price: string;
  burguer: iburguer;
}
const ProductCard = ({
  name,
  category,
  img,
  price,
  burguer,
}: IbruguerProps) => {
const {addToCart}=useContext(cartContext)

  return (
    <StyledProductCard>
      <div className='imageBox'>
        <img src={img} alt='Hamburguer' />
      </div>
      <div className='content'>
        <StyledTitle tag='h3' $fontSize='three'>
          {name}
        </StyledTitle>
        <StyledParagraph className='category'>{category}</StyledParagraph>
        <StyledParagraph className='price'>{price}</StyledParagraph>
        <StyledButton
          onClick={() => addToCart(burguer)}
          $buttonSize='medium'
          $buttonStyle='green'
        >
          Adicionar
        </StyledButton>
      </div>
    </StyledProductCard>
  );
};

export default ProductCard;
