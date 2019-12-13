// @flow

import React from 'react';

import styled from 'styled-components';
import { Models } from 'lattice';
import { Form } from 'lattice-fabricate';

import getFormSchema from './EditStudyDetailSchema';

const { FullyQualifiedName } = Models;

type Props = {
  handleCancelEdit :() => void,
  propertyFqn :FullyQualifiedName
}
const FormWrapper = styled(Form)`
  flex: 1;
  margin: -30px;
  background-color: white;
`;
const EditStudyDetailForm = (props :Props) => {

  const { propertyFqn, handleCancelEdit } = props;
  // $FlowFixMe
  const { uiSchema, dataSchema } = getFormSchema(propertyFqn);
  const handleSubmit = () => {};


  return (
    <FormWrapper
        onDiscard={handleCancelEdit}
        onSubmit={handleSubmit}
        schema={dataSchema}
        uiSchema={uiSchema} />
  );

};

export default EditStudyDetailForm;
