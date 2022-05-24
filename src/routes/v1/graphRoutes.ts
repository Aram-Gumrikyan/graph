import { Request, Response, Router } from "express";
import { cloneDeep, isEmpty, isInteger } from "lodash";
import DataError from "../../exceptions/DataError";
const Addons = require("../../../build/Release/calculate");

const router = Router();

type numberMatrix = Array<Array<number>>;

const checkDiagonal = (array: numberMatrix) => {
  array.forEach((item, index) => {
    if (item[index]) {
      return false;
    }
  });

  return true;
};

const getResurrectionMatrixes = (params: Array<number>) => {
  const allPoints = params
    .reduce((currentPoints, param, index) => {
      if (!param) {
        return currentPoints;
      }

      if (currentPoints.includes(param)) {
        return currentPoints;
      }

      currentPoints.push(param);
      return currentPoints;
    }, [] as Array<number>)
    .sort((a, b) => a - b);

  const result: Array<numberMatrix> = [];

  result[0] = allPoints.reduce((currentRow, point, index) => {
    const row = Array(allPoints.length).fill(0);
    params.forEach((param, paramIndex) => {
      if (paramIndex % 2 != 0) {
        return;
      }

      if (param !== point) {
        return;
      }

      const corridorPoint = params[paramIndex + 1];
      if (corridorPoint === 0) {
        return;
      }

      row[corridorPoint - 1] = 1;
    });

    currentRow.push(row);
    return currentRow;
  }, []);

  if (!checkDiagonal(result[0])) {
    return result;
  }

  while (true) {
    const matrix = cloneDeep(result[result.length - 1]);
    matrix.forEach((row) => {
      const notOneIndexes = row.reduce((current, item, index) => {
        if (item === 0) {
          return current;
        }
        row[index] = 0;

        return current.concat(index);
      }, []);

      notOneIndexes.forEach((itemIndex) => {
        const r = result[0][itemIndex];
        r.forEach((item, index) => {
          row[index] += item;
        });
      });
    });
    result[result.length] = matrix;

    if (!checkDiagonal(matrix)) {
      break;
    }

    let oneCount = 0;
    matrix.forEach((row) => {
      row.forEach((item) => {
        if (item !== 0) {
          oneCount++;
        }
      });
    });

    if (!oneCount) {
      break;
    }
  }

  return result;
};

const addMatrix = (matrix1: numberMatrix, matrix2: numberMatrix) => {
  const result: numberMatrix = [];
  matrix1.forEach((row, rowIndex) => {
    const tempRow: Array<number> = [];
    row.forEach((item, itemIndex) => {
      tempRow[itemIndex] = item + matrix2[rowIndex][itemIndex];
    });
    result[rowIndex] = tempRow;
  });
  return result;
};

const getEmptyRowsCount = (matrix: numberMatrix) => {
  let count = 0;

  matrix.forEach((row) => {
    let numberCountInRow = 0;
    row.forEach((item) => {
      if (item) {
        numberCountInRow++;
      }
    });

    if (!numberCountInRow) {
      count++;
    }
  });

  return count;
};

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

  const enterPoints = Addons.enterPoints(graphParams);
  const corridorPoints = Addons.corridorPoints(graphParams);
  const exitPoints = Addons.exitPoints(graphParams);
  const resurrectionMatrixes = getResurrectionMatrixes(graphParams);
  const Q = resurrectionMatrixes.reduce((previous, current) => {
    if (isEmpty(previous)) {
      return current;
    }

    return addMatrix(previous, current);
  }, []);
  const T4 = resurrectionMatrixes.reduce((previous, current) => {
    return previous.concat(getEmptyRowsCount(current));
  }, [] as Array<number>);
  const T7 = T4.reduce((previous, current, index) => {
    return previous.concat(current - (index + 1));
  }, [] as Array<number>);

  res.json({
    params: graphParams,
    enterPoints,
    corridorPoints,
    exitPoints,
    resurrectionMatrixes,
    N: resurrectionMatrixes.length - 1,
    Q,
    T4,
    T7,
  });
});

export default router;
