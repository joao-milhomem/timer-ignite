import styled from 'styled-components'

export const HistoryContainer = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 2rem;

  overflow: hidden;

  h1 {
    font-size: 1.5rem;
  }

  .table-container {
    display: flex;
    overflow: auto;
    height: 100%;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;

    thead {
      text-align: left;
      background-color: ${(props) => props.theme['gray-600']};
      color: ${(props) => props.theme.white};

      th {
        padding: 1rem 1.5rem;

        &:first-child {
          width: 40%;
          border-radius: 8px 0 0 0;
        }

        &:last-child {
          border-radius: 0 8px 0 0;
        }
      }
    }

    tbody {
      background-color: ${(props) => props.theme['gray-700']};

      tr {
        border-bottom: 4px solid ${(props) => props.theme['gray-800']};
        overflow: hidden;
      }

      tr:last-child td:last-child {
        border-radius: 0 0 8px 0;
      }

      tr:last-child td:first-child {
        border-radius: 0 0 0 8px;
      }

      td {
        padding: 1rem 1.5rem;
      }

      td:last-child {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        &::before {
          content: '';

          display: inline-block;
          width: 8px;
          height: 8px;

          border-radius: 50%;
          background-color: yellow;
        }
      }
    }
  }
`
