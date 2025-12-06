import React from 'react';
import styled from 'styled-components';
import { Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFav } from '../context/FavContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CardContainer = styled.div`
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 250px;
  overflow: hidden;
  position: relative;
  background-color: #f3f4f6;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.05);
    }
  }
`;

const FavButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 10;

  &:hover {
    background-color: #fff;
    transform: scale(1.1);
  }

  svg {
    width: 20px;
    height: 20px;
    color: ${props => props.isFav ? '#dc2626' : '#9ca3af'};
    transition: color 0.2s;
    fill: ${props => props.isFav ? '#dc2626' : 'none'};
  }
`;

const CardContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ProductTitle = styled(Link)`
  font-size: 0.95rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
  text-decoration: none;
  line-height: 1.4;
  transition: color 0.2s;

  &:hover {
    color: #3b82f6;
  }
`;

const ProductVendor = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 0.5rem 0;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.75rem 0;
`;

const Price = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  color: #111827;
`;

const OldPrice = styled.span`
  font-size: 0.875rem;
  color: #9ca3af;
  text-decoration: line-through;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
`;

const AddToCartBtn = styled.button`
  flex: 1;
  padding: 0.625rem 1rem;
  background-color: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const ViewBtn = styled(Link)`
  flex: 1;
  padding: 0.625rem 1rem;
  background-color: #f3f4f6;
  color: #111827;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e5e7eb;
  }
`;

const ProductCardStyled = ({ product }) => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { addToFav, removeFromFav, isFavorite } = useFav();
  const isFav = isFavorite(product.id);

  const handleFav = () => {
    if (isFav) removeFromFav(product.id);
    else addToFav(product);
  };

  const handleAddToCart = () => {
    if (!user) return;
    addToCart(product);
  };

  return (
    <CardContainer>
      <ImageContainer>
        <img
          src={product.img?.[0] || '/placeholder.svg'}
          alt={product.title_es || product.title}
          onError={(e) => { e.target.src = '/placeholder.svg'; }}
        />
        <FavButton onClick={handleFav} isFav={isFav} title="Agregar a favoritos">
          <Heart />
        </FavButton>
      </ImageContainer>

      <CardContent>
        <ProductTitle to={`/producto/${product.id}`}>
          {product.title_es || product.title}
        </ProductTitle>

        <ProductVendor>{product.vendor}</ProductVendor>

        <PriceContainer>
          <Price>${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}</Price>
          {product.oldPrice && <OldPrice>${product.oldPrice}</OldPrice>}
        </PriceContainer>

        <ButtonContainer>
          <AddToCartBtn onClick={handleAddToCart} disabled={!user}>
            <ShoppingCart size={16} />
            Añadir
          </AddToCartBtn>
          <ViewBtn to={`/producto/${product.id}`}>
            Ver
          </ViewBtn>
        </ButtonContainer>
      </CardContent>
    </CardContainer>
  );
};

export default ProductCardStyled;
