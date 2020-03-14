import React from 'react';
import PropTypes from 'prop-types';

const MemberItem = ({ member }) => (
  <li key={member.id}>
    <ul className="member-row">
      <li className="member_name">{member.user_name}</li>
      <li className="member_instrument">{member.instrument}</li>
    </ul>
  </li>
);

export default MemberItem;

MemberItem.propTypes = {
  member: PropTypes.instanceOf(Object),
};

MemberItem.defaultProps = {
  member: {
    id: '',
    user_name: '',
    instrument: '',
  },
};
