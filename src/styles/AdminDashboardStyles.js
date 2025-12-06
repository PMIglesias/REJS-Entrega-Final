import styled from 'styled-components';

export const DashboardContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

export const DashboardHeader = styled.div`
  margin-bottom: 2rem;

  h2 {
    color: #111827;
    margin-bottom: 0.5rem;
    font-size: 1.875rem;
    font-weight: bold;
  }

  p {
    color: #4b5563;
  }
`;

export const TabsContainer = styled.div`
  margin-bottom: 2rem;
  border-bottom: 2px solid #e5e7eb;
`;

export const TabsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
`;

export const TabButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: transparent;
  border: none;
  border-bottom: ${props => props.isActive ? '2px solid #3b82f6' : '2px solid transparent'};
  color: ${props => props.isActive ? '#3b82f6' : '#6b7280'};
  font-weight: ${props => props.isActive ? '600' : '500'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;
  margin-bottom: -2px;

  &:hover {
    color: #3b82f6;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

export const StatCard = styled.div`
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

export const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const IconBox = styled.div`
  background-color: ${props => props.bgColor};
  padding: 0.75rem;
  border-radius: 0.5rem;
`;

export const TrendBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${props => props.isPositive ? '#16a34a' : '#dc2626'};
  font-size: 0.875rem;
`;

export const StatTitle = styled.p`
  color: #4b5563;
  margin-bottom: 0.25rem;
`;

export const StatValue = styled.p`
  color: #111827;
  font-size: 1.25rem;
  font-weight: bold;
`;

export const StatFooter = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

export const ChartsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

export const ChartCard = styled.div`
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  grid-column: ${props => props.span ? `span ${props.span}` : 'span 1'};
`;

export const ChartHeader = styled.div`
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1.5rem;

  h3 {
    color: #111827;
    font-size: 1.125rem;
    font-weight: bold;
    margin: 0;
  }
`;

export const ProductsTabContainer = styled.div`
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const TabHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

export const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const HeaderTitle = styled.h3`
  color: #111827;
  font-size: 1.125rem;
  font-weight: bold;
  margin: 0;
`;

export const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 0.625rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #3b82f6;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const ResultCount = styled.span`
  color: #6b7280;
  font-size: 0.875rem;
`;

export const FilterSection = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
`;

export const FilterLabel = styled.p`
  color: #111827;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
`;

export const FilterOptions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const FilterCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
  font-size: 0.875rem;
  color: #4b5563;

  input {
    cursor: pointer;
    width: 16px;
    height: 16px;
    accent-color: #3b82f6;
  }
`;

export const TableContainer = styled.div`
  overflow-x: auto;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.color || '#3b82f6'};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0;

  &:hover {
    text-decoration: underline;
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
`;

export const PaginationButton = styled.button`
  padding: 0.5rem 0.75rem;
  background-color: ${props => props.isActive ? '#3b82f6' : '#f3f4f6'};
  color: ${props => props.isActive ? '#fff' : '#111827'};
  border: 1px solid ${props => props.isActive ? '#3b82f6' : '#d1d5db'};
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: #3b82f6;
    color: #fff;
  }
`;

export const LoadingContainer = styled.div`
  padding: 3rem;
  text-align: center;

  p {
    color: #6b7280;
    font-size: 1.1rem;
  }
`;

export const ErrorContainer = styled.div`
  padding: 3rem;
  text-align: center;

  p {
    color: #dc2626;
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
`;
