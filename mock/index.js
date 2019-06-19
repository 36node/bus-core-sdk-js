const constants = require("./constants");
const lineGenerate = require("./line");
const producers = require("./producer");
const vehicleGenerate = require("./vehicle");

const myRouter = (req, res, next) => {
  /** example */
  // if (req.path === "/sessions" && req.method === "POST") {
  //   req.body.token = TOKEN;
  // }
  next();
};

const rewrites = {};

const nsArr = [
  "/bus",
  "/bus/company1",
  "/bus/company2",
  "/bus/company1/sub1",
  "/bus/company1/sub2",
];

/**
 * mock
 *
 * @param {object} opt mock options
 * @param {number} opt.vechicleCount how many vehicle to be generated
 */
const mock = ({ vechicleCount = 100, ns = nsArr }) => {
  const lines = lineGenerate(ns);
  const vehicles = vehicleGenerate(vechicleCount, lines);

  return {
    /**
     * mock data
     */
    db: {
      producers,
      lines,
      vehicles,
    },

    /**
     * rewrite
     */
    rewrites,

    routers: [myRouter],
  };
};

module.exports = mock;

// 导出常量
mock.constants = constants;
