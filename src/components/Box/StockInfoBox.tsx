import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "api/home/UserStockInfo";

interface StockInfoBoxProps {
  title?: string;
  category?: string[];
  login?: boolean;
  stockData?: {
    top_5_kospi: { Name: string; Close: string; Changes: number; ChagesRatio: number; Volume: number }[];
    top_5_kosdaq: { Name: string; Close: string; Changes: number; ChagesRatio: number; Volume: number }[];
    top_5_konex: { Name: string; Close: string; Changes: number; ChagesRatio: number; Volume: number }[];
  };
  userStockData?: UserData | null;
}

// 데이터 형식 선언
export interface User {
  user_id: number;
  email: number;
  assets: number;
  nickname: string;
}

export interface StockInfo {
  Name: string;
  Close: string;
  Changes: number;
  ChagesRatio: number;
  Volume: number;
}

export interface UserData {
  user_data: {
    user: User;
    save_stocks: StockInfo[][];
  };
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
    overflow-y: auto;
    cursor: pointer;

    &:hover {
      color: #708ffe; // 마우스 호버 상태일 때 글자 색상 변경
    }

    @media (max-width: 1200px) {
      font-size: 15px;
    }
    @media (max-width: 900px) {
      font-size: 14px;
    }
    @media (max-width: 880px) {
      font-size: 13px;
    }
    @media (max-width: 768px) {
      font-size: 16px;
    }
    @media (max-width: 450px) {
      font-size: 14px;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    margin-top: 32px;
    min-height: 300px;
  }
`;

const BoxContainer = styled.div<{ $selectbutton: number }>`
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
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 6px 20px;
  border: none;
  color: #fff;
  font-family: Pretendard-Medium;
  font-size: 16px;
  font-weight: 500;
  line-height: normal;
  background: ${({ selected }) => (selected ? "#708FFE" : "#D9D9D9")};
  border-radius: 40px;

  @media (max-width: 1440px) {
    font-size: 15px;
    padding: 6px 13px;
    gap: 5px;
  }

  @media (max-width: 1300px) {
    font-size: 13px;
    padding: 6px 10px;
  }

  @media (max-width: 1200px) {
    font-size: 13px;
    padding: 6px 9px;
  }

  @media (max-width: 1150px) {
    font-size: 13px;
    padding: 6px 7px;
    gap: 3px;
  }

  @media (max-width: 950px) {
    font-size: 12px;
    padding: 5px 6px;
  }

  @media (max-width: 880px) {
    font-size: 11px;
    padding: 5px 4px;
  }

  @media (max-width: 768px) {
    font-size: 13px;
    padding: 5px 7px;
  }

  @media (max-width: 450px) {
    font-size: 12px;
    padding: 5px 7px;
  }
  @media (max-width: 440px) {
    font-size: 10px;
    padding: 5px 6px;
  }
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
  border-bottom: 1px solid #e3e3e3;
`;

const TableBody = styled.tbody`
  color: #000;
  & > tr {
    margin-bottom: 1.48vh;
  }
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

  @media (max-width: 768px) {
    color: #2a2a2a;
    font-family: Pretendard-Regular;
    font-size: 12px;
  }
`;

const ScrollableTable = styled.div`
  overflow-y: auto;
  height: 100%;
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

  @media (max-width: 1200px) {
    font-size: 15px;
  }
  @media (max-width: 900px) {
    font-size: 14px;
  }
  @media (max-width: 880px) {
    font-size: 13px;
  }
  @media (max-width: 768px) {
    font-size: 16px;
  }
  @media (max-width: 450px) {
    font-size: 14px;
  }
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

  @media (max-width: 1200px) {
    font-size: 15px;
  }
  @media (max-width: 900px) {
    font-size: 14px;
  }
  @media (max-width: 880px) {
    font-size: 13px;
  }
  @media (max-width: 768px) {
    font-size: 16px;
    padding: 8px 15px;
  }
  @media (max-width: 450px) {
    font-size: 14px;
    padding: 4px 10px;
  }
`;

const Arrow = styled.img`
  width: 16px;
  height: 16px;

  @media (max-width: 768px) {
    width: 11px;
    height: 11px;
  }
`;

const Star = styled.img`
  width: 20x;
  height: 20px;

