import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${props => props.padding || '2rem 1rem'};
`;

export const Button = styled.button`
  padding: 0.625rem 1.25rem;
  background-color: ${props => props.bgColor || '#3b82f6'};
  color: ${props => props.color || '#fff'};
  border: ${props => props.border || 'none'};
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;

  &:hover {
    background-color: ${props => props.hoverColor || '#2563eb'};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Card = styled.div`
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: ${props => props.padding || '1.5rem'};
  border: ${props => props.border || '1px solid #e5e7eb'};
  transition: box-shadow 0.2s, transform 0.2s;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

export const Input = styled.input`
  flex: ${props => props.flex || 1};
  padding: 0.625rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
  font-size: ${props => props.fontSize || '0.875rem'};
  color: ${props => props.color || '#4b5563'};
  font-weight: ${props => props.fontWeight || '400'};

  input {
    cursor: pointer;
    width: 16px;
    height: 16px;
    accent-color: #3b82f6;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    background-color: #f9fafb;
    border-bottom: 1px solid #e5e7eb;

    th {
      padding: 1rem 1.5rem;
      text-align: left;
      color: #4b5563;
      font-weight: 600;
      font-size: 0.875rem;
    }
  }

  tbody {
    border-top: 1px solid #e5e7eb;

    tr {
      border-bottom: 1px solid #e5e7eb;
      transition: background-color 0.2s;

      &:hover {
        background-color: #f9fafb;
      }

      td {
        padding: 1rem 1.5rem;
        color: #111827;
      }
    }
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  max-width: ${props => props.maxWidth || '500px'};
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;

  h2 {
    color: #111827;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
  }

  p {
    color: #4b5563;
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 2rem;

  button {
    flex: 1;
  }
`;

export const Badge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: ${props => {
    switch (props.variant) {
      case 'success':
        return '#dcfce7';
      case 'primary':
        return '#dbeafe';
      case 'warning':
        return '#fef3c7';
      case 'danger':
        return '#fee2e2';
      default:
        return '#f3f4f6';
    }
  }};
  color: ${props => {
    switch (props.variant) {
      case 'success':
        return '#166534';
      case 'primary':
        return '#1e40af';
      case 'warning':
        return '#92400e';
      case 'danger':
        return '#991b1b';
      default:
        return '#374151';
    }
  }};
`;

export const Flex = styled.div`
  display: flex;
  gap: ${props => props.gap || '1rem'};
  align-items: ${props => props.align || 'stretch'};
  justify-content: ${props => props.justify || 'flex-start'};
  flex-wrap: ${props => props.wrap || 'nowrap'};
  flex-direction: ${props => props.direction || 'row'};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns || 'repeat(auto-fit, minmax(250px, 1fr))'};
  gap: ${props => props.gap || '1.5rem'};
`;

export const Text = styled.p`
  color: ${props => props.color || '#111827'};
  font-size: ${props => props.size || '1rem'};
  font-weight: ${props => props.weight || '400'};
  margin: ${props => props.margin || '0'};
  line-height: ${props => props.lineHeight || '1.5'};
`;

export const Heading = styled.h2`
  color: ${props => props.color || '#111827'};
  font-size: ${props => {
    const sizes = { 1: '2.25rem', 2: '1.875rem', 3: '1.5rem', 4: '1.25rem', 5: '1.125rem', 6: '1rem' };
    return sizes[props.level || '2'];
  }};
  font-weight: ${props => props.weight || 'bold'};
  margin: ${props => props.margin || '0 0 1rem 0'};
`;
