import React from 'react';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Hecho con ❤️por '}
      <Link color="inherit" href="https://github.com/sebastianlp">
        Sebas
      </Link>{' '}
      {'© Surgerify '}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default Copyright;