  @media (max-width: 768px) {
    width: 16px;
    height: 16px;
  }
`;

// 값에 따라 셀의 색상을 계산하는 함수
const calculateCellColor = (value: string) => {
  return parseFloat(value) < 0 ? "#0075FF" : "#F00";
};

// 테이블 셀을 렌더링 하는 함수
const renderTableCell = (
  value: string | number | undefined,
  type: "rank" | "pick" | "name" | "currentPrice" | "priceChange" | "percentageChange" | "volume",
  style: React.CSSProperties = {},
) => {
  const cellColor = value !== undefined ? calculateCellColor(value.toString()) : undefined;

  switch (type) {
    case "pick":
      return value === "true" ? (
        <Star src={`${process.env.PUBLIC_URL}/assets/Mypage/star.svg`} alt="select_star" />
      ) : (
        <Star src={`${process.env.PUBLIC_URL}/assets/Home/gray_star.png`} alt="nonSelect_star" />
      );
    case "priceChange":
      return (
        <TableCell>
          {value !== undefined && parseFloat(value.toString()) < 0 ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Arrow src={`${process.env.PUBLIC_URL}/assets/Home/downward_arrow.svg`} alt="downward_arrow" />
              <span style={{ marginRight: "0.2vw", color: cellColor }}>{value}</span>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Arrow src={`${process.env.PUBLIC_URL}/assets/Home/rising_arrow.svg`} alt="rising_arrow" style={{ margin: "0px" }} />
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
const StockInfoBox: React.FC<StockInfoBoxProps> = ({ title, category = [], login, stockData = {} }) => {
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState(0);
  const [selectData, setSelectData] = useState<
    | {
        Name: string;
        Close: string;
        Changes: number;
        ChagesRatio: number;
        Volume: number;
      }[]
    | null
  >(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  const isMyStockTable = title === "MY 보유 주식";
  const handleTitleClick = () => {
    if (isMyStockTable) {
      navigate("/mypage");
    } else {
      navigate("/industry");
    }
  };

  useEffect(() => {
    setSelectData(stockData.top_5_kospi || null);
  }, [stockData]);

  useEffect(() => {
    if (isMyStockTable && login) {
      const loadUserData = async () => {
        const data = await fetchUserData();
        setUserData(data);
      };
      loadUserData();
    }
  }, [isMyStockTable, login]);

  const handleButtonClick = (index: number) => {
    setSelectedButton(index);
    switch (category[index]) {
      case "코스피":
        setSelectData(stockData?.top_5_kospi || null);
        break;
      case "코스닥":
        setSelectData(stockData?.top_5_kosdaq || null);
        break;
      case "코넥스":
        setSelectData(stockData?.top_5_konex || null);
        break;
      default:
        null;
        break;
    }
  };

  const handleLoginButton = () => {
    navigate("/login");
  };

  return (
    <Container>
      <BoxContainer $selectbutton={selectedButton}>
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
      ) : login && isMyStockTable && userData ? (
        <ScrollableTable>
          <Table>
            <TableHeader>
              <TableRow style={{ marginBottom: "1.5vh" }}>
                <TableCell style={{ flex: "0.5" }}>
                  {isMyStockTable ? <Star src={`${process.env.PUBLIC_URL}/assets/Home/gray_star.png`} alt="star" /> : "순위"}
                </TableCell>
                <TableCell style={{ flex: "1.5" }}>종목명</TableCell>
                <TableCell>현재가</TableCell>
                <TableCell>전일비</TableCell>
                <TableCell>등락률</TableCell>
                <TableCell>거래량</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userData.user_data.save_stocks[0]?.map((data, index) => (
                <TableRow key={index} style={{ marginTop: "1.85vh" }}>
                  {renderTableCell((index + 1).toString(), "rank", { flex: "0.5" })}
                  {renderTableCell(data.Name, "name", { flex: "1.5" })}
                  {renderTableCell(data.Close.toLocaleString(), "currentPrice")}
                  {renderTableCell(data.Changes, "priceChange")}
                  {renderTableCell(data.ChagesRatio, "percentageChange")}
                  {renderTableCell(data.Volume.toLocaleString(), "volume")}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollableTable>
      ) : (
        <ScrollableTable>
          <Table>
            <TableHeader>
              <TableRow style={{ marginBottom: "1.5vh" }}>
                <TableCell style={{ flex: "0.5" }}>
                  {isMyStockTable ? <Star src={`${process.env.PUBLIC_URL}/assets/Home/gray_star.png`} alt="star" /> : "순위"}
                </TableCell>
                <TableCell style={{ flex: "1.5vh" }}>종목명</TableCell>
                <TableCell>현재가</TableCell>
                <TableCell>전일비</TableCell>
                <TableCell>등락률</TableCell>
                <TableCell>거래량</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectData?.map((data, index) => (
                <TableRow key={index} style={{ marginTop: "1.5vh" }}>
                  {renderTableCell((index + 1).toString(), "rank", { flex: "0.5" })}
                  {/*{data.pick && renderTableCell(data.pick, "pick", { flex: "0.7" })}*/}
                  {renderTableCell(data.Name, "name", { flex: "1.5" })}
                  {renderTableCell(data.Close.toLocaleString(), "currentPrice")}
                  {renderTableCell(data.Changes, "priceChange")}
                  {renderTableCell(data.ChagesRatio, "percentageChange")}
                  {renderTableCell(data.Volume.toLocaleString(), "volume")}
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
