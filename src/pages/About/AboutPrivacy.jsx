// src/pages/About/AboutPrivacy.jsx
import React from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
function AboutPrivacy() {
  return (
    <>
      {/* ======= Breadcrumbs ======= */}
      <Breadcrumbs
        title="개인보호정책방침"
        description="Est dolorum ut non facere possimus quibusdam eligendi voluptatem.
        Quia id aut similique quia voluptas sit quaerat debitis. Rerum omnis
        ipsam aperiam consequatur laboriosam nemo harum praesentium."
      />
      {/* ======= End Breadcrumbs ======= */}

      <section className="section section-shaped section-lg">
        <div>개인보호정책방침 입니다.</div>
      </section>
    </>
  );
}

export default AboutPrivacy;
