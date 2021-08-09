import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const Spinner = () => (
  <Dimmer>
    <Loader size="huge" content={"Loading the Chat..."} />
  </Dimmer>
)

export default Spinner;
