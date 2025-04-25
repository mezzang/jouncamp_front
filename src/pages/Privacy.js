import React from "react";
import styled from "styled-components";

// styled-components를 사용한 스타일 정의
const BreadcrumbsSection = styled.div`
  background-color: #f6f7f8;
  padding: 40px 0;
`;

const BreadcrumbsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  text-align: center;
`;

const BreadcrumbsTitle = styled.h2`
  margin-bottom: 16px;
  font-size: 32px;
  font-weight: bold;
`;

const BreadcrumbsText = styled.p`
  margin-bottom: 0;
  font-size: 16px;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
`;

const PrivacySection = styled.section`
  padding: 60px 0;
`;

const PrivacyContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
`;

// Privacy 컴포넌트
const Privacy = () => {
  // 페이지 타이틀 설정 (react-helmet 사용 가능)
  document.title = "About/Privacy";

  return (
    <>
      {/* Breadcrumbs */}
      <BreadcrumbsSection className="breadcrumbs">
        <BreadcrumbsContainer>
          <BreadcrumbsTitle>개인보호정책방침</BreadcrumbsTitle>
          <BreadcrumbsText>
            Est dolorum ut non facere possimus quibusdam eligendi voluptatem.
            Quia id aut similique quia voluptas sit quaerat debitis. Rerum omnis
            ipsam aperiam consequatur laboriosam nemo harum praesentium.
          </BreadcrumbsText>
        </BreadcrumbsContainer>
      </BreadcrumbsSection>

      {/* Main Section */}
      <PrivacySection className="section section-shaped section-lg">
        <PrivacyContainer>
          <div>개인보호정책방침 입니다.</div>
        </PrivacyContainer>
      </PrivacySection>
    </>
  );
};

export default Privacy;
