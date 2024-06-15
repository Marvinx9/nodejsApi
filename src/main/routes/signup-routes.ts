import { Router } from 'express';

/* eslint-disable @typescript-eslint/no-unused-vars */

export default (router: Router): void => {
  router.post('/signup', (req, res) => {
    res.json({ ok: 'ok' });
  });
};
