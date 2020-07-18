import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 500px;
  text-align: center;

  img {
    display: center;
    flex-direction: column;
    height: 80px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    padding: 60px 68px 40px;
    margin-bottom: 90px;

    input {
      background: #e8f0fe;
      border: 0;
      border-radius: 4px;
      height: 44px;
      color: black;
      margin: 0 0 10px;

      &::placeholder {
        color: black;
        opacity: 1;
      }
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #343a40;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.3s;

      &:hover {
        background: ${darken(0.08, '#343A40')};
      }
    }

    /*a = Link - react-router-dom */
    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 4;
      }
    }
  }
`;
