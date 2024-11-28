import React from "react";
import {
  CandidateListContainer,
  CandidateCard,
  ProfileImage,
  PartyText,
  NameText,
  ViewButton,
} from "./CandidateListStyle";
import { useEffect, useState } from "react";
import minjuImg from "../../../assets/Candidate/PartyImg/더불어민주당.svg";
import gukhimImg from "../../../assets/Candidate/PartyImg/국민의힘.svg";
import noksakImg from "../../../assets/Candidate/PartyImg/녹색정의당.svg";
import defaultImg from "../../../assets/Candidate/PartyImg/무소속.svg";

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    // JSON 파일에서 데이터를 가져오기
    fetch("/DummyData/Candidate/Candidate.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data); // 데이터 확인을 위한 콘솔 로그
        setCandidates(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <div>
        <select value={party} onChange={handlePartyChange}>
          <option value="">정당</option>
          <option value="더불어민주당">더불어민주당</option>
          <option value="국민의힘">국민의힘</option>
          {/* 추가 정당 옵션 */}
        </select>

        <select value={region} onChange={handleRegionChange}>
          <option value="">지역</option>
          <option value="동대문구">동대문구</option>
          {/* 추가 지역 옵션 */}
        </select>
      </div>
      <CandidateListContainer>
        {candidates.map((candidate, index) => (
          <CandidateCard key={index}>
            <ProfileImage
              style={{
                backgroundImage: `url(${
                  candidate.jdName === "더불어민주당"
                    ? minjuImg
                    : candidate.jdName === "국민의힘"
                    ? gukhimImg
                    : candidate.jdName === "녹색정의당"
                    ? noksakImg
                    : defaultImg
                })`,
              }}
            />
            <PartyText>{candidate.jdName}</PartyText>
            <PartyText>{candidate.wiwName}</PartyText>
            <NameText>{candidate.name}</NameText>
            <ViewButton>보러가기</ViewButton>
          </CandidateCard>
        ))}
      </CandidateListContainer>
    </div>
  );
};

export default CandidateList;
