const express = require('express');
const { sequelize } = require('../models/events');
const router = express.Router();

/* API */

router.get('/events', async (req, res) => {
  try {
    const data = await sequelize.models.events.findAll()
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})

router.post('/events', async (req, res) => {
  try {
    await sequelize.models.events.findCreateFind({
      where: { session_id: req.session.id },
      defaults: {
        session_id: req.session.id,
        ip: req.ip,
        name: req.session.test.name,
        variant: req.session.test.bucket,
        ...req.body
      }
    })
    res.status(200).end()
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})

router.put('/events/', async (req, res) => {
  try {
    await sequelize.models.events.upsert({
      session_id: req.session.id,
      ip: req.ip,
      name: req.session.test.name,
      variant: req.session.test.bucket,
      ...req.body
    })
    res.status(200).end()
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})

router.get('/events/:sessionID', async (req, res) => {
  try {
    const data = await sequelize.models.events.findOne({
      where: { session_id: req.params.sessionID }
    })
    res.status(200).json(data)
    //res.json(req.params)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})

router.get('/req', (req, res) => {
  //console.log(req);
  const userInfo = {
    req: {
      app: req.app,
      baseUrl: req.baseUrl,
      body: req.body,
      cookies: req.cookies,
      ip: req.ip,
      ips: req.ips,
      hostname: req.hostname,
      method: req.method,
      params: req.params,
      xhr: req.xhr,
    },
    session: {
      id: req.session.id,
      cookie: req.session.cookie,
      cookieMaxAge: req.session.cookie.maxAge,
      test: req.session.test,

    }
  }
  res.status(200).json(userInfo);
})

module.exports = router;
