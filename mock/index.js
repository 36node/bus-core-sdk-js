const generate = require("./pet");
const lines = require("./lines");
const producers = require("./producers");
const vehicleGenerate = require("./vehicles");

const myRouter = (req, res, next) => {
  /** example */
  // if (req.path === "/sessions" && req.method === "POST") {
  //   req.body.token = TOKEN;
  // }
  next();
};

const rewrites = {};

/**
 * mock
 *
 * @param {object} opt mock options
 * @param {number} opt.count how many pets to be generated
 */
const mock = ({ count = 100 }) => ({
  /**
   * mock data
   */
  db: {
    producers,
    lines,
    vehicles: vehicleGenerate(count),
  },

  /**
   * rewrite
   */
  rewrites,

  routers: [myRouter],
});

module.exports = mock;
