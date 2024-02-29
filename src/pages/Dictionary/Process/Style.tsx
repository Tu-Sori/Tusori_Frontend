import styled from "styled-components";

//버튼 전체
export const ButtonsContainer = styled.div`
  border-top: 2px solid #e3e3e3;
  border-bottom: 2px solid #e3e3e3;
  padding: 40px 0 16px 0;
  display: flex;
  flex-wrap: wrap;
`;

//버튼 + 화살표
export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 16px 24px 0;
`;

export const Button = styled.button<{ selected: boolean }>`
  width: 220px;
  height: 100px;
  font-family: Pretendard-Medium;
  border: none;
  border-radius: 8px;
  background-color: ${({ selected }) => (selected ? "#708FFE" : "#fff")};
  color: ${({ selected }) => (selected ? "#fff" : "#2A2A2A")};
  font-size: 20px;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: background-color 0.3s;
  line-height: 150%;
  flex-shrink: 0;
  margin-right: 16px;
`;

export const Span = styled.span`
  font-size: 18px;
`;

export const Img = styled.img`
  width: 28px;
`;
