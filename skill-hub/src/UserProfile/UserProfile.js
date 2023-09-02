import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCardImage, MDBBtn, MDBTypography, MDBCardText, MDBCardBody } from 'mdb-react-ui-kit';

export default function EditButton() {
  return (
    <div>
      <div style={{ backgroundColor: '#000' }}>
        <MDBContainer className="py-5">
          <MDBRow className="justify-content-center align-items-center">
            <MDBCol lg="3" className="text-white d-flex flex-column align-items-center py-4">
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                alt="Generic placeholder image"
                className="mt-4 mb-2 img-thumbnail"
                fluid
                style={{ width: '150px', zIndex: '1' }}
              />
              <MDBBtn outline color="dark" style={{ height: '36px', overflow: 'visible' }}>
                Edit profile
              </MDBBtn>
              <MDBTypography tag="h5" className="mt-3">Andy Horwitz</MDBTypography>
              <MDBCardText className="mb-3">New York</MDBCardText>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
      <MDBContainer>
        <MDBRow>
          <MDBCol lg="9">
            <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
              <div className="d-flex justify-content-end text-center py-1">
                <div>
                  <MDBCardText className="mb-1 h5">253</MDBCardText>
                  <MDBCardText className="small text-muted mb-0">Photos</MDBCardText>
                </div>
                <div className="px-3">
                  <MDBCardText className="mb-1 h5">1026</MDBCardText>
                  <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                </div>
                <div>
                  <MDBCardText className="mb-1 h5">478</MDBCardText>
                  <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
                </div>
              </div>
            </div>
            <MDBCardBody className="text-black p-4">
              {/* ... Rest of your content */}
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
