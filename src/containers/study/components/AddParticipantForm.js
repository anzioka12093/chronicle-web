// @flow

import React from 'react';

import { Map } from 'immutable';
import { Form } from 'lattice-fabricate';
import { useDispatch } from 'react-redux';

import getFormSchema from './AddParticipantSchema';

import { PROPERTY_TYPE_FQNS } from '../../../core/edm/constants/FullyQualifiedNames';
import { addStudyParticipant } from '../../studies/StudiesActions';

const { STUDY_ID } = PROPERTY_TYPE_FQNS;

type Props = {
  study :Map
}
const AddParticipantForm = (props :Props, ref) => {
  const { study } = props;
  const dispatch = useDispatch();

  const studyId = study.getIn([STUDY_ID, 0]);
  const { dataSchema, uiSchema } = getFormSchema(studyId);

  const handleSubmit = ({ formData }:Object) => {
    dispatch(addStudyParticipant({ formData, studyId }));
  };

  return (
    <Form
        hideSubmit
        onSubmit={handleSubmit}
        ref={ref}
        schema={dataSchema}
        uiSchema={uiSchema} />
  );
};

// $FlowFixMe
export default React.forwardRef(AddParticipantForm);
