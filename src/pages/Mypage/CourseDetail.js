import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

// 스타일 컴포넌트 정의
const BreadcrumbsSection = styled.div`
  padding: 40px 0;
  background-color: #f9f9f9;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
`;

const BreadcrumbsTitle = styled.h2`
  margin-bottom: 16px;
  font-size: 32px;
  font-weight: bold;
`;

const BreadcrumbsText = styled.p`
  font-size: 16px;
  line-height: 1.6;
`;

const CourseSection = styled.section`
  padding: 40px 0;
`;

const CourseNav = styled.nav`
  margin-bottom: 20px;
`;

const CourseNavContainer = styled.div`
  background-color: #fff;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const CourseTitle = styled.a`
  font-weight: bold;
  color: #333;
  text-decoration: none;
  font-size: 18px;
`;

const CourseTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  background-color: white;
`;

const TableHead = styled.thead`
  background-color: #f8f9fa;

  th {
    padding: 5px;
    text-align: center;
    border: 1px solid #dee2e6;
  }
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #f5f5f5;
  }

  height: 40px;
`;

const TableCell = styled.td`
  padding: 5px;
  border: 1px solid #dee2e6;
  text-align: ${(props) => (props.center ? "center" : "left")};
`;

const ViewButton = styled.a`
  background-color: ${(props) => {
    if (props.type === "vod") return "#AD794E";
    if (props.type === "youtube") return "#A287C9";
    if (props.type === "live") return "#FF6666";
    if (props.type === "zoom") return "#5487ad";
    return "#6c757d";
  }};
  color: white;
  padding: 2px;
  margin-right: 5px;
  text-decoration: none;
  display: inline-block;

  &:hover {
    opacity: 0.9;
    color: white;
  }
`;

const SubText = styled.span`
  color: ${(props) => props.color || "#7c7c7c"};
  font-size: 0.9em;
  display: block;
`;

