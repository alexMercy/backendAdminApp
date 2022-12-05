const express = require("express");
const service = require("../services");

 function createRouter(table) {
     const router = express.Router();

    /* many */
    router.get("/", async function (req, res, next) {
        try {
            res.json(await service.getMultiple(req.query.page, table));
        } catch (err) {
            console.error(`Error while getting todos`, err.message);
            next(err);
        }
    });

    /* one */
    router.get("/:id", async function (req, res, next) {
        try {
            res.json(await service.get(req.params.id, table));
        } catch (err) {
            console.error(`Error while updating todo`, err.message);
            next(err);
        }
    });

    router.post("/", async function (req, res, next) {
        try {
            res.json(await service.create(req.body, table));
        } catch (err) {
            console.error(`Error while creating todo`, err.message);
            next(err);
        }
    });

    router.patch("/:id", async function (req, res, next) {
        try {
            res.json(await service.update(req.params.id, req.body, table));
        } catch (err) {
            console.error(`Error while updating todo`, err.message);
            next(err);
        }
    });

    router.delete("/:id", async function (req, res, next) {
        try {
            res.json(await service.remove(req.params.id, table));
        } catch (err) {
            console.error(`Error while deleting todo`, err.message);
            next(err);
        }
    });

    return router;
}

module.exports = createRouter;