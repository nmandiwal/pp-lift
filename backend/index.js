'use strict';

const Firestore = require('@google-cloud/firestore');

const PROJECTID = 'my-project-86472-23march';
const COLLECTION_NAME = 'pp-lift';

const firestore = new Firestore({
  projectId: PROJECTID,
  timestampsInSnapshots: true
});

exports.helloWorld = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  const id = 'lmijb8hVyBDR3HKfPNdZ'; 
  
  const docRef = firestore.collection(COLLECTION_NAME).doc(id);
  return docRef
    .get()
    .then(doc => {
      if (!(doc && doc.exists)) {
        return res.status(404).send({
          error: 'Unable to find the document'
        });
      }
      const data = doc.data();
      if (!data) {
        return res.status(404).send({
          error: 'Found document is empty'
        });
      }
      if (req.query.left) {
        data.left = req.query.left;
	      docRef.update(data)
      }  
      if (req.query.right) {
	      data.right = req.query.right;
	      docRef.update(data)
      }
      return res.status(200).send(data);
    }).catch(err => {
      console.error(err);
      return res.status(404).send({
        error: 'Unable to retrieve the document',
        err
      });
    });
  
  
};