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
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import Chip from '@mui/material/Chip';
import { colorMappingApplies } from "../Project/colors";

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
      </div>
      {appliesList.length !== 0 ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {appliesTitle === "My projects' applies" ? (
                  <>
                    <TableCell sx={{fontWeight:'bold'}}>Name</TableCell>
                    <TableCell sx={{fontWeight:'bold'}}>Email</TableCell>
                    <TableCell sx={{fontWeight:'bold'}}>Phone Number</TableCell>
                  </>
                ) : null}
                <TableCell sx={{fontWeight:'bold'}}>Project</TableCell>
                <TableCell sx={{fontWeight:'bold'}}>Skills</TableCell>
                <TableCell sx={{fontWeight:'bold'}}>Resume</TableCell>
                {appliesTitle === "My projects' applies" ? (
                  <>
                    <TableCell>Approve</TableCell>
                    <TableCell>Decline</TableCell>
                  </>
                ) : null}
                <TableCell sx={{fontWeight:'bold'}}>Status</TableCell>
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
                    <Chip size="small" className="apply-btn" label={apply.status} color={colorMappingApplies[apply.status]} variant="outlined"/>
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
