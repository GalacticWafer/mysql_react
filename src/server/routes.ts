import * as express from 'express';
import DB from './db';

const router = express.Router();

router.get('/api/hello', (req, res, next) => {
    res.json('World');
});

router.get('/api/inventory', async (req, res) => {
    try {
        let inventory = await DB.Inventory.all();
        res.json(inventory);
    } catch(e) {
        res.sendStatus(500);
    }
})

export default router;