import React from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
function AboutContact() {
  return (
    <>
      {/* ======= Breadcrumbs ======= */}
      <Breadcrumbs
        title="Contact Us"
        description="Est dolorum ut non facere possimus quibusdam eligendi voluptatem.
        Quia id aut similique quia voluptas sit quaerat debitis.
        Rerum omnis ipsam aperiam consequatur laboriosam nemo harum praesentium."
      />
      {/* ======= End Breadcrumbs ======= */}

      <section className="section section-shaped section-lg">
        <div>오시는길입니다.</div>
      </section>
    </>
  );
}

export default AboutContact;
