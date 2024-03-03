import React from "react";
import Profile from "../../components/Profile";
import MypageTable from "../../components/MypageTable";
import InterestedStocksTable from "../../components/InterestedStocksTable";
import { Container, Text } from "./Style";

const MystocksHeaders = ["종목명", "매입가", "현재가", "평단가", "보유수량", "보유일", "평가손익금", "평가손익률"];
const InterestedHeaders = ["", "종목명", "현재가", "전일비", "등락률", "시가", "고가", "저가", "거래량", "시가총액"];
const BuyingLogsHeaders = ["종목명", "매수일자", "체결일자", "주문단가", "체결단가", "주문수량", "수익금", "수익률"];

const MyStocksData = [
  ["KODEX 200선물인버스2X", "2,555", "2,555", "2,555", "2000주", "10일", "+846,760", "+2.85%"],
  ["삼성전자", "74,700", "74,700", "74,700", "2주", "7일", "+4,364,129", "+16.18%"],
  ["대한해운", "2,555", "2,555", "2,555", "30주", "30일", "-846,760", "-2.85%"],
  ["LG헬로비전", "2,555", "2,555", "2,555", "1,500주", "2일", "-846,760", "-2.85%"],
  ["KTcs", "2,555", "2,555", "2,555", "2주", "10일", "-4,846,760", "-2.85%"],
];
const star = `${process.env.PUBLIC_URL}/assets/star.svg`;
const InterestedData = [
  [star, "KODEX 200선물인버스2X", "2,555", "▼ 75", "-2.85%", "2,555", "2,555", "2,555", "144,846,760", "2,555"],
  [star, "삼성전자", "2,555", "▲ 3,000", "+4.18%", "74,700", "74,700", "74,700", "4,364,129", "74,700"],
  [star, "대한해운", "2,555", "▼ 75", "-2.85%", "2,555", "2,555", "2,555", "144,846,760", "2,555"],
  [star, "LG헬로비전", "2,555", "▼ 75", "-2.85%", "2,555", "2,555", "2,555", "144,846,760", "2,555"],
  [star, "KTcs", "2,555", "▼ 75", "-2.85%", "2,555", "2,555", "2,555", "144,846,760", "2,555"],
];
const BuyingLogsData = [
  ["KODEX 200선물인버스2X", "2024-01-12", "거래 대기 중", "125,000", "5,000", "2,500주", "+4,364,129", "+16.18%"],
  ["삼성전자", "2024-01-12", "2024-01-12", "1,325,000", "5,000", "2,5주", "+4,364,129", "+16.18%"],
  ["대한해운", "2024-01-12", "2024-01-12", "125,000", "5,000", "2,5주", "+4,129", "+16.18%"],
  ["LG헬로비전", "2024-01-12", "2024-01-12", "5,000", "5,000", "2,5주", "+364,129", "+16.18%"],
  ["KTcs", "2024-01-12", "2024-01-12", "5,000", "5,000", "2,5주", "+4,364,129", "+16.18%"],
];

const Index: React.FC = () => {
  return (
    <Container>
      <Profile />
      <Text>My 보유주식</Text>
      <MypageTable headers={MystocksHeaders} data={MyStocksData} />
      <Text>관심 주식</Text>
      <InterestedStocksTable headers={InterestedHeaders} data={InterestedData} />
      <Text>매수 일지</Text>
      <MypageTable headers={BuyingLogsHeaders} data={BuyingLogsData} />
    </Container>
  );
};

export default Index;
