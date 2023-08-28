import "./AboutPage.css";
const AboutPage = () => {
  return (
    <div className="restaurant-landing-page">
      <img
        className="banner-background-icon"
        alt=""
        src="https://d1xzdqg8s8ggsr.cloudfront.net/64e9c4535f2161d7bc1b2d01/a596728a-42e9-4295-922b-284a186d270b_1693042441567274234?Expires=-62135596800&Signature=oTmqfQCONbFxMZ67o3uBOxOwl2ZDskR~dQobbuus0BntjK6SJ8pW54wz7CBbNwb4UaiA6NJwcyNs9mubdhP8xA5infIeoKRNGeyCOLAUcoo1doJ2c2V63a9MR0vTSH3jQKwCK8tG2wztmShR5e1BYL7COagmgtGTZgZEjzdVuTuHqn5-JvMewuFdDxUnv6TTJAZBQmptjLvrUsjdC8ooYYWTlefakTvl-CoTmWxYjhoXQcnwx5dzXmQEi~wACzhsvd-KILr~ASUUw2O6MzGS-oooTb84SbtgwKKWdEM-C-krBUA8iqoT1dZVntKHute3OiFPxIVsdnDcp2qtxBlUyQ__&Key-Pair-Id=K1P54FZWCHCL6Jg"
      />
      <div className="home-page-text-container">
        <b className="skill-hub">
          <span>Skill Hub</span>
          <span className="span">{` `}</span>
        </b>
        <div className="skill-hub-is-container">
          <span className="skill-hub-is-container1">
            <p className="skill-hub-is">
              Skill Hub is a platform for finding suitable partners and team
              members,
            </p>
            <p className="skill-hub-is">
              especially for your project. Whether you are an entrepreneur, a
              creative individual,
            </p>
            <p className="or-an-individual">
              or an individual seeking collaboration, our platform connects you
              with relevant people to bring your ideas to life.
            </p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;