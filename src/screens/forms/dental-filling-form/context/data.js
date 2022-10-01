export default {
  email_address: {id: 'email_address', required: true},
  targeted_process: {id: 'targeted_process', required: true},
  patient_name_declaration: {id: 'patient_name_declaration', required: true},
  patient_sign_box: {id: 'patient_sign_box', required: false},
  patient_name_surname: {id: 'patient_name_surname', required: true},
  patient_signature: {id: 'patient_signature', required: true},
  patient_phone: {id: 'patient_phone', required: true},
  doctor_sign_box: {id: 'doctor_sign_box', required: false},
  doctor_name_surname: {id: 'doctor_name_surname', required: false},
  doctor_signature: {id: 'doctor_signature', required: false},
  paitnet_supervisor_sign_box: {
    id: 'paitnet_supervisor_sign_box',
    required: false,
  },
  paitnet_supervisor_name_surname: {
    id: 'paitnet_supervisor_name_surname',
    required: true,
  },
  paitnet_supervisor_signature: {
    id: 'paitnet_supervisor_signature',
    required: true,
  },
};
