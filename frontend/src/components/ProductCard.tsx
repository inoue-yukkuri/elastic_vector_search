import React from 'react';
import { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-name">{product.name}</div>
      <div className="product-description">{product.description}</div>
      <div>
        <span className="product-category">{product.category}</span>
        <span className="product-price">¥{product.price?.toLocaleString()}</span>
        <span className="product-stock">在庫: {product.stock}個</span>
      </div>
    </div>
  );
};

export default ProductCard;