// 내 강의실 상세 페이지 컴포넌트
const CourseDetail = () => {
  const { orderCode } = useParams();
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState(null);
  const [lecture, setLecture] = useState(null);
  const [vods, setVods] = useState([]);
  const [vodHistories, setVodHistories] = useState([]);
  const [loading, setLoading] = useState(true);

  const page = parseInt(searchParams.get("Page")) || 1;

  useEffect(() => {
    // 강의 상세 정보 가져오기
    const fetchCourseDetail = async () => {
      try {
        const response = await axios.get(`/api/mypage/course/${orderCode}`);
        setOrder(response.data.order);
        setLecture(response.data.lecture);
        setVods(response.data.vods || []);
        setVodHistories(response.data.vodHistories || []);
        setLoading(false);
      } catch (error) {
        console.error("강의 상세 정보 가져오기 오류:", error);
        setLoading(false);
      }
    };

    fetchCourseDetail();
  }, [orderCode]);

  // VOD 플레이어 열기
  const handleVodView = (orderCode, vodNo, width, height) => {
    const winLeft = (window.screen.width - width) / 2;
    const winTop = (window.screen.height - height) / 2;

    const vWidth = parseInt(width) + 20;
    const vHeight = parseInt(height) + 30;

    window.open(
      `/Mypage/VodPlayer/${vodNo}?order_code=${orderCode}`,
      "vodPlayer",
      `width=${vWidth},height=${vHeight},scrollbars=yes,resizable=0,left=${winLeft},top=0,location=no`
    );
  };

  // YouTube 플레이어 열기
  const handleYoutubeView = (lecNo, vodNo, width, height) => {
    const winLeft = (window.screen.width - width) / 2;
    const winTop = (window.screen.height - height) / 2;

    const vWidth = parseInt(width) + 30;
    const vHeight = parseInt(height) + 130;

    window.open(
      `/Mypage/VodPlayerYoutube`,
      "vodPlayer",
      `width=${vWidth},height=${vHeight},toolbar=no,status=no,menubar=no,scrollbars=yes,resizable=0,left=${winLeft},top=${winTop}`
    );
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!order || !lecture) {
    return <div>강의 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <>
      {/* Breadcrumbs */}
      <BreadcrumbsSection className="breadcrumbs">
        <Container>
          <BreadcrumbsTitle>내 강의실</BreadcrumbsTitle>
          <BreadcrumbsText>
            Est dolorum ut non facere possimus quibusdam eligendi voluptatem.
            Quia id aut similique quia voluptas sit quaerat debitis. Rerum omnis
            ipsam aperiam consequatur laboriosam nemo harum praesentium.
          </BreadcrumbsText>
        </Container>
      </BreadcrumbsSection>

      {/* Course Details */}
      <CourseSection
        id="cource-details-tabs"
        className="cource-details-tabs mt-4"
      >
        <Container>
          <CourseNav className="navbar navbar-expand-lg bg-body-tertiary">
            <CourseNavContainer className="container-fluid">
              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo01"
              >
                <CourseTitle href="#">
                  {order.lec_name} ({order.lec_start} ~ {order.lec_end})
                </CourseTitle>
              </div>
            </CourseNavContainer>
          </CourseNav>

          <div className="row">
            <CourseTable className="table table-hover table-bordered">
              <TableHead>
                <tr>
                  <th scope="col">번호</th>
                  <th scope="col">목차</th>
                  <th scope="col">강의보기</th>
                  <th scope="col">교재다운</th>
                  <th scope="col">진도율</th>
                  <th scope="col">재생시간</th>
                  <th scope="col">퀴즈</th>
                  <th scope="col">설문조사</th>
                </tr>
              </TableHead>
              <tbody>
                {vods.map((vod) => {
                  // 진도율 계산
                  let viewRate = 0;
                  const vodHistory = vodHistories.find(
                    (vh) => vh.vod_no === vod.no
                  );

                  if (vodHistory) {
                    if (vod.vod_time > 0) {
                      viewRate = Math.floor(
                        (vodHistory.stay_time / (vod.vod_time * 60)) * 100
                      );
                    }
                  }

                  // VOD 파일 링크
                  let vodFileLink = null;
                  if (vod.vod_file) {
                    const vodSizes = vod.vod_viewer
                      ? vod.vod_viewer.split("*")
                      : ["800", "600"];
                    const width = vodSizes[0];
                    const height = vodSizes[1];

                    vodFileLink = (
                      <ViewButton
                        type="vod"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleVodView(
                            order.order_code,
                            vod.no,
                            width,
                            height
                          );
                        }}
                      >
                        View
                      </ViewButton>
                    );
                  }

                  // YouTube 링크
                  let youtubeLink = null;
                  if (vod.youtube) {
                    youtubeLink = (
                      <ViewButton
                        type="youtube"
                        href={vod.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </ViewButton>
                    );
                  }

                  // YouTube Live 링크
                  let youtubeLiveLink = null;
                  if (vod.youtube_live) {
                    youtubeLiveLink = (
                      <ViewButton type="live" href={vod.youtube_live}>
                        Live
                      </ViewButton>
                    );
                  }

                  // Zoom 링크
                  let zoomLink = null;
                  if (vod.zoom) {
                    zoomLink = (
                      <ViewButton
                        type="zoom"
                        href={vod.zoom}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Click
                      </ViewButton>
                    );
                  }

                  // 교재 다운로드 링크
                  let bookLink = null;
                  if (vod.vod_book) {
                    const mediaServer = lecture.media_server;
                    const bookFolder = lecture.book_folder;

                    bookLink = (
                      <a
                        href={`${mediaServer}/${bookFolder}/${vod.vod_book}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        교재다운
                      </a>
                    );
                  }

                  return (
                    <TableRow key={vod.no}>
                      <TableCell center>
                        {vod.vod_num}
                        {vod.num_str && <SubText>{vod.num_str}</SubText>}
                      </TableCell>
                      <TableCell>
                        <a href="#" style={{ color: "#000" }}>
                          {vod.vod_title}
                        </a>
                        {vod.vod_str && (
                          <SubText color="#cccccc">{vod.vod_str}</SubText>
                        )}
                      </TableCell>
                      <TableCell center>
                        {vodFileLink}
                        {youtubeLink}
                        {youtubeLiveLink}
                        {zoomLink}
                      </TableCell>
                      <TableCell center>{bookLink}</TableCell>
                      <TableCell center>{viewRate} %</TableCell>
                      <TableCell center>{vod.vod_time} 분</TableCell>
                      <TableCell center>-</TableCell>
                      <TableCell center>-</TableCell>
                    </TableRow>
                  );
                })}

                {vods.length === 0 && (
                  <TableRow>
                    <TableCell colSpan="8" center>
                      등록된 강의영상이 없습니다.
                    </TableCell>
                  </TableRow>
                )}
              </tbody>
            </CourseTable>
          </div>
        </Container>
      </CourseSection>
    </>
  );
};

export default CourseDetail;
