export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
          <div className="card">
            <img src="/images/reactjs.jpg" />
            <div className="card-body">
              <a
                className="wd-dashboard-course-link"
                href="#/Kanbas/Courses/1234/Home"
                style={{
                  textDecoration: "none",
                  color: "navy",
                  fontWeight: "bold",
                }}
              >
                CS1234 React JS
              </a>
              <p className="wd-dashboard-course-title card-text">
                Full Stack software developer
              </p>
              <a href="#/Kanbas/Courses/1234/Home" className="btn btn-primary">
                {" "}
                Go{" "}
              </a>
            </div>
          </div>
        </div>
        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
          <div className="card">
            <img src="/images/python.jpg" />
            <div className="card-body">
              <a
                className="wd-dashboard-course-link"
                href="#/Kanbas/Courses/1234/Home"
                style={{
                  textDecoration: "none",
                  color: "navy",
                  fontWeight: "bold",
                }}
              >
                CS5001 Python
              </a>
              <p className="wd-dashboard-course-title card-text">
                Introduction to Python
              </p>
              <a href="#/Kanbas/Courses/1234/Home" className="btn btn-primary">
                {" "}
                Go{" "}
              </a>
            </div>
          </div>
        </div>
        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
          <div className="card">
            <img src="/images/ds.jpg" />
            <div className="card-body">
              <a
                className="wd-dashboard-course-link"
                href="#/Kanbas/Courses/1234/Home"
                style={{
                  textDecoration: "none",
                  color: "navy",
                  fontWeight: "bold",
                }}
              >
                CS5002
              </a>
              <p className="wd-dashboard-course-title card-text">
                Discrete Structure
              </p>
              <a href="#/Kanbas/Courses/1234/Home" className="btn btn-primary">
                {" "}
                Go{" "}
              </a>
            </div>
          </div>
        </div>
        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
          <div className="card">
            <img src="/images/cy.jpg" />
            <div className="card-body">
              <a
                className="wd-dashboard-course-link"
                href="#/Kanbas/Courses/1234/Home"
                style={{
                  textDecoration: "none",
                  color: "navy",
                  fontWeight: "bold",
                }}
              >
                CS5600
              </a>
              <p className="wd-dashboard-course-title card-text">
                Computer Systems
              </p>
              <a href="#/Kanbas/Courses/1234/Home" className="btn btn-primary">
                {" "}
                Go{" "}
              </a>
            </div>
          </div>
        </div>
        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
          <div className="card">
            <img src="/images/java.jpg" />
            <div className="card-body">
              <a
                className="wd-dashboard-course-link"
                href="#/Kanbas/Courses/1234/Home"
                style={{
                  textDecoration: "none",
                  color: "navy",
                  fontWeight: "bold",
                }}
              >
                CS5004 Java
              </a>
              <p className="wd-dashboard-course-title card-text">
                Introduction to Java
              </p>
              <a href="#/Kanbas/Courses/1234/Home" className="btn btn-primary">
                {" "}
                Go{" "}
              </a>
            </div>
          </div>
        </div>
        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
          <div className="card">
            <img src="/images/Algorithm.jpg" />
            <div className="card-body">
              <a
                className="wd-dashboard-course-link"
                href="#/Kanbas/Courses/1234/Home"
                style={{
                  textDecoration: "none",
                  color: "navy",
                  fontWeight: "bold",
                }}
              >
                CS5008
              </a>
              <p className="wd-dashboard-course-title card-text">Algorithms</p>
              <a href="#/Kanbas/Courses/1234/Home" className="btn btn-primary">
                {" "}
                Go{" "}
              </a>
            </div>
          </div>
        </div>
        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
          <div className="card">
            <img src="/images/web.jpg" />
            <div className="card-body">
              <a
                className="wd-dashboard-course-link"
                href="#/Kanbas/Courses/1234/Home"
                style={{
                  textDecoration: "none",
                  color: "navy",
                  fontWeight: "bold",
                }}
              >
                CS5610
              </a>
              <p className="wd-dashboard-course-title card-text">
                Web Development
              </p>
              <a href="#/Kanbas/Courses/1234/Home" className="btn btn-primary">
                {" "}
                Go{" "}
              </a>
            </div>
          </div>
        </div>
        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
          <div className="card">
            <img src="/images/mobile.jpg" />
            <div className="card-body">
              <a
                className="wd-dashboard-course-link"
                href="#/Kanbas/Courses/1234/Home"
                style={{
                  textDecoration: "none",
                  color: "navy",
                  fontWeight: "bold",
                }}
              >
                CS5520
              </a>
              <p className="wd-dashboard-course-title card-text">
                Mobile Application Development
              </p>
              <a href="#/Kanbas/Courses/1234/Home" className="btn btn-primary">
                {" "}
                Go{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
