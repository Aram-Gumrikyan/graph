import { Request, Response, Router } from "express";
import { isInteger } from "lodash";
import DataError from "../../exceptions/DataError";
const Addons = require("../../../build/Release/calculate");

const router = Router();

router.get("/", (req: Request, res: Response) => {
  if (!Array.isArray(req.query.graphParams)) {
    throw new DataError("We need an Array");
  }

  const graphParams = req.query.graphParams.map((param) => {
    const numericParam = +param;

    if (!isInteger(numericParam)) {
      throw new DataError(null);
    }

    return numericParam;
  });

  if (graphParams.length % 2 !== 0) {
    throw new DataError(null);
  }

  const enterPoints = Addons.enterPoints([10, 20]);

  res.json({ enterPoints, params: graphParams });
});

export default router;
