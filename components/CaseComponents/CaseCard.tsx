import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";
import { useMutation, useQuery } from "urql";
import { Box } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";


// Delet Case Mutation
const DeleteCategoryMutation = `
mutation deleteCaseMutation($id : bigint="") {
  delete_cases_by_pk(id: $id) {
    	id
  }
}

`;


type CaseCardProps = {
  data: CaseData;
};

export type TagData = {
  name: string;
  id?: number;
};

export type CaseData = {
  name: string;
  status: string;
  description: string;
  id: number;
  cases_tags?: [TagData];
};

const CaseCard: React.FC<CaseCardProps> = (props) => {
  const caseData = props.data;
  const [result, executeMutation] = useMutation(DeleteCategoryMutation);

  return (
    <Container>
      <div style={{ width: "100%", padding: "5px" }}>
        <Card body style={{ backgroundColor: "#e4ebf5" }}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            <CardTitle tag="h3">{caseData.name}</CardTitle>
            <CloseIcon onClick={() => {
              // Executes Delete Category Mutation and Deletes Case based on that case's id
              executeMutation({
                  id : caseData.id
              });
            }}/>
          </Box>

          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {caseData.status}
          </CardSubtitle>
          <CardText>{caseData.description}</CardText>
          {/*
            ALTERNATE FEATURE 1 TODO:
            Use the data on tags found in props to render out all
            of the tags associated with every case.
          */}

          {/* END TODO */}
        </Card>
      </div>
    </Container>
  );
};
export default CaseCard;
