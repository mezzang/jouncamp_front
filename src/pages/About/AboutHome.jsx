// src/pages/About/AboutHome.jsxS
import React from "react";
import Breadcrumbs from "../../components/Breadcrumbs";

function AboutHome() {
  return (
    <>
      {/* ======= Breadcrumbs ======= */}
      <Breadcrumbs
        title="조은캠프 LMS 소개"
        description="Est dolorum ut non facere possimus quibusdam eligendi voluptatem.
        Quia id aut similique quia voluptas sit quaerat debitis. Rerum omnis
        ipsam aperiam consequatur laboriosam nemo harum praesentium."
      />
      {/* ======= End Breadcrumbs ======= */}

      <section className="section section-shaped section-lg">
        <div>Jouncamp LMS 소개페이지입니다.</div>
      </section>
    </>
  );
}

export default AboutHome;
