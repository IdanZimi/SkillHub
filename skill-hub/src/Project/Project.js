function Project({ id, founder, status, user }) {
  return founder === user ? (
    <div>
      projet id : {id}
      project founder: {founder}
      active : {status === true ? "yes" : "no"}
    </div>
  ) : (
    ""
  );
}

export default Project;
