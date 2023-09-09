import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { MDBCardText } from "mdb-react-ui-kit";

import { Viewer } from "@react-pdf-viewer/core";
import { Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

function AppliesList({
  appliesList,
  appliesTitle,
  projectsList,
  approveApplyHandler,
  declineApplyHandler,
}) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <div className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <MDBCardText className="lead fw-normal mb-0">
          {appliesTitle}
        </MDBCardText>
        {/* <MDBCardText className="mb-0">
          <a href="#!" className="text-muted">
            Show all
          </a>
        </MDBCardText> */}
      </div>
      {appliesList.length !== 0 ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {appliesTitle === "My projects' applies" ? (
                  <>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone Number</TableCell>
                  </>
                ) : null}
                <TableCell>Project</TableCell>
                {/* <TableCell>Project ID</TableCell> */}
                <TableCell>Skills</TableCell>
                <TableCell>Resume</TableCell>
                {appliesTitle === "My projects' applies" ? (
                  <>
                    <TableCell>Approve</TableCell>
                    <TableCell>Decline</TableCell>
                  </>
                ) : null}
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appliesList.length !== 0 && appliesList.map((apply) => (
                <TableRow key={apply.id}>
                  {appliesTitle === "My projects' applies" ? (
                    <>
                      <TableCell>{apply.userName}</TableCell>
                      <TableCell>{apply.email}</TableCell>
                      <TableCell>{apply.phone}</TableCell>
                    </>
                  ) : null}
                  <TableCell>
                    {apply.ptitle}
                  </TableCell>
                  {/* <TableCell>{apply.pid}</TableCell> */}
                  <TableCell>{apply.selectedSkills.join(", ")}</TableCell>
                  <TableCell>
                    <MDBCardText className="mb-0">
                      <a
                        href={apply.resumeURL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Resume
                      </a>
                    </MDBCardText>
                  </TableCell>
                  {/* <TableCell>
                                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                  <Viewer
                                    fileUrl={apply.resumeURL}
                                    // plugins={[
                                    //   // Register plugins
                                    //   defaultLayoutPluginInstance
                                    // ]}
                                    numPages={1}
                                  />
                                </Worker>
                              </TableCell> */}
                  {appliesTitle === "My projects' applies" ? (
                    <>
                      <TableCell>
                        <Button
                          variant="contained"
                          onClick={() => approveApplyHandler(apply)}
                        >
                          Approve
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          onClick={() => declineApplyHandler(apply)}
                        >
                          Decline
                        </Button>
                      </TableCell>
                    </>
                  ) : null}

                  <TableCell>
                    <MDBCardText className="mb-0">{apply.status}</MDBCardText>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        "There are no applications at the moment."
      )}
    </div>
  );
}

export default AppliesList;
