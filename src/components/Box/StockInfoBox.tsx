import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import firstSampleData from "../../json/RealTimeStockData.json";
import secondSampleData from "../../json/MyStockData.json";

// Image
import downward from "../../assets/downward_arrow.svg";
import rise from "../../assets/rising_arrow.svg";
import nonSelect from "../../assets/gray_star.png";

interface StockInfoBoxProps {
  title?: string;
  category?: string[];
  login?: boolean;
}

// 데이터 형식 선언
interface StockData {
  rank?: string;
  pick?: string;
  name: string;
  currentPrice: string;
  priceChange: string;
  percentageChange: string;
  volume: string;
}

// CSS 변수 정의
const containerPadding = "0 1vw";
const borderRadius = "8px";
const transitionEffect = "background 0.3s ease, border-radius 0.3s ease";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 35.8vw;
  height: 35.7vh;
  min-height: 365px;
  flex-shrink: 0;
  border-radius: ${borderRadius};
  border: 1px solid #e3e3e3;
  background: #fff;
  margin-top: 3.7vh;
  transition: ${transitionEffect};

  .title {
    color: var(--Main-Font, #2a2a2a);
    font-family: Pretendard-Medium;
    font-size: 20px;
    font-weight: 600;
    line-height: normal;
    margin-left: 2.2vw;
    margin-top: 3.33vh;
    cursor: pointer;
    &:hover {
      color: #708ffe; // 마우스 호버 상태일 때 글자 색상 변경
    }
  }

  img {
    width: 20px;
    height: 20px;
    margin-top: 3.36vh;
  }
`;

const BoxContainer = styled.div<{ selectedButton: number }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 4.3vh;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1vw;
  margin-top: 2.9vh;
  margin-right: 1.87vw;
`;

const Button = styled.button<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  width: 4.5vw;
  height: 3vh;
  min-width: 87px;
  min-height: 33px;
  padding: 6px 20px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border: none;
  color: #fff;
  font-family: Pretendard-Medium;
  font-size: 16px;
  font-weight: 500;
  line-height: normal;
  background: ${({ selected }) => (selected ? "#708FFE" : "#D9D9D9")};
  border-radius: 40px;
`;

const Table = styled.table`
  width: 90%;
  border-collapse: collapse;
  margin-left: 2.3vw;
  margin-right: 2.3vw;
  padding: ${containerPadding};
`;

const TableHeader = styled.thead`
  color: #000;
`;

const HorizontalLine = styled.hr`
  border: 1px solid #e3e3e3;
  margin: 1.48vh 0;
`;

const TableBody = styled.tbody`
  color: #000;
`;

const TableRow = styled.tr`
  display: flex;
  align-items: center;
  width: 100%;
`;

const TableCell = styled.td<{ color?: string }>`
  flex: 1;
  font-family: Pretendard-Regular;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  width: "auto";
  margin-left: "0";
  color: ${({ color }) => color || "#000"};
`;

const TableCellName = styled(TableCell)`
  text-overflow: ellipsis; // 텍스트가 넘칠 경우 ...으로 표시
`;

const ScrollableTable = styled.div`
  overflow-y: auto;
  height: calc(37.7vh);
  min-height: 230px;
`;

const LoginCotainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20vh;
`;

const LoginMessage = styled.span`
  font-family: "Pretendard-Regular";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #000;
  text-align: center;
  margin-bottom: 6vh;
`;

const LoginButton = styled.div`
  display: inline-flex;
  padding: 8px 24px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border-radius: 40px;
  background: #708ffe;

  color: #fff;
  font-family: Pretendard-Medium;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

// 값에 따라 셀의 색상을 계산하는 함수
const calculateCellColor = (value: string) => {
  return parseFloat(value) < 0 ? "#0075FF" : "#F00";
};

// 테이블 셀을 렌더링 하는 함수
const renderTableCell = (
  value: string | undefined,
  type: "rank" | "pick" | "name" | "currentPrice" | "priceChange" | "percentageChange" | "volume",
  style: React.CSSProperties = {},
) => {
  const cellColor = value && calculateCellColor(value);

  switch (type) {
    case "pick":
      return value == "true" ? (
        <img src={`${process.env.PUBLIC_URL}/assets/Mypage/star.svg`} style={{ margin: "0px", marginRight: "0.5vw" }} alt="select_star" />
      ) : (
        <img src={nonSelect} style={{ margin: "0px", marginRight: "0.5vw" }} alt="nonSelect_star" />
      );
    case "priceChange":
      return (
        <TableCell>
          {value && parseFloat(value) < 0 ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={downward} alt="downward_arrow" style={{ width: "16px", height: "16px", margin: "0px" }} />
              <span style={{ marginRight: "0.2vw", color: cellColor }}>{value}</span>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={rise} alt="rising_arrow" style={{ width: "16px", height: "16px", margin: "0px" }} />
              <span style={{ marginRight: "0.2vw", color: cellColor }}>{value}</span>
            </div>
          )}
        </TableCell>
      );

    case "percentageChange":
      return <TableCell style={{ color: cellColor }}>{value}</TableCell>;

    default:
      return <TableCell style={{ ...style }}>{value}</TableCell>;
  }
};

// category 값이 전달되지 않을 경우 테이블 위 버튼 생성 X
const StockInfoBox: React.FC<StockInfoBoxProps> = ({ title, category = [], login }) => {
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState(0);
  const isMyStockTable = title === "MY 보유 주식";

  const handleTitleClick = () => {
    navigate("/mypage");
  };

  const handleButtonClick = (index: number) => {
    setSelectedButton(index);
  };

  const handleLoginButton = () => {
    navigate("/login");
  };

  // 테이블에 따라 렌더링 되는 데이터를 달리함
  const data: StockData[] = title === "MY 보유 주식" ? secondSampleData : firstSampleData;

  return (
    <Container>
      <BoxContainer selectedButton={selectedButton}>
        {title && (
          <div className="title" onClick={() => handleTitleClick()}>
            {title}
            {" >"}
          </div>
        )}
        <ButtonContainer>
          {category.map((item, index) => (
            <Button key={index} selected={index === selectedButton} onClick={() => handleButtonClick(index)}>
              {item}
            </Button>
          ))}
        </ButtonContainer>
      </BoxContainer>
      {!login && isMyStockTable ? (
        <LoginCotainer>
          <LoginMessage> 아직 보유한 주식이 없어요! </LoginMessage>
          <LoginButton onClick={() => handleLoginButton()}>로그인 하러가기</LoginButton>
        </LoginCotainer>
      ) : (
        <ScrollableTable>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell style={{ flex: "0.5" }}>
                  {isMyStockTable ? <img src={nonSelect} alt="star" style={{ width: "24px", height: "24px", margin: "0px" }} /> : "순위"}
                </TableCell>
                <TableCell style={{ flex: "1.5" }}>종목명</TableCell>
                <TableCell>현재가</TableCell>
                <TableCell>전일비</TableCell>
                <TableCell>등락률</TableCell>
                <TableCell>거래량</TableCell>
              </TableRow>
            </TableHeader>
            <HorizontalLine />
            <TableBody>
              {data.map((data, index) => (
                <TableRow key={index} style={{ marginBottom: "1.85vh" }}>
                  {data.rank && renderTableCell(data.rank, "rank", { flex: "0.5" })}
                  {data.pick && renderTableCell(data.pick, "pick", { flex: "0.5" })}
                  {renderTableCell(data.name, "name", { flex: "1.5" })}
                  {renderTableCell(data.currentPrice, "currentPrice")}
                  {renderTableCell(data.priceChange, "priceChange")}
                  {renderTableCell(data.percentageChange, "percentageChange")}
                  {renderTableCell(data.volume, "volume")}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollableTable>
      )}
    </Container>
  );
};

export default StockInfoBox;
